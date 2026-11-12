from pathlib import Path
import re, shutil, json

root = Path.cwd()
run = root / '26_1111/_blogger_runs/20261112-codex-2048'
jobs = [(54, '타오바오 탈퇴 방법', 1), (55, '네이버회원탈퇴하는방법', 3), (56, '스팀 환불 방법', 5)]
for row, keyword, expected in jobs:
    folder = root / '26_1111' / f'앱사용_{keyword}' / '웹조사/publish'
    out = run / f'prepared-{row}'
    out.mkdir(exist_ok=True)
    html_src = folder / f'앱사용_{keyword}_html콘텐츠.html'
    meta_src = folder / f'앱사용_{keyword}_제목메타디스크립션.txt'
    shutil.copy2(html_src, out / 'original.html')
    shutil.copy2(meta_src, out / 'original.txt')
    html = html_src.read_text(encoding='utf-8')
    pattern = r'\s*<!-- IMAGE_SLOT:(IMG_\d+) START -->.*?<!-- IMAGE_SLOT:\1 END -->'
    ids = re.findall(pattern, html, flags=re.S)
    assert len(ids) == expected, (row, ids)
    html = re.sub(pattern, '', html, flags=re.S)
    if row == 56:
        html = html.replace('아래 예시를 따라 신청해 보세요.', '아래 순서에 따라 신청해 보세요.')
        html = html.replace('아래는 Steam 공식 FAQ의 영문 데스크톱 웹 예시입니다.', '아래는 Steam 공식 FAQ를 바탕으로 정리한 데스크톱 웹 절차입니다.')
        html = html.replace('구매 선택부터 제출까지의 화면은 2026년 11월 11일 조사에 저장된 공식 예시를 사용했습니다.', '')
        html = html.replace('영문 예시에서는 A Purchase', '영문에서는 A Purchase')
        html = html.replace('영문 예시에는 실수로 구매', '영문 화면에는 실수로 구매')
    assert 'BLOGGER_IMAGE_URL' not in html and 'IMAGE_SLOT:' not in html and '<img ' not in html
    (out / 'publish.html').write_text(html, encoding='utf-8')
    meta = meta_src.read_text(encoding='utf-8')
    start = meta.index('[Blogger 이미지 업로드 추천 순서와 삽입 위치]')
    end = meta.index('[제외·보류 이미지]', start)
    summary = ('[Blogger 이미지 업로드 추천 순서와 삽입 위치]\n채택 이미지 0개 / 업로드 순서 없음 / 대체 0개\n'
               + ', '.join(ids) + ' 제외: 공개 재사용 조건을 확인할 근거 및 적합한 대체가 없어 슬롯·토큰·캡션을 제거했습니다. '
               '본문 설명과 공식 링크로 절차를 전달합니다. 원본은 original.html, original.txt에 보존했습니다.\n\n')
    # Original carries obsolete upload and image-count instructions after this section.
    # Keep those in original.txt only; the publication copy has the current mapping.
    meta = meta[:start] + summary
    (out / 'publish.txt').write_text(meta, encoding='utf-8')
    print(json.dumps({'row': row, 'excluded': ids, 'html_chars': len(html), 'official_links': len(re.findall(r'https?://', html))}, ensure_ascii=False))
