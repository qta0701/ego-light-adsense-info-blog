from pathlib import Path
import re
root=Path('26_1113/이슈_코레일 민원접수/웹조사/publish').resolve()
html=(root/'이슈_코레일 민원접수_html콘텐츠.html').read_text(encoding='utf-8')
paths=['01_search.png','02_guide.png','04_guide.png','03_guide.png','blogger-images/06_post_marked.png']
for i,p in enumerate(paths,1):
    from urllib.parse import quote
    html=html.replace('{{BLOGGER_IMAGE_URL_IMG_%02d}}'%i,'http://127.0.0.1:18771/'+quote('26_1113/이슈_코레일 민원접수/웹조사/publish/'+p))
css='''body{font-family:Arial,sans-serif;line-height:1.75;color:#181818;margin:0;background:white} main{max-width:800px;margin:auto;padding:18px;box-sizing:border-box} h2{font-size:24px;border-left:5px solid #3c40ff;padding-left:12px}h3{font-size:20px}.box{background:#f0f3ff;border-radius:8px;padding:14px 20px;margin:24px 0}.box:before{content:attr(data-title);font-weight:bold}a{color:#3c40ff}a.button3{display:block;background:#3c40ff;padding:14px;text-align:center;border-radius:8px;text-decoration:none;min-height:48px;box-sizing:border-box}.faq-item{margin:16px 0;padding:12px;border:1px solid #ddd}.faq-answer{border-left:4px solid #3c40ff;padding-left:12px}.seo-image-caption{text-align:center;color:#444}'''
(Path('26_1113/_blogger_runs/20261113-content-1401/preview-31/preview.html')).write_text('<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>'+css+'</style><main>'+html+'</main></html>',encoding='utf-8')
