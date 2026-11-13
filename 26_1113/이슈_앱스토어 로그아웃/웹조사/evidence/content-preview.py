from pathlib import Path
import re
from urllib.parse import quote
base=Path('26_1113/이슈_앱스토어 로그아웃/웹조사')
pub=base/'publish'
text=(pub/'이슈_앱스토어 로그아웃_html콘텐츠.html').read_text(encoding='utf-8')
for n,p in enumerate(['02_guide.png','04_guide.png','blogger-images/05_family_marked.png'],1):
    text=text.replace('{{BLOGGER_IMAGE_URL_IMG_%02d}}'%n,'/'+quote((pub / p).as_posix()))
preview='''<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>*{box-sizing:border-box}body{font-family:Arial,sans-serif;font-size:18px;line-height:1.7;margin:0;color:#111}.post-body{max-width:820px;margin:auto;padding:16px}h2{border-left:5px solid #3c40ff;padding-left:12px;border-bottom:1px solid #ddd;line-height:1.4}h3{line-height:1.4}table{border-collapse:collapse;width:100%}td,th{padding:8px;border:1px solid #ddd;text-align:left;overflow-wrap:anywhere}.button3{display:block;background:#3c40ff;text-align:center;padding:12px;border-radius:8px;text-decoration:none}.seo-image{max-width:100%;height:auto}</style></head><body><main class="post-body">'''+text+'</main></body></html>'
(base/'evidence/content-preview.html').write_text(preview,encoding='utf-8')
print('lines',len(text.splitlines()),'h2',len(re.findall(r'<h2\b',text)))
