from pathlib import Path
from urllib.parse import quote
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

root=Path.cwd()
pub=root/'26_1113/노하우2_인스타그램 탈퇴방법/웹조사/publish'
name='노하우2_인스타그램 탈퇴방법'
htmlpath=pub/(name+'_html콘텐츠.html')
txtpath=pub/(name+'_제목메타디스크립션.txt')
html=htmlpath.read_text(encoding='utf-8').replace('height="1056"','height="1055"')
txt=txtpath.read_text(encoding='utf-8').replace('1280×1056','1280×1055')
htmlpath.write_text(html,encoding='utf-8',newline='\n')
txtpath.write_text(txt,encoding='utf-8',newline='\n')
files=['02_02_export.png','blogger-images/08_android.png','03_03_manage.png','04_04_account.png','05_05_wait.png']
for n,file in enumerate(files,1):
    url='/'+quote((pub/file).relative_to(root).as_posix())
    html=html.replace('{{BLOGGER_IMAGE_URL_IMG_%02d}}'%n,url)
css='''<meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:Arial,sans-serif;max-width:820px;margin:auto;padding:16px;line-height:1.7;overflow-wrap:anywhere;color:#182433} h2{margin-top:42px;padding:12px;background:#edf3ff;font-size:1.4em} h2 a{color:#173f80;text-decoration:none}.box{margin:24px 0;padding:18px;background:#eef4ff;border-radius:12px}.box:before{content:attr(data-title);font-weight:bold}.button-container{padding:12px;text-align:center}.button3{display:block;padding:12px;background:#304bdf;color:white;border-radius:8px}.faq-item{padding:16px;border:1px solid #dce5f4;border-radius:8px;margin:12px 0}.faq-answer{border-left:3px solid #3c40ff;padding:8px} img{max-width:100%;height:auto} .seo-image-caption{text-align:center;color:#475569}</style>'''
preview=root/'26_1113/_blogger_runs/20261113-content-1401/instagram-preview.html'
preview.write_text('<!doctype html><html lang="ko"><head><meta charset="utf-8">'+css+'</head><body>'+html+'</body></html>',encoding='utf-8')
print('serving',flush=True)
ThreadingHTTPServer(('127.0.0.1',8765),SimpleHTTPRequestHandler).serve_forever()
