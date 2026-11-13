from pathlib import Path
from html.parser import HTMLParser
from PIL import Image
import re

base=Path('26_1113/노하우_코레일 승차권 조회/웹조사/publish')
h=base/'노하우_코레일 승차권 조회_html콘텐츠.html'; t=base/'노하우_코레일 승차권 조회_제목메타디스크립션.txt'
body=h.read_text(encoding='utf-8'); txt=t.read_text(encoding='utf-8')
class Check(HTMLParser):
 def __init__(self): super().__init__(); self.ids=[]; self.images=[]; self.h2=0; self.h2open=False; self.h2linked=0; self.bad=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a: self.ids.append(a['id'])
  if tag in ['html','head','body','h1','title','meta']: self.bad.append(tag)
  if tag=='h2': self.h2+=1; self.h2open=True
  if tag=='a' and self.h2open and a.get('href','').startswith('https://'): self.h2linked+=1
  if a.get('target'): self.bad.append('target')
  if tag=='img': self.images.append(a)
 def handle_endtag(self,tag):
  if tag=='h2': self.h2open=False
p=Check();p.feed(body)
assert not p.bad and len(p.ids)==len(set(p.ids)) and p.h2==p.h2linked==4
files=['01_01_search.png','blogger-images/08_main_entry_marked.png','02_02_login.png','03_06_method_clean.png','04_07_form_clean.png']
assert len(p.images)==len(files)==5
for n,(img,f) in enumerate(zip(p.images,files),1):
 ident=f'IMG_{n:02}'
 assert img['src']=='{{BLOGGER_IMAGE_URL_'+ident+'}}' and img['alt'] in txt
 assert body.count('IMAGE_SLOT:'+ident+' START')==body.count('IMAGE_SLOT:'+ident+' END')==1
 assert txt.count('삽입 ID: '+ident)==1
 assert Image.open(base/f).size==(int(img['width']),int(img['height']))
assert '**' not in body
for section in re.findall(r'<div id="img-\d+".*?</div>\s*<!-- IMAGE_SLOT:IMG_\d+ END -->',body,re.S):
 caption=re.search(r'<p class="seo-image-caption"[^>]*>(.*?)</p>',section).group(1)
 assert caption in txt
for m in re.finditer(r'<p id="([^"]+)" class="seo-text">([^<]+)</p>\s*<!-- IMAGE_SLOT:IMG_(\d+) START -->',body):
 assert 'id='+m.group(1)+' / '+m.group(2) in txt
for m in re.finditer(r'<!-- IMAGE_SLOT:IMG_(\d+) END -->\s*<p id="([^"]+)" class="seo-text">([^<]+)</p>',body):
 assert 'id='+m.group(2)+' / '+m.group(3) in txt
txt=txt.replace('파일·UTF-8·사실·순서·이미지·ID·토큰·alt·캡션: 검수 후 기록 예정.','파일·UTF-8·공식 출처·H2 링크·이미지 순서·5개 슬롯과 TXT의 ID/토큰/크기/alt/캡션·앞뒤 문단을 대조 완료.')
txt=txt.replace('모바일/PC 미리보기: 검수 후 기록 예정. 실제 Blogger 테마 미리보기 미실행.','모바일/PC 미리보기: 로컬 대체 스타일로 390px / 1200px 검수. 이미지 5개 로딩·비율 유지·문서 가로 넘침 없음. PC 화면 캡처의 작은 글씨는 모바일에서 작아 본문에 핵심을 병기함. 실제 Blogger 테마 미리보기 미실행.')
t.write_text(txt,encoding='utf-8')
print(f'OK: {len(body.splitlines())} lines, {p.h2} H2, {len(files)} images, {len(p.ids)} unique IDs; UTF-8, dimensions, slots, captions and anchors matched')
