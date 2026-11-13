from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import re
base=Path('26_1113/노하우2_배민클럽 환불/웹조사/publish')
h=base/'노하우2_배민클럽 환불_html콘텐츠.html'
t=base/'노하우2_배민클럽 환불_제목메타디스크립션.txt'
text=h.read_text(encoding='utf-8'); meta=t.read_text(encoding='utf-8')
class Check(HTMLParser):
 def __init__(self): super().__init__(); self.ids=[]; self.imgs=[]; self.href=[]; self.headings=0; self.h2=False; self.h2links=0; self.bad=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a: self.ids.append(a['id'])
  if tag in ('html','head','body','h1','title','meta'): self.bad.append(tag)
  if tag=='h2': self.headings+=1; self.h2=True
  if tag=='a':
   self.href.append(a.get('href',''))
   if self.h2: self.h2links+=1
  if tag=='img': self.imgs.append(a)
 def handle_endtag(self,tag):
  if tag=='h2': self.h2=False
p=Check();p.feed(text)
assert not p.bad and len(p.ids)==len(set(p.ids))
assert p.headings==p.h2links==5
assert all(not x.startswith('#') or x[1:] in p.ids for x in p.href)
assert len(p.imgs)==4
for i,im in enumerate(p.imgs,1):
 token='{{BLOGGER_IMAGE_URL_IMG_%02d}}'%i
 assert im['src']==token and text.count(token)==1 and meta.count(token)==1 and im['alt']
 assert text.count('IMAGE_SLOT:IMG_%02d'%i)==2
 assert f'삽입 ID: IMG_{i:02d}' in meta
assert all((base/x).is_file() for x in ['03_01_refund.png','02_06_entry.png','blogger-images/02_cancel_detail.png','04_03_long.png'])
old='모바일/PC 로컬 미리보기: 확인 예정. 실제 Blogger 테마 미리보기는 미수행.'
new='모바일/PC 로컬 미리보기: 390px 및 약 1365px에서 이미지 4개 로드·비율·가로 넘침 없음 확인. 모바일 캡처의 작은 글씨는 본문으로 보완. 임시 CSS를 사용했으며 실제 Blogger 테마 미리보기는 미수행.'
assert old in meta
t.write_text(meta.replace(old,new),encoding='utf-8')
print('HTML lines:',len(text.splitlines()),'H2:',p.headings,'images:',len(p.imgs),'unique IDs:',len(p.ids))
print('TXT lines:',len(t.read_text(encoding='utf-8').splitlines()))
print('HTML tags, local links, image slots, tokens, files: PASS')
