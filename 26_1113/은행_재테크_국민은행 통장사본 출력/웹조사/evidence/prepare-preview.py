from pathlib import Path
from html.parser import HTMLParser
import re

root = Path('26_1113/은행_재테크_국민은행 통장사본 출력/웹조사')
name='은행_재테크_국민은행 통장사본 출력'
pub=root/'publish'
html=(pub/f'{name}_html콘텐츠.html').read_text(encoding='utf-8')
txt=(pub/f'{name}_제목메타디스크립션.txt').read_text(encoding='utf-8')
class Audit(HTMLParser):
    def __init__(self): super().__init__(); self.ids=[]; self.h2=0; self.images=[]; self.forbidden=[]; self.links=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='h2':self.h2+=1
        if tag in ('html','head','body','h1','title','meta'):self.forbidden.append(tag)
        if tag=='img':self.images.append(a)
        if tag=='a':self.links.append(a)
a=Audit();a.feed(html)
assert len(a.ids)==len(set(a.ids)), 'duplicate IDs'
assert not a.forbidden
assert len(a.images)==3 and a.h2==5
assert html.count('<h2 id=')==html.count('<h2 id="')==html.count('<h2 id="')
for i,im in enumerate(a.images,1):
    token='{{BLOGGER_IMAGE_URL_IMG_%02d}}'%i
    assert im['src']==token and html.count(token)==1 and txt.count(token)==1
    assert im['alt'] in txt
for x in re.findall(r'href="#([^"]+)"',html): assert x in a.ids,x
assert not any('target' in link for link in a.links)
for i,file in enumerate(['02_guide_detail.png','03_guide_detail.png','04_guide_detail.png'],1):
    p=(pub/'blogger-images'/file).resolve()
    assert p.exists()
    html=html.replace('{{BLOGGER_IMAGE_URL_IMG_%02d}}'%i,p.as_uri())
css='''body{font-family:Arial,"Malgun Gothic",sans-serif;margin:0;color:#222;line-height:1.75;font-size:17px}.post-body{max-width:760px;margin:auto;padding:18px;box-sizing:border-box}h2{font-size:1.4rem;border-left:5px solid #3c40ff;padding-left:12px}a{color:#1b1bf8}h2 a{color:#111;text-decoration:none}.box{background:#f0f3ff;border-radius:10px;padding:14px 20px;margin:22px 0}.box:before{content:attr(data-title);font-weight:bold}.button3{display:block;background:#3c40ff;border-radius:8px;text-align:center;padding:12px;text-decoration:none}.table-responsive{overflow-x:auto}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:8px}.seo-image-caption{text-align:center;color:#555}.seo-image-container{max-width:100%}'''
preview='<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+css+'</style></head><body><main class="post-body">'+html+'</main></body></html>'
(root/'evidence'/'content-preview.html').write_text(preview,encoding='utf-8')
print('audit passed: 5 H2, 3 images, unique IDs and tokens, local references, alt, no target/forbidden tags')
