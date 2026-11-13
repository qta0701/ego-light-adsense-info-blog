from pathlib import Path
p=Path('26_1113/은행_재테크_하나은행 환율조회/웹조사')
h=(p/'publish/은행_재테크_하나은행 환율조회_html콘텐츠.html').read_text(encoding='utf-8')
for i,name in enumerate(['01_search.png','02_guide.png','03_guide.png','04_guide.png'],1):
    h=h.replace('{{BLOGGER_IMAGE_URL_IMG_%02d}}'%i,'../publish/'+name)
(p/'evidence/content-preview.html').write_text('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:Arial,sans-serif;max-width:820px;margin:auto;padding:16px;box-sizing:border-box}</style></head><body>'+h+'</body></html>',encoding='utf-8')
