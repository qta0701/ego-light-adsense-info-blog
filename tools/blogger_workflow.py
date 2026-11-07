"""Local Blogger workflow guards and Sheets request plans; no remote writes.

Python 3.14, standard library only. Agents perform live reads, UI review and writes.
"""
import argparse
from datetime import datetime, timedelta, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import uuid
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
SHEET = '1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s'
KST = timezone(timedelta(hours=9))
HEADERS = {
    'content': '애드센스 블로그 작성여부',
    'draft': '애드센스 임시저장 여부',
    'url': '애드센스 포스팅 링크',
    'keyword': '메인 키워드',
    'published_at': '애드센스 포스팅 작성일',
}


def read(path):
    return json.loads(Path(path).read_text(encoding='utf-8-sig'))


def inside(root, relative):
    if not isinstance(relative, str) or not relative or Path(relative).is_absolute() or re.match(r'^[A-Za-z]:', relative):
        raise ValueError('프로젝트 상대경로가 필요합니다')
    root = Path(root).resolve()
    result = (root / relative).resolve()
    if not result.is_relative_to(root):
        raise ValueError('프로젝트 밖 경로는 허용하지 않습니다')
    return result


def keyword_dir(root, relative):
    root = Path(root).resolve()
    if not list((root / 'guidelines').glob('*.md')):
        raise ValueError('guidelines/*.md가 없습니다. 프로젝트 경로를 확인하세요')
    folder = inside(root, relative)
    if not folder.is_dir() or folder.parent.parent != root or not re.fullmatch(r'\d{2}_\d{4}', folder.parent.name):
        raise ValueError('YY_MMDD/{탭}_{키워드} 폴더를 지정하세요 (웹조사/publish가 아님)')
    return folder


def scan(relative, root=ROOT):
    folder = keyword_dir(root, relative)
    found = {}
    for kind, suffix in [('html', '_html콘텐츠.html'), ('meta', '_제목메타디스크립션.txt')]:
        name = folder.name + suffix
        matches = []
        # Examine the whole keyword subtree, including legacy outputs locations.
        for current, dirs, files in os.walk(folder, followlinks=False):
            for d in dirs:
                p = Path(current) / d
                if p.is_symlink() or p.is_junction():
                    raise ValueError(f'연결 폴더는 중복 검사에서 자동 탐색하지 않습니다: {p.name}')
            for f in files:
                if f.casefold() == name.casefold():
                    p = Path(current) / f
                    if p.is_symlink() or not p.resolve().is_relative_to(folder):
                        raise ValueError('결과 파일이 키워드 폴더 밖을 참조합니다')
                    matches.append({'path': p.relative_to(root).as_posix(), 'bytes': p.stat().st_size})
        found[kind] = sorted(matches, key=lambda x: x['path'])
    if not found['html'] and not found['meta']:
        status = 'create'
    elif len(found['html']) == len(found['meta']) == 1:
        if all(found[k][0]['bytes'] > 0 for k in found) and Path(found['html'][0]['path']).parent == Path(found['meta'][0]['path']).parent:
            status = 'skip_existing'
        else:
            status = 'review_partial'
    else:
        status = 'review_partial' if max(map(len, found.values())) <= 1 else 'review_duplicates'
    return {'folder': folder.relative_to(root).as_posix(), 'status': status, **found}


def claim(job, root=ROOT):
    """Reserve both the keyword folder and spreadsheet row across local chats."""
    folder = keyword_dir(root, job['folder'])
    if type(job['row']) is not int or job['row'] < 2 or not str(job['tab']).strip():
        raise ValueError('실제 탭과 데이터 행 번호가 필요합니다')
    if job.get('spreadsheetId') != SHEET:
        raise ValueError('대상 spreadsheetId 불일치')
    if not isinstance(job.get('owner'), str) or not job['owner'].strip():
        raise ValueError('owner에 실제 채팅/실행 ID를 기록하세요')
    if job.get('stage') not in ('A', 'B'):
        raise ValueError('stage는 A 또는 B')
    keys = ['folder:' + folder.relative_to(root).as_posix().casefold(),
            f"row:{SHEET}:{job['tab']}:{job['row']}"]
    directory = inside(root, '.session/blogger-workflow/locks')
    directory.mkdir(parents=True, exist_ok=True)
    token = uuid.uuid4().hex
    receipt = {'token': token, 'job': job, 'createdAt': datetime.now(KST).isoformat(), 'locks': []}
    acquired = []
    try:
        for key in sorted(keys):
            p = directory / (hashlib.sha256(key.encode()).hexdigest() + '.json')
            with p.open('x', encoding='utf-8') as f:
                acquired.append(p)
                json.dump({'token': token, 'key': key, 'job': job, 'createdAt': receipt['createdAt']}, f, ensure_ascii=False)
            receipt['locks'].append(p.relative_to(root).as_posix())
        # Close scan/claim race: another task may have completed before reservation.
        if job['stage'] == 'A' and scan(job['folder'], root)['status'] != 'create':
            raise ValueError('기존/부분 결과가 있습니다. 생성 잠금 해제 후 검토하세요')
        return receipt
    except Exception:
        for p in acquired:
            p.unlink()
        raise


def release(receipt, root=ROOT):
    directory = inside(root, '.session/blogger-workflow/locks')
    paths = [inside(root, x) for x in receipt['locks']]
    if not paths or len(paths) != len(set(paths)):
        raise ValueError('잘못된 잠금 영수증')
    for p in paths:
        if p.parent != directory or read(p)['token'] != receipt['token']:
            raise ValueError('다른 실행의 잠금은 해제할 수 없습니다')
    for p in paths:
        p.unlink()
    return {'released': True}


def columns(headers):
    norm = lambda x: re.sub(r'\s+', '', str(x))
    result = {}
    for key, title in HEADERS.items():
        indexes = [i for i, h in enumerate(headers) if norm(h) == norm(title)]
        if len(indexes) != 1:
            raise ValueError(f'헤더 누락/중복: {title}')
        result[key] = indexes[0]
    return result


def a1(index):
    result = ''
    index += 1
    while index:
        index, digit = divmod(index - 1, 26)
        result = chr(65 + digit) + result
    return result


def entered(cell):
    value = cell.get('userEnteredValue', {})
    if 'formulaValue' in value:
        return ('formula', value['formulaValue'])
    if value:
        return next(iter(value.values()))
    effective = cell.get('effectiveValue', {})
    if effective:
        return next(iter(effective.values()))
    return cell.get('formattedValue', '')


def blank(cell):
    # Formula returning "", spaces, zero, or FALSE are not empty input cells.
    return entered(cell) in ('', None)


def stamp(value):
    date = datetime.fromisoformat(value.replace('Z', '+00:00'))
    if date.tzinfo is None:
        raise ValueError('시각에는 UTC offset이 필요합니다')
    return date


def inspect_row(snapshot, now=None):
    if snapshot.get('spreadsheetId') != SHEET:
        raise ValueError('대상 spreadsheetId 불일치')
    if type(snapshot.get('sheetId')) is not int or snapshot['sheetId'] < 0 or not snapshot.get('tab'):
        raise ValueError('메타데이터에서 확인한 탭/sheetId가 필요합니다')
    if type(snapshot.get('row')) is not int or snapshot['row'] <= snapshot.get('headerRow', 1):
        raise ValueError('실제 데이터 행 번호가 필요합니다')
    age = ((now or datetime.now(KST)) - stamp(snapshot['readAt'])).total_seconds()
    if not 0 <= age <= 300:
        raise ValueError('시트 snapshot이 오래됐습니다. 5분 이내 live read가 필요합니다')
    cols = columns(snapshot['headers'])
    cells = snapshot['cells']
    if len(cells) <= max(cols.values()) or any(not isinstance(c, dict) for c in cells):
        raise ValueError('A열부터 대상 헤더 열까지 CellData를 제공하세요. 빈 셀은 {}')
    if not snapshot.get('keyword') or entered(cells[cols['keyword']]) != snapshot['keyword']:
        raise ValueError('행의 메인 키워드가 지정 키워드와 다릅니다')
    return cols, cells


def preflight(snapshot, now=None):
    cols, cells = inspect_row(snapshot, now)
    if not blank(cells[cols['url']]):
        decision = 'skip_existing_link'
    elif not blank(cells[cols['draft']]):
        decision = 'resume_existing_only'
    elif not blank(cells[cols['published_at']]):
        decision = 'review_inconsistent_date'
    else:
        decision = 'eligible_new'
    return {'decision': decision, 'columns': {k: a1(v) for k, v in cols.items()},
            'note': '기존 Blogger 글/로컬 기록 조회와 행 잠금 후 신규 작업 여부를 확정하세요'}


def checked_url(value):
    u = urlparse(value)
    if u.scheme != 'https' or not u.hostname or u.username or u.password or u.hostname in ('localhost', 'www.blogger.com', 'blogger.com') or u.fragment:
        raise ValueError('실제 공개 글 HTTPS URL이 필요합니다 (편집기/미리보기 주소 금지)')
    if 'preview' in u.query.lower() or 'token=' in u.query.lower():
        raise ValueError('미리보기/토큰 URL은 기록하지 않습니다')
    return value


def sheet_plan(snapshot, event, root=ROOT, now=None):
    cols, cells = inspect_row(snapshot, now)
    kind = event['type']
    if event.get('verified') is not True:
        raise ValueError('실제 결과를 에이전트가 검수한 event만 허용합니다')
    wanted = {}
    if kind == 'content':
        safe = lambda s: re.sub(r'[<>:"/\\|?*\x00-\x1f]', '_', s).strip(' .')
        expected = safe(snapshot['tab']) + '_' + safe(snapshot['keyword'])
        if keyword_dir(root, event['folder']).name != expected:
            raise ValueError('결과 폴더와 대상 행의 탭/키워드가 다릅니다')
        report = scan(event['folder'], root)
        if report['status'] != 'skip_existing':
            raise ValueError('정상적인 결과물 쌍이 없습니다')
        # File existence is mechanical; facts/image matching require agent review.
        for key in ('html', 'meta'):
            inside(root, report[key][0]['path']).read_text(encoding='utf-8-sig')
        wanted['content'] = 'ㅇ'
    elif kind in ('draft', 'published'):
        if not event.get('blogId') or not event.get('postId'):
            raise ValueError('확인한 blogId/postId가 필요합니다')
        if kind == 'draft':
            if not blank(cells[cols['url']]) or not blank(cells[cols['published_at']]):
                raise ValueError('이미 발행 정보가 있습니다. 초안 이벤트로 처리하지 않습니다')
            stamp(event['savedAt'])
        wanted['draft'] = 'ㅇ'
        if kind == 'published':
            wanted['url'] = checked_url(event['url'])
            published = stamp(event['publishedAt']).astimezone(KST)
            if published > (now or datetime.now(KST)) + timedelta(seconds=60):
                raise ValueError('미래 예약 시각은 발행 완료 시각이 아닙니다')
            # Sheets serial represents Korean wall time without changing spreadsheet timezone.
            wanted['published_at'] = (published.replace(tzinfo=None) - datetime(1899, 12, 30)).total_seconds() / 86400
    else:
        raise ValueError('event.type은 content/draft/published')
    requests, changes = [], []
    for key, value in wanted.items():
        col = cols[key]
        current = entered(cells[col])
        equal = current == value
        if key == 'published_at' and isinstance(current, (int, float)) and not isinstance(current, bool):
            equal = abs(current - value) < 1 / 86400
        if not blank(cells[col]):
            if equal:
                continue
            raise ValueError(f'기존 값/수식 충돌: {a1(col)}{snapshot["row"]}')
        validation = cells[col].get('dataValidation', {})
        if validation.get('strict'):
            cond = validation.get('condition', {})
            allowed = [v.get('userEnteredValue') for v in cond.get('values', [])]
            if cond.get('type') != 'ONE_OF_LIST' or value not in allowed:
                raise ValueError('엄격한 데이터 유효성 규칙을 연결 도구로 확인하세요')
        data = {'userEnteredValue': {'numberValue' if isinstance(value, (int, float)) else 'stringValue': value}}
        fields = 'userEnteredValue'
        if key == 'published_at':
            data['userEnteredFormat'] = {'numberFormat': {'type': 'DATE_TIME', 'pattern': 'yyyy. m. d AM/PM h:mm:ss'}}
            fields += ',userEnteredFormat.numberFormat'
        requests.append({'updateCells': {'range': {'sheetId': snapshot['sheetId'], 'startRowIndex': snapshot['row'] - 1,
            'endRowIndex': snapshot['row'], 'startColumnIndex': col, 'endColumnIndex': col + 1},
            'rows': [{'values': [data]}], 'fields': fields}})
        changes.append({'cell': f"{a1(col)}{snapshot['row']}", 'value': value})
    return {'spreadsheetId': SHEET, 'tab': snapshot['tab'], 'row': snapshot['row'], 'keyword': snapshot['keyword'],
            'requests': requests, 'changes': changes, 'snapshotReadAt': snapshot['readAt'],
            'status': 'plan_only', 'requires': '행 잠금 유지, 쓰기 직전 재조회·비교, 동일 batch 적용 후 재조회. 원격 쓰기 없음.'}


def notify(ok):
    if os.name != 'nt':
        return
    # Fixed strings only; never interpolate user supplied content into shell code.
    message = 'Blogger workflow completed' if ok else 'Blogger workflow stopped with an error'
    script = "$s=Join-Path $env:WINDIR 'Media/Speech Off.wav'; if(Test-Path -LiteralPath $s){(New-Object System.Media.SoundPlayer $s).PlaySync()}; Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; $n=New-Object System.Windows.Forms.NotifyIcon; $n.Icon=[System.Drawing.SystemIcons]::Information; $n.Visible=$true; $n.ShowBalloonTip(2500,'Blogger workflow','" + message + "',[System.Windows.Forms.ToolTipIcon]::Info); Start-Sleep -Seconds 3; $n.Dispose()"
    subprocess.run(['powershell', '-NoProfile', '-Command', script], timeout=15, creationflags=subprocess.CREATE_NO_WINDOW, capture_output=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--no-notify', action='store_true')
    subs = parser.add_subparsers(dest='command', required=True)
    subs.add_parser('scan').add_argument('folder')
    for name in ('claim', 'release', 'preflight'):
        subs.add_parser(name).add_argument('input')
    plan = subs.add_parser('sheet-plan')
    plan.add_argument('snapshot')
    plan.add_argument('event')
    args = parser.parse_args()
    ok = False
    try:
        if args.command == 'scan':
            result = scan(args.folder)
        elif args.command == 'claim':
            result = claim(read(args.input))
        elif args.command == 'release':
            result = release(read(args.input))
        elif args.command == 'preflight':
            result = preflight(read(args.input))
        else:
            result = sheet_plan(read(args.snapshot), read(args.event))
        print(json.dumps(result, ensure_ascii=False, indent=2))
        ok = True
    except (ValueError, KeyError, TypeError, OSError) as e:
        print(json.dumps({'error': str(e)}, ensure_ascii=False), file=sys.stderr)
        return 1
    finally:
        if not args.no_notify:
            try:
                notify(ok)
            except (OSError, subprocess.SubprocessError):
                pass
    return 0


if __name__ == '__main__':
    sys.exit(main())
