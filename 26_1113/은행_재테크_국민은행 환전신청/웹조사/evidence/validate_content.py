from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import re
from PIL import Image

p=Path(__file__).resolve().parent.parent/'publish'
base='은행_재테크_국민은행 환전신청'
h=(p/(base+'_html콘텐츠.html')).read_text(encoding='utf-8')
t=(p/(base+'_제목메타디스크립션.txt')).read_text(encoding='utf-8')
class Parser(HTMLParser):
 def __init__(self): super().__init__(); self.ids=[]; self.h2=0; self.h2links=0; self.inh2=False; self.images=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a: self.ids.append(a['id'])
  if tag=='h2': self.h2+=1; self.inh2=True
  if tag=='a' and self.inh2 and a.get('href'): self.h2links+=1
  if tag=='img': self.images.append(a)
 def handle_endtag(self,tag):
  if tag=='h2': self.inh2=False
x=Parser(); x.feed(h)
assert x.h2==x.h2links==5 and len(x.images)==6
assert all(v==1 for v in Counter(x.ids).values())
for i,fn in enumerate(['02_guide.png','05_guide.png','03_guide.png','04_guide.png','06_guide.png','07_guide.png'],1):
 n=f'{i:02}'; img=x.images[i-1]
 assert img['src']=='{{BLOGGER_IMAGE_URL_IMG_'+n+'}}' and img['alt'] in t
 assert h.count('IMAGE_SLOT:IMG_'+n+' START')==h.count('IMAGE_SLOT:IMG_'+n+' END')==1
 assert t.count('삽입 ID: IMG_'+n)==1 and fn in t
 assert f'p-{n}-before' in x.ids and f'p-{n}-after' in x.ids
 print(n,fn,Image.open(p/fn).size)
assert not re.search(r'<(?:html|head|body|h1|title|meta)\b',h,re.I)
assert 'target="_blank"' not in h
print('PASS UTF-8, unique IDs, linked H2, image tokens, captions, paths. HTML lines:',len(h.splitlines()),'TXT lines:',len(t.splitlines()))
