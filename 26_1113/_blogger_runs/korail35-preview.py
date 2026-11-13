from pathlib import Path
from urllib.parse import quote
import re
base=Path('26_1113/노하우_코레일 승차권 조회/웹조사/publish')
body=(base/'노하우_코레일 승차권 조회_html콘텐츠.html').read_text(encoding='utf-8')
files=['01_01_search.png','blogger-images/08_main_entry_marked.png','02_02_login.png','03_06_method_clean.png','04_07_form_clean.png']
for i,f in enumerate(files,1):
    path=(base/f).as_posix()
    body=body.replace('{{BLOGGER_IMAGE_URL_IMG_%02d}}'%i,'http://127.0.0.1:8765/'+quote(path))
css='''body{font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:16px;color:#172033;line-height:1.8;font-size:17px}*{box-sizing:border-box}h2{font-size:24px;border-left:5px solid #3c40ff;padding-left:12px;border-bottom:1px solid #ddd}h2 a{color:inherit;text-decoration:none}a{color:#1b1bf8}.box.info{background:#f0f3ff;border-radius:8px;padding:16px;margin:18px 0}.box.info:before{content:attr(data-title);font-weight:bold}.button3,.button2{display:block;background:#3c40ff;text-align:center;border-radius:8px;padding:14px;margin:12px 0;text-decoration:none}.button2{background:#dd6b20}.table-responsive{overflow:auto}table{width:100%;border-collapse:collapse}td,th{border-bottom:1px solid #ccc;padding:8px;text-align:left}.seo-image-caption{text-align:center;color:#444}'''
preview='<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+css+'</style></head><body>'+body+'</body></html>'
Path('26_1113/_blogger_runs/korail35-preview.html').write_text(preview,encoding='utf-8')
