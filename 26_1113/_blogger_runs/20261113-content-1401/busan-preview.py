from pathlib import Path
import re
from urllib.parse import quote

pub=Path('26_1113/은행_재테크_부산은행 환전/웹조사/publish')
content=(pub/'은행_재테크_부산은행 환전_html콘텐츠.html').read_text(encoding='utf-8')
files=['02_guide.png','03_guide.png','04_guide.png','05_guide.png','blogger-images/06_delivery_marked.png']
for i,file in enumerate(files,1):
    url='/' + quote((pub/file).as_posix(),safe='/')
    content=content.replace('{{BLOGGER_IMAGE_URL_IMG_%02d}}'%i,url)
css='''*{box-sizing:border-box}body{margin:0;color:#172033;font:17px/1.8 Arial,sans-serif}.content{max-width:860px;margin:auto;padding:20px}h2{font-size:1.4rem;border-bottom:3px solid #3c40ff;padding-bottom:8px}h3{font-size:1.2rem}.box{background:#f0f3ff;border:1px solid #aebcff;border-radius:12px;padding:18px;margin:22px 0}.box:before{content:attr(data-title);font-weight:bold}.wp-block-button__link{display:block;padding:14px;background:#3c40ff;color:white;text-align:center;border-radius:8px;text-decoration:none}.faq-item{margin:12px 0;padding:15px;border:1px solid #dce2ed;border-radius:8px}.faq-answer{border-left:3px solid #3c40ff;padding-left:12px}img{max-width:100%;height:auto}'''
Path('26_1113/_blogger_runs/20261113-content-1401/busan-preview.html').write_text('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+css+'</style></head><body><main class="content">'+content+'</main></body></html>',encoding='utf-8')
ids=re.findall(r'\bid="([^"]+)"',content)
print('duplicate ids:',sorted({x for x in ids if ids.count(x)>1}))
print('slots:',re.findall(r'data-image-id="([^"]+)"',content))
print('remaining tokens:',re.findall(r'\{\{BLOGGER_IMAGE_URL.*?\}\}',content))
