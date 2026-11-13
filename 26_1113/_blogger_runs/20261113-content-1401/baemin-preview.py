from pathlib import Path
from urllib.parse import quote
base=Path('26_1113/노하우2_배민클럽 환불/웹조사/publish')
body=(base/'노하우2_배민클럽 환불_html콘텐츠.html').read_text(encoding='utf-8')
files=['03_01_refund.png','02_06_entry.png','blogger-images/02_cancel_detail.png','04_03_long.png']
for n,f in enumerate(files,1):
 body=body.replace('{{BLOGGER_IMAGE_URL_IMG_%02d}}'%n,'/'+quote((base/f).as_posix()))
css='''body{font-family:Arial,"Malgun Gothic",sans-serif;color:#172334;line-height:1.8;margin:0;padding:20px;overflow-wrap:anywhere}main{max-width:760px;margin:auto}h2{font-size:1.45rem;border-left:5px solid #3c40ff;padding-left:12px;margin-top:42px}h2 a{color:inherit;text-decoration:none}.box{background:#f0f3ff;padding:20px;margin:22px 0;border-radius:10px}.box:before{content:attr(data-title);font-weight:bold;color:#3346b1}.seo-image-caption{text-align:center;color:#4b5563}a{color:#3c40ff}.button3{display:block;background:#3c40ff;padding:13px;text-align:center;border-radius:8px;text-decoration:none}.faq-item{padding:14px;border:1px solid #ddd;border-radius:8px;margin:10px 0}.faq-answer{border-left:3px solid #3c40ff;padding-left:10px}img{max-width:100%;height:auto}'''
out=Path('26_1113/_blogger_runs/20261113-content-1401/baemin-preview.html')
out.write_text('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+css+'</style></head><body><main>'+body+'</main></body></html>',encoding='utf-8')
