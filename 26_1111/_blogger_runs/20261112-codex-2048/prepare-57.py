from pathlib import Path
import json
import re
import shutil

root = Path.cwd()
run = root / '26_1111/_blogger_runs/20261112-codex-2048'
source = root / '26_1111/앱사용_애플 환불 요청/웹조사/publish'
out = run / 'prepared-57'
out.mkdir(exist_ok=True)
html_src = source / '앱사용_애플 환불 요청_html콘텐츠.html'
txt_src = source / '앱사용_애플 환불 요청_제목메타디스크립션.txt'
shutil.copy2(html_src, out / 'original.html')
shutil.copy2(txt_src, out / 'original.txt')
html = html_src.read_text(encoding='utf-8')
pattern = r'\s*<!-- IMAGE_SLOT:(IMG_\d+) START -->.*?<!-- IMAGE_SLOT:\1 END -->'
ids = re.findall(pattern, html, flags=re.S)
assert ids == ['IMG_01', 'IMG_02', 'IMG_03'], ids
html = re.sub(pattern, '', html, flags=re.S)
html = html.replace('공개 Apple 지원 문서와 공식 예시 화면을 바탕으로 작성했습니다.', '공개 Apple 지원 문서를 바탕으로 작성했습니다.')
assert not re.search(r'BLOGGER_IMAGE_URL|IMAGE_SLOT:|<img\b', html, flags=re.I)
assert 'https://support.apple.com/' in html and 'reportaproblem.apple.com' in html
(out / 'publish.html').write_text(html, encoding='utf-8')
meta = txt_src.read_text(encoding='utf-8')
start = meta.index('[Blogger 이미지 업로드 추천 순서와 삽입 위치]')
summary = ('[Blogger 이미지 업로드 추천 순서와 삽입 위치]\n'
           '채택 이미지 0개 / 업로드 0개 / 대체 0개\n'
           'IMG_01(02_guide.png), IMG_02(04_guide.png), IMG_03(05_guide.png) 제외: '
           'Apple 공식 예시의 외부 재게시 허용 근거와 적합한 대체가 없어 슬롯·토큰·캡션을 제거했습니다. '
           '본문의 절차 설명과 공식 링크로 핵심 안내를 전달합니다. '
           '원본 HTML/TXT는 실행 디렉터리 prepared-57/original.html 및 original.txt에 보존했습니다.\n')
(out / 'publish.txt').write_text(meta[:start] + summary, encoding='utf-8')
print(json.dumps({'row': 57, 'excluded': ids, 'uploaded': 0, 'replaced': 0, 'html_chars': len(html), 'links': len(re.findall(r'https?://', html))}, ensure_ascii=False))
