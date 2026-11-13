import json, re, shutil, hashlib
from pathlib import Path
from datetime import datetime, timezone
from html.parser import HTMLParser

root=Path('Y:/antigravity-project/ego-light-adsense-info-blog')
run=root/'26_1113/_blogger_runs/20261113-blogger-1419'
jobs=[
 (1,30,'앱스토어 로그아웃',35,[('02_iphone.png','02_guide.png'),('04_mac.png','04_guide.png'),('05_family.png','blogger-images/05_family_marked.png')]),
 (2,31,'코레일 민원접수',37,[('01_search.png','01_search.png'),('02_voc.png','02_guide.png'),('05_auth_button.png','04_guide.png'),('03_station.png','03_guide.png'),('06_post.png','blogger-images/06_post_marked.png')]),
 (3,32,'테무 회원탈퇴',38,[('01_search.png','01_search.png'),('02_app.png','02_guide.png'),('03_web.png','03_guide.png'),('04_term.png','04_guide.png')])]
class Slots(HTMLParser):
 def __init__(self): super().__init__(); self.slots=[]; self.current=None; self.depth=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='div' and a.get('data-image-id'):
   self.current={'id':a['data-image-id'],'text':''}; self.slots.append(self.current); self.depth=1
  elif self.current:
   if tag=='div': self.depth+=1
   if tag=='img': self.current.update(src=a.get('src'),alt=a.get('alt'))
 def handle_endtag(self,tag):
  if self.current and tag=='div':
   self.depth-=1
   if not self.depth: self.current=None
 def handle_data(self,data):
  if self.current: self.current['text']+=data

for order,row,keyword,space,files in jobs:
 folder=root/f'26_1113/이슈_{keyword}/웹조사'; pub=folder/'publish'
 html=pub/f'이슈_{keyword}_html콘텐츠.html'; txt=pub/f'이슈_{keyword}_제목메타디스크립션.txt'
 t=txt.read_text(encoding='utf-8'); h=html.read_text(encoding='utf-8'); parser=Slots(); parser.feed(h)
 assert len(parser.slots)==len(files)
 backup=run/f'original-{order}'; backup.mkdir(exist_ok=True)
 shutil.copy2(html,backup/html.name); shutil.copy2(txt,backup/txt.name)
 images=[]
 for i,(raw,published) in enumerate(files,1):
  image_id=f'IMG_{i:02d}'; a=folder/'raw'/raw; b=pub/published
  assert a.is_file() and b.is_file() and a.stat().st_size and b.stat().st_size
  slot=parser.slots[i-1]; assert slot['id']==image_id and slot['src']==f'{{{{BLOGGER_IMAGE_URL_{image_id}}}}}'
  block=t.split(f'삽입 ID: {image_id}',1)[1].split('삽입 ID:',1)[0].split('[제외·보류 이미지]',1)[0]
  alt=re.search(r'권장 alt:\s*(.+)',block).group(1).strip(); caption=re.search(r'권장 캡션:\s*(.+)',block).group(1).strip()
  assert alt==slot['alt'] and caption in slot['text'], (keyword,image_id,alt,slot)
  for source,dest in [(a,backup/'raw'/raw),(b,backup/'publish'/published)]:
   dest.parent.mkdir(parents=True,exist_ok=True); shutil.copy2(source,dest)
  images.append({'id':image_id,'order':i,'original':str(a),'upload':str(b),'sha256':hashlib.sha256(b.read_bytes()).hexdigest(),'alt':alt,'caption':caption,'sourceAndEditEvidence':block.strip(),'status':'ready_original'})
 obj={'order':order,'row':row,'tab':'이슈','keyword':keyword,'spaceId':space,'blogId':'694192108971227039','preparedAt':datetime.now(timezone.utc).isoformat(),'originalImageCount':len(files),'images':images,'html':str(html),'txt':str(txt),'backup':str(backup),'duplicateEvidence':str(run/f'duplicate-settled-{order}.txt'),'duplicateFinding':'keyword search contained no corresponding title; no matching draft observed','visualEvidence':str(run/'images-contact.png'),'next':'wait for create-ok'}
 (run/f'ready-create-{order}.json').write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf-8')
 print(order,keyword,len(images),'ready')
