"""Local research packaging. No credentials, browser launch, or sheet writes.

Python 3.14; Pillow is required only for image validation/rendering.
"""
import argparse
from datetime import date, datetime, timezone, timedelta
import hashlib
import json
import os
from pathlib import Path
import re
import sys
import uuid

ROOT = Path(__file__).resolve().parents[1]
KST = timezone(timedelta(hours=9))


def read(path):
    return json.loads(Path(path).read_text(encoding='utf-8-sig'))


def write(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + '.tmp')
    tmp.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding='utf-8')
    tmp.replace(path)


def local(base, relative):
    """Portable metadata stores relative paths only; never interprets old PC paths."""
    if Path(relative).is_absolute() or re.match(r'^[A-Za-z]:', relative):
        raise ValueError('메타데이터 경로는 상대경로여야 합니다')
    result = (Path(base) / relative).resolve()
    if not result.is_relative_to(Path(base).resolve()):
        raise ValueError('폴더 밖 경로는 허용하지 않습니다')
    return result


def safe_name(value):
    if not isinstance(value, str) or not value.strip():
        raise ValueError('빈 이름')
    result = re.sub(r'[<>:"/\\|?*\x00-\x1f]', '_', value).strip(' .')
    if not result or len(result) > 100:
        raise ValueError('이름이 비었거나 너무 깁니다')
    return result


def initialize(config, root=ROOT):
    if not list((root / 'guidelines').glob('*.md')):
        raise ValueError('guidelines/*.md가 없습니다. 프로젝트 경로를 확인하세요')
    day = date.fromisoformat(config.get('date') or datetime.now(KST).date().isoformat())
    jobs = config['jobs']
    if not jobs:
        raise ValueError('키워드를 하나 이상 지정하세요')
    concurrency = config.get('concurrency', 2)
    if type(concurrency) is not int or not 1 <= concurrency <= 3:
        raise ValueError('concurrency는 1~3이어야 합니다')
    seen, folders, prepared = set(), set(), []
    run_id = day.strftime('%Y%m%d') + '-' + uuid.uuid4().hex[:8]
    for j in jobs:
        if type(j['row']) is not int or j['row'] < 2:
            raise ValueError('row는 헤더 다음의 실제 행 번호여야 합니다')
        key = (j['tab'], j['row'])
        queries = j.get('queries') or [j['keyword']]
        if not isinstance(queries, list) or not 1 <= len(queries) <= 2 or any(not isinstance(q,str) or not 2 <= len(q.strip()) <= 35 for q in queries) or len(set(queries)) != len(queries):
            raise ValueError('검색어는 중복 없는 1~2개의 2~35자 문자열이어야 합니다')
        if j.get('multiIntent') is True and len(queries) != 2:
            raise ValueError('복합 의도 키워드는 queries 2개가 필요합니다')
        folder = f"{day:%y_%m%d}/{safe_name(j['tab'])}_{safe_name(j['keyword'])}/웹조사"
        if key in seen or folder in folders:
            raise ValueError('행 또는 저장 폴더가 중복됩니다')
        seen.add(key); folders.add(folder)
        destination = local(root, folder)
        if destination.exists() and any(destination.iterdir()):
            raise ValueError(f'기존 결과 보존: {folder}. 다른 날짜/새 대상 또는 수동 재개를 사용하세요')
        prepared.append({**j, 'queries':queries, 'multiIntent':j.get('multiIntent') is True,
                         'folder': folder, 'spaceName': f'research-{run_id}-{j["row"]}-{len(prepared)}'})
    run = root / day.strftime('%y_%m%d') / '_research_runs' / run_id
    run.mkdir(parents=True)
    manifest = {'version': 1, 'runId': run_id, 'date': day.isoformat(),
                'spreadsheetId': config['spreadsheetId'], 'concurrency': concurrency,
                'jobs': prepared}
    for j in prepared:
        d = local(root, j['folder'])
        for sub in ('raw', 'evidence', 'publish'):
            (d / sub).mkdir(parents=True, exist_ok=True)
        write(d / 'research.json', {'keyword': j['keyword'], 'row': j['row'], 'tab': j['tab'],
              'date': day.isoformat(), 'queries':j['queries'], 'multiIntent':j['multiIntent'],
              'body': '', 'sources': [], 'images': [],
              'limits': {'bodyMin': 3500, 'bodyMax': 5500, 'guideMax': 8,
                         'referenceMax': 3, 'rawMax': 12},
              'exceptionReason': '', 'visualReviewed': False})
    write(run / 'manifest.json', manifest)
    # Relative manifest path keeps generated entry points usable after moving the repo.
    (run / 'start.mjs').write_text(
        "import { startBatch } from '../../../tools/research_browser.mjs';\n"
        "await startBatch(new URL('./manifest.json', import.meta.url));\n", encoding='utf-8')
    return run / 'manifest.json'


def check(d, data):
    from PIL import Image
    errors = []
    lim = data['limits']
    # Limits are policy, not an editable way to bypass validation.
    if lim != {'bodyMin': 3500, 'bodyMax': 5500, 'guideMax': 8, 'referenceMax': 3, 'rawMax': 12}:
        errors.append('기본 limits 변경 불가: 예외 사유를 사용하세요')
    n = len(data['body'])
    complex_job = data.get('multiIntent') is True
    queries = data.get('queries', [data['keyword']])
    if complex_job and (len(queries)!=2 or len(set(queries))!=2):
        errors.append('복합 키워드는 서로 다른 검색어 2개 필요')
    if not 3500 <= n <= (7500 if complex_job else 5500):
        errors.append(f'본문 {n}자: 3500~{7500 if complex_job else 5500}자 필요(출처/이미지 목록 제외)')
    sources = data['sources']
    ids = [s['id'] for s in sources]
    if len(set(ids)) != len(ids) or not 1 <= len(ids) <= 2:
        errors.append('중복 없는 출처 1~2개 필요')
    if not any(s.get('official') is True for s in sources):
        errors.append('공식 출처 필요')
    for s in sources:
        if not re.match(r'^https?://', s['url']) or not s.get('checkedAt'):
            errors.append(f'출처 URL/확인일 누락: {s["id"]}')
    images = data['images']
    guides = [i for i in images if i['role'] == 'guide']
    refs = [i for i in images if i['role'] == 'reference']
    searches = [i for i in images if i['role'] == 'search']
    exception = bool(data.get('exceptionReason', '').strip())
    if not 4 <= len(guides) <= (9 if complex_job and exception else 8) or len(refs)>3:
        errors.append('안내 4~8장(복합 예외 9장), 참고 최대 3장')
    if len(searches)!=(2 if complex_job else 1) or len(images)> (14 if complex_job and exception else 12):
        errors.append('검색결과 이미지 검색어당 1장 필요; 발행용 기본 최대 12장, 복합 예외 최대 14장')
    if len(images) != len(guides) + len(refs) + len(searches):
        errors.append('role은 guide, reference 또는 search')
    hashes, paths = set(), set()
    for i in images:
        if i.get('sourceId') not in ids or not i.get('caption') or not i.get('alt'):
            errors.append('이미지 출처·캡션·alt 누락')
        path = local(d, i['file'])
        if not path.is_relative_to((d / 'raw').resolve()):
            errors.append('이미지 원본은 raw/ 안에 두세요')
        if path in paths:
            errors.append(f'중복 파일: {i["file"]}')
        paths.add(path)
        if not path.is_file():
            errors.append(f'파일 없음: {i["file"]}'); continue
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        if digest in hashes:
            errors.append(f'동일 이미지 중복: {i["file"]}')
        hashes.add(digest)
        try:
            with Image.open(path) as im:
                w, h = im.size
                im.verify()
            if min(w, h) < 200:
                errors.append(f'해상도 부족: {i["file"]}')
            for box in i.get('boxes', []):
                x, y, bw, bh = box
                if x < 0 or y < 0 or bw <= 0 or bh <= 0 or x+bw > w or y+bh > h:
                    errors.append(f'표식이 이미지 밖: {i["file"]}')
            if i['role'] in ('guide','search') and not i.get('boxes'):
                errors.append(f'안내·검색 이미지 표식 좌표 필요: {i["file"]}')
            if i['role']=='search' and i.get('query') not in queries:
                errors.append(f'검색결과 이미지의 검색어 누락: {i["file"]}')
        except (OSError, ValueError) as exc:
            errors.append(f'이미지 검사 실패: {i["file"]}: {exc}')
    raw = list((d / 'raw').glob('*'))
    if len([p for p in raw if p.suffix.lower() in ('.png', '.jpg', '.webp')]) > (14 if complex_job and exception else 12):
        errors.append('원본 캡처 상한 초과(기본 12, 복합 예외 14)')
    return errors


def package(d, data):
    from PIL import Image, ImageDraw, ImageFont
    errors = check(d, data)
    if errors:
        raise ValueError('\n'.join(errors))
    out = d / 'publish'
    out.mkdir(exist_ok=True)
    # Only managed output files are replaced; unrelated files are untouched.
    previous = read(out/'index.json') if (out/'index.json').exists() else []
    for name in previous:
        p = local(out, name)
        if p.is_file(): p.unlink()
    source_map = {s['id']: s for s in data['sources']}
    index, markdown = [], [f'# {data["keyword"]} 웹조사 결과',
        f'조사일: {data["date"]} | {data["tab"]} {data["row"]}행', data['body'], '## 이미지 사용 순서']
    font_path = Path(os.environ.get('WINDIR', 'C:/Windows'))/'Fonts'/'malgun.ttf'
    f = ImageFont.truetype(str(font_path), 28)
    for number, item in enumerate(data['images'], 1):
        with Image.open(local(d,item['file'])) as source:
            im = source.convert('RGB')
        # Caption below the screenshot; no invented UI or overwritten original.
        w,h = im.size
        scale = max(1, 720/w)
        im = im.resize((round(w*scale),round(h*scale)), Image.Resampling.LANCZOS)
        lines, line = [], ''
        tmp = ImageDraw.Draw(im)
        for c in item['caption']:
            if tmp.textlength(line+c,font=f) > im.width-32:
                lines.append(line); line=c
            else: line+=c
        lines.append(line)
        canvas = Image.new('RGB',(im.width,im.height+len(lines)*40+58),'white')
        canvas.paste(im,(0,0)); draw=ImageDraw.Draw(canvas)
        for k,(x,y,bw,bh) in enumerate(item.get('boxes',[]),1):
            x,y,bw,bh=[v*scale for v in (x,y,bw,bh)]
            pad=max(12,round(10*scale));x=max(5,x-pad);y=max(5,y-pad)
            bw=min(im.width-5-x,bw+2*pad);bh=min(im.height-5-y,bh+2*pad)
            draw.rectangle((x,y,x+bw,y+bh),outline='#e32f35',width=8)
            # Arrow terminates at target edge; fits within screenshot.
            ex,ey=x+bw/2,y
            sy=max(5,y-52)
            draw.line((ex,sy,ex,ey),fill='#e32f35',width=8)
            if ey-sy>16: draw.polygon([(ex,ey),(ex-14,ey-20),(ex+14,ey-20)],fill='#e32f35')
            draw.text((min(im.width-45,x+8),min(im.height-40,y+7)),str(k),font=f,fill='#e32f35',stroke_width=3,stroke_fill='white')
        for k,line in enumerate(lines): draw.text((16,im.height+8+k*40),line,font=f,fill='#24334a')
        draw.text((16,canvas.height-43),f'{number:02d} | {item["sourceId"]} | {data["date"]}',font=f,fill='#526176')
        name=f'{number:02d}_{item["role"]}.png';canvas.save(out/name);index.append(name)
        markdown.extend([f'![{item["alt"]}]({name})', item['caption'],
                         f'출처: [{item["sourceId"]}]({source_map[item["sourceId"]]["url"]})'])
    markdown.append('## 출처 및 확인일')
    markdown.extend(f'- [{s["id"]}: {s["title"]}]({s["url"]}) — {s["checkedAt"]}' for s in data['sources'])
    name=f'{safe_name(data["tab"])}_{safe_name(data["keyword"])}_웹조사결과.md'
    (out/name).write_text('\n\n'.join(markdown)+'\n',encoding='utf-8');index.append(name)
    write(out/'index.json',index)
    write(d/'validation.json',{'checkedAt':datetime.now(KST).isoformat(),'errors':[],
          'researchSha256':hashlib.sha256((d/'research.json').read_bytes()).hexdigest(),
          'artifactHashes':{str((out/name).relative_to(d)):hashlib.sha256((out/name).read_bytes()).hexdigest() for name in index},
          'visualReviewed':data.get('visualReviewed') is True,
          'status':'ready_for_sheet' if data.get('visualReviewed') is True else 'needs_visual_review'})
    return out


def notify(ok):
    if os.name != 'nt': return
    import subprocess
    message = '웹조사 도구 처리가 완료되었습니다.' if ok else '웹조사 도구 오류: 실행 결과를 확인하세요.'
    script = "$s=Join-Path $env:WINDIR 'Media/Speech Off.wav'; if(Test-Path $s){(New-Object System.Media.SoundPlayer $s).PlaySync()}; Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; $n=New-Object System.Windows.Forms.NotifyIcon; $n.Icon=[System.Drawing.SystemIcons]::Information; $n.Visible=$true; $n.ShowBalloonTip(2500,'웹조사', '"+message+"',[System.Windows.Forms.ToolTipIcon]::Info); Start-Sleep -Seconds 3; $n.Dispose()"
    subprocess.run(['powershell','-NoProfile','-Command',script], creationflags=0x08000000, timeout=15, capture_output=True)


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command',choices=['init','validate','pack'])
    parser.add_argument('path',type=Path)
    parser.add_argument('--no-notify',action='store_true')
    args=parser.parse_args();ok=False
    try:
        if args.command=='init': print(initialize(read(args.path)))
        else:
            d=args.path.resolve();data=read(d/'research.json')
            if args.command=='validate':
                errors=check(d,data);print(json.dumps({'errors':errors},ensure_ascii=False))
                if errors: return 1
            else: print(package(d,data))
        ok=True;return 0
    except (ValueError,KeyError,OSError) as exc:
        print(str(exc),file=sys.stderr);return 1
    finally:
        if not args.no_notify:
            try: notify(ok)
            except Exception: pass  # Notification failures never hide task results.


if __name__=='__main__': sys.exit(main())
