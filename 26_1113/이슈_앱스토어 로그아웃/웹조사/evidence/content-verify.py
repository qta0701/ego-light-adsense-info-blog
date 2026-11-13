from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
from PIL import Image
import re

base=Path('26_1113/이슈_앱스토어 로그아웃/웹조사')
pub=base/'publish'
hp=pub/'이슈_앱스토어 로그아웃_html콘텐츠.html'
tp=pub/'이슈_앱스토어 로그아웃_제목메타디스크립션.txt'
html=hp.read_text(encoding='utf-8')
txt=tp.read_text(encoding='utf-8')
txt=txt.replace('PREVIEW_STATUS','로컬 대체 스타일 미리보기에서 390px·1280px 확인. 이미지 3장 로드·비율 유지, 페이지 가로 넘침 없음. 모바일에서 문서 발췌 글씨는 작아 본문 텍스트로 보완. 실제 Blogger 테마 미리보기는 미실행.')
tp.write_text(txt,encoding='utf-8')
class Check(HTMLParser):
 def __init__(self): super().__init__(); self.ids=[]; self.img=[]; self.h2=0; self.inh=False; self.h2links=0; self.bad=[]
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if 'id' in d: self.ids.append(d['id'])
  if tag in ['html','head','body','h1','title','meta']: self.bad.append(tag)
  if tag=='h2': self.h2+=1; self.inh=True
  if tag=='a' and self.inh and d.get('href','').startswith('https://'): self.h2links+=1
  if tag=='a' and d.get('target'): self.bad.append('target')
  if tag=='img': self.img.append(d)
 def handle_endtag(self,tag):
  if tag=='h2': self.inh=False
c=Check();c.feed(html)
assert len(c.ids)==len(set(c.ids)) and not c.bad and c.h2==c.h2links==4
for i,(d,path) in enumerate(zip(c.img,['02_guide.png','04_guide.png','blogger-images/05_family_marked.png']),1):
 assert d['src']=='{{BLOGGER_IMAGE_URL_IMG_%02d}}'%i
 assert d['alt'] in txt and f'삽입 ID: IMG_{i:02d}' in txt
 assert Image.open(pub/path).size==(int(d['width']),int(d['height']))
 assert html.count(f'IMAGE_SLOT:IMG_{i:02d}')==2
assert len(c.img)==3 and 'PREVIEW_STATUS' not in txt
print('verified: lines',len(html.splitlines()),'H2',c.h2,'images',len(c.img),'unique IDs',len(c.ids),'UTF-8, dimensions, tokens, alt, H2 links OK')
