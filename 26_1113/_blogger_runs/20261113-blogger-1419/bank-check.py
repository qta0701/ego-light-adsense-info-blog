import json, re, hashlib, shutil
from pathlib import Path
from html.parser import HTMLParser
from datetime import datetime, timezone
from PIL import Image

root=Path('Y:/antigravity-project/ego-light-adsense-info-blog')
run=root/'26_1113/_blogger_runs/20261113-blogger-1419'
for order,keyword in [(10,'부산은행 환전'),(11,'국민은행 환전신청'),(12,'국민은행 통장사본 출력')]:
    folder=root/f'26_1113/은행_재테크_{keyword}/웹조사'
    pub=folder/'publish'; txt=next(pub.glob('*_제목메타디스크립션.txt')); html=next(pub.glob('*_html콘텐츠.html'))
    t=txt.read_text(encoding='utf-8'); h=html.read_text(encoding='utf-8')
    section=t.split('[Blogger 이미지 업로드 추천 순서와 삽입 위치]')[1].split('[제외·보류 이미지]')[0]
    blocks=re.split(r'삽입 ID:\s*(IMG_\d+)',section)[1:]; slots=[]
    backup=run/f'original-{order}'; backup.mkdir(exist_ok=True)
    for f in [txt,html]: shutil.copy2(f,backup/f.name)
    for id,block in zip(blocks[::2],blocks[1::2]):
        path=re.search(r'업로드 파일(?: 경로)?:\s*(.+)',block).group(1).strip()
        f=root/path
        token='{{BLOGGER_IMAGE_URL_'+id+'}}'
        with Image.open(f) as im: dimensions=im.size; im.verify()
        shutil.copy2(f,backup/f'{id}-{f.name}')
        slots.append({'id':id,'path':path,'size':dimensions,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'tokenCount':h.count(token),'block':block.strip()})
    ids=re.findall(r'data-image-id="(IMG_\d+)"',h)
    result={'order':order,'keyword':keyword,'checkedAt':datetime.now(timezone.utc).isoformat(),'html':str(html.relative_to(root)),'txt':str(txt.relative_to(root)),'count':len(slots),'htmlIds':ids,'slots':slots,'matching':ids==[s['id'] for s in slots] and all(s['tokenCount']==1 for s in slots)}
    (run/f'images-{order}.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    print(order, 'count',len(slots),'HTML',ids,'matching',result['matching'],[(s['id'],s['path'],s['size']) for s in slots])
