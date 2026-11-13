from pathlib import Path
import re
p=Path(__file__).parent/'웹조사'/'publish'
h=next(p.glob('*_html콘텐츠.html'))
t=next(p.glob('*_제목메타디스크립션.txt'))
s=h.read_text(encoding='utf-8')
print('HTML lines:',len(s.splitlines()),'H2:',len(re.findall(r'<h2\b',s)))
print('Slots:',re.findall(r'data-image-id="(.*?)"',s),'tokens:',len(re.findall(r'\{\{BLOGGER_IMAGE_URL_',s)))
print('TXT lines:',len(t.read_text(encoding='utf-8').splitlines()))
for i,n in enumerate(['01_search.png','03_guide.png','02_guide.png','04_guide.png'],1):
 s=s.replace('{{BLOGGER_IMAGE_URL_IMG_%02d}}'%i,(p/n).resolve().as_uri())
style='''<meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:Arial,sans-serif;max-width:900px;margin:auto;padding:16px;font-size:18px;line-height:1.8;overflow-wrap:anywhere}*{box-sizing:border-box}h2{font-size:24px;border-bottom:3px solid #3c40ff}.box,.faq-item{background:#F0F3FF;padding:18px;margin:20px 0;border-radius:8px}.button{display:block;background:#3c40ff;padding:16px;text-align:center;border-radius:8px}img{max-width:100%;height:auto}</style>'''
(p/'_local_preview.html').write_text(style+s,encoding='utf-8')
