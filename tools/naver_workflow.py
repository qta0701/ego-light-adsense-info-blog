"""Local Naver upload preparation. No browser, login, or Google Sheets writes.

Python 3.14, standard library. Persist plans once and resume their assignments.
"""
import argparse
from datetime import datetime, timedelta, timezone
import hashlib
import json
import os
from pathlib import Path
import random
import re
import subprocess

from blogger_workflow import ROOT, inside, keyword_dir

KST = timezone(timedelta(hours=9))
PROFILES = [
    {'profileName': '박상민', 'account': 'chocolateelf', 'ledgerColumn': 'L'},
    {'profileName': '상민-서브계정2', 'account': 'almawade1', 'ledgerColumn': 'I'},
    {'profileName': '상민-투넘버', 'account': 'qta14', 'ledgerColumn': 'J'},
    {'profileName': '순분', 'account': 'supportimes001', 'ledgerColumn': 'K'},
]


def allocate(jobs, seed=None):
    """Shuffle once, then round-robin; account counts differ by at most one."""
    profiles = [dict(p) for p in PROFILES]
    random.Random(seed).shuffle(profiles)
    identities, topics, result = set(), set(), []
    for index, job in enumerate(jobs):
        identity = (job['tab'], job['row'])
        topic = (job['tab'], job['keyword'])
        if identity in identities or topic in topics:
            raise ValueError('같은 행/키워드를 두 프로필에 중복 배정할 수 없습니다')
        if type(job['row']) is not int or job['row'] < 2:
            raise ValueError('실제 시트 데이터 행 번호가 필요합니다')
        identities.add(identity)
        topics.add(topic)
        ordinal = index // len(profiles)
        result.append({**job, **profiles[index % len(profiles)],
                       'indexOnProfile': ordinal,
                       'publishMode': 'pending_timeline_check'})
    return result


def next_time(previous, minute_step=10):
    """Previous actual/confirmed time + 2h, rounded upward to UI precision."""
    value = datetime.fromisoformat(previous.replace('Z', '+00:00'))
    if value.tzinfo is None:
        raise ValueError('시각에는 +09:00 같은 시간대가 필요합니다')
    if minute_step not in (1, 5, 10, 15, 30):
        raise ValueError('실제 UI에서 확인한 분 간격을 지정하세요')
    value = value.astimezone(KST) + timedelta(hours=2)
    step = minute_step * 60
    seconds = value.hour * 3600 + value.minute * 60 + value.second + value.microsecond / 1e6
    rounded = int(-(-seconds // step)) * step
    return (value.replace(hour=0, minute=0, second=0, microsecond=0)
            + timedelta(seconds=rounded)).isoformat()


def schedule_decision(now, last_published, scheduled, minute_step=10):
    """Use live blog/list evidence, including jobs created before this run.

    Call only after both latest-post and reservation-list checks. [] means an
    observed empty queue; None is unknown and must never authorize publication.
    """
    def aware(value):
        parsed = datetime.fromisoformat(value.replace('Z', '+00:00'))
        if parsed.tzinfo is None:
            raise ValueError('KST 또는 UTC 시간대가 필요합니다')
        return parsed.astimezone(KST)

    current = aware(now)
    if scheduled is None:
        raise ValueError('예약 목록을 먼저 확인하세요')
    anchors = ([aware(last_published)] if last_published else []) + [aware(v) for v in scheduled]
    if not anchors:
        return {'mode': 'current', 'publicationTime': current.isoformat(), 'anchor': None}
    anchor = max(anchors)
    if anchor + timedelta(hours=2) <= current:
        return {'mode': 'current', 'publicationTime': current.isoformat(), 'anchor': anchor.isoformat()}
    return {'mode': 'scheduled', 'publicationTime': next_time(anchor.isoformat(), minute_step),
            'anchor': anchor.isoformat()}


def prepare(folder, root=ROOT):
    folder = keyword_dir(root, folder)
    publish = folder / '웹조사' / 'publish'
    stem = folder.name
    source = publish / (stem + '_네이버블로그.md')
    md = source.read_text(encoding='utf-8-sig')
    if not md.strip():
        raise ValueError('원고가 비어 있습니다')
    optional = [publish / (stem + suffix) for suffix in
                ('_네이버블로그_제목 및 이미지 배치.txt', '_네이버블로그_제목해시태그.txt')]
    title_file = next((p for p in optional if p.is_file()), None)
    images = []

    def marker(match):
        name = match.group(1)
        if Path(name).name != name or '/' in name or '\\' in name:
            raise ValueError('이미지 배치 지시에는 파일명만 허용합니다')
        candidates = [publish / name, publish.parent / name]
        found = next((p for p in candidates if p.is_file()), None)
        if found is None or not found.resolve().is_relative_to(folder.resolve()):
            raise ValueError(f'이미지 누락 또는 키워드 폴더 이탈: {name}')
        code = f'NAVERIMG{len(images) + 1}'
        caption = re.search(r'캡션: "([^"]+)"', match.group(0))
        images.append({'marker': code, 'path': found.relative_to(root).as_posix(),
                       'caption': caption.group(1) if caption else '',
                       'sha256': hashlib.sha256(found.read_bytes()).hexdigest()})
        return code

    prepared = re.sub(r'\[이미지 배치 지시: `([^`]+)`[^\n]*\]', marker, md)
    # The converter adds list numbering; remove only redundant Markdown numbers.
    prepared = re.sub(r'(?m)^(\s*-\s+)\d+\.\s+', r'\1', prepared)
    links = []

    def record_link(match):
        code = f'NAVEROG{len(links) + 1}'
        links.append({'marker': code, 'url': match.group(0).strip()})
        # The converter detects CTA styling from the immediately following URL.
        # Replacing this before conversion silently loses its yellow/blue style.
        return match.group(0)

    prepared = re.sub(r'(?m)^https?://[^\s]+[ \t]*$', record_link, prepared)
    return {'source': source.relative_to(root).as_posix(),
            'sourceSha256': hashlib.sha256(md.encode()).hexdigest(),
            'titleFile': title_file.relative_to(root).as_posix() if title_file else None,
            'images': images, 'links': links, 'converterMarkdown': prepared}


def sheet_plan(data):
    """Validate an already observed event and exact live cells; return requests."""
    job, event, source, ledger = (data[k] for k in ('job', 'event', 'source', 'ledger'))
    if event.get('verified') is not True or event.get('status') not in ('published', 'scheduled'):
        raise ValueError('실제 발행/예약 완료 확인이 필요합니다')
    if source['keyword'] != job['keyword'] or source['row'] != job['row']:
        raise ValueError('콘텐츠표 실제 행/키워드 불일치')
    profile = next((p for p in PROFILES if p['account'] == event['account']), None)
    if not profile or event['account'] != job['account']:
        raise ValueError('배정 계정과 발행 계정 불일치')
    account_col = profile['ledgerColumn']
    expected_headers = {'A': '블로그 업로드 날짜', 'D': '카테고리', 'E': '메인 키워드',
                        'F': '애드센스 포스팅 링크', 'H': '네이버 블로그 포스팅 링크',
                        'I': '1.almawade1', 'J': '2.qta14', 'K': '3.supportimes001', 'L': '4.chocolateelf'}
    if any(ledger['headers'].get(k) != v for k, v in expected_headers.items()):
        raise ValueError('현황 시트 헤더가 달라졌습니다. 매핑을 다시 확인하세요')
    if ledger['row'] != ledger['lastDataRow'] + 1:
        raise ValueError('신규 기록은 E열 마지막 데이터 다음 행이어야 합니다')
    when = datetime.fromisoformat(event['publicationTime'].replace('Z', '+00:00'))
    if when.tzinfo is None:
        raise ValueError('발행/예약 시각의 시간대가 필요합니다')
    when = when.astimezone(KST)
    serial = (when.date() - datetime(1899, 12, 30).date()).days
    if event['status'] == 'published':
        link = event['publicUrl']
        if not re.fullmatch(r'https://blog\.naver\.com/' + re.escape(event['account']) + r'/\d+', link):
            raise ValueError('실제 공개 페이지 og:url을 확인하세요')
    else:
        link = when.strftime('%Y년 %m월 %d일 %H시 %M분 예약발행')
    values = {'A': serial, 'D': job['tab'], 'E': job['keyword'],
              'F': job['promotionUrl'], 'H': link, account_col: '홍보성'}

    def request(sheet_id, row, column, value, existing):
        entered = existing.get('userEnteredValue', {})
        desired = {'numberValue': value} if isinstance(value, (int, float)) else {'stringValue': value}
        if entered == desired:
            return None
        if entered or existing.get('effectiveValue') or existing.get('dataValidation'):
            raise ValueError(f'{column}{row}: 기존 값/수식/유효성 확인 필요')
        return {'updateCells': {'start': {'sheetId': sheet_id, 'rowIndex': row - 1,
                                          'columnIndex': ord(column) - ord('A')},
                                'rows': [{'values': [{'userEnteredValue': desired}]}],
                                'fields': 'userEnteredValue'}}

    target = [request(ledger['sheetId'], ledger['row'], col, value,
                      ledger['targetCells'][col]) for col, value in values.items()]
    completion = request(source['sheetId'], source['row'], 'F', 'ㅇ', source['completionCell'])
    return {'ledgerRequests': [r for r in target if r],
            'sourceRequests': [completion] if completion else [], 'date': when.date().isoformat()}


def notify(status):
    if os.name != 'nt':
        return
    message = 'Naver upload completed' if status == 'complete' else 'Naver upload paused; see saved state'
    script = ("$s=Join-Path $env:WINDIR 'Media/Speech Off.wav'; "
              "if(Test-Path -LiteralPath $s){(New-Object System.Media.SoundPlayer $s).PlaySync()}; "
              "Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; "
              "$n=New-Object System.Windows.Forms.NotifyIcon; $n.Icon=[System.Drawing.SystemIcons]::Information; "
              "$n.Visible=$true; $n.ShowBalloonTip(2500,'Naver workflow','" + message +
              "',[System.Windows.Forms.ToolTipIcon]::Info); Start-Sleep -Seconds 3; $n.Dispose()")
    subprocess.run(['powershell', '-NoProfile', '-NonInteractive', '-Command', script],
                   check=True, creationflags=subprocess.CREATE_NO_WINDOW)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    plan = sub.add_parser('plan')
    plan.add_argument('input')
    plan.add_argument('output', help='New project-relative path; existing plans are never overwritten')
    plan.add_argument('--seed', type=int)
    prep = sub.add_parser('prepare')
    prep.add_argument('folder')
    prep.add_argument('output')
    schedule = sub.add_parser('next-time')
    schedule.add_argument('previous')
    schedule.add_argument('--minute-step', type=int, default=10)
    sheet = sub.add_parser('sheet-plan')
    sheet.add_argument('input')
    sheet.add_argument('output')
    note = sub.add_parser('notify')
    note.add_argument('status', choices=['complete', 'paused'])
    args = parser.parse_args()
    if args.command == 'notify':
        notify(args.status)
        return
    if args.command == 'next-time':
        print(next_time(args.previous, args.minute_step))
        return
    if args.command == 'prepare':
        result = prepare(args.folder)
    else:
        data = json.loads(Path(args.input).read_text(encoding='utf-8-sig'))
        result = {'jobs': allocate(data['jobs'], args.seed)} if args.command == 'plan' else sheet_plan(data)
    output = inside(ROOT, args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open('x', encoding='utf-8') as handle:
        json.dump(result, handle, ensure_ascii=False, indent=2)
    print(json.dumps({'saved': output.relative_to(ROOT).as_posix()}, ensure_ascii=False))


if __name__ == '__main__':
    main()
