from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import re
from PIL import Image
base=Path('26_1113/이슈_코레일 민원접수/웹조사/publish')
html=(base/'이슈_코레일 민원접수_html콘텐츠.html').read_text(encoding='utf-8')
txt=(base/'이슈_코레일 민원접수_제목메타디스크립션.txt').read_text(encoding='utf-8')
class P(HTMLParser):
 def __init__(self): super().__init__(); self.ids=[]; self.img=[]; self.tags=[]
 def handle_starttag(self, tag, attrs):
  a=dict(attrs); self.tags.append(tag)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='img': self.img.append(a)
p=P(); p.feed(html)
assert not [x for x,n in Counter(p.ids).items() if n>1]
assert not set(p.tags)&{'html','head','body','h1','title','meta'}
assert len(p.img)==5
for i,(a,f) in enumerate(zip(p.img,['01_search.png','02_guide.png','04_guide.png','03_guide.png','blogger-images/06_post_marked.png']),1):
 token='{{BLOGGER_IMAGE_URL_IMG_%02d}}'%i
 assert a['src']==token and html.count(token)==1 and token in txt
 assert a['alt'] and a['alt'] in txt
 assert f in txt
 with Image.open(base/f) as im: assert im.size==(int(a['width']),int(a['height']))
print('PASS: unique IDs; 5 image tokens, files, dimensions, alt and TXT mappings; no forbidden tags')
print('HTML lines:',len(html.splitlines()),'H2:',p.tags.count('h2'),'TXT lines:',len(txt.splitlines()))
