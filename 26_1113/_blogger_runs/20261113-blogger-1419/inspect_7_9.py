import json, re, shutil
from pathlib import Path
from datetime import datetime
from PIL import Image, ImageOps, ImageDraw

root = Path('Y:/antigravity-project/ego-light-adsense-info-blog')
run = root / '26_1113/_blogger_runs/20261113-blogger-1419'
jobs = [(7,34,'진학어플라이 회원가입',34),(8,35,'인스타그램 탈퇴방법',36),(9,36,'배민클럽 환불',39)]
for order, row, keyword, space in jobs:
    folder = root / f'26_1113/노하우2_{keyword}/웹조사'
    pub = folder / 'publish'
    htmlfile = next(pub.glob('*_html콘텐츠.html'))
    txtfile = next(pub.glob('*_제목메타디스크립션.txt'))
    html = htmlfile.read_text(encoding='utf-8')
    txt = txtfile.read_text(encoding='utf-8')
    count = int(re.search(r'채택 이미지\s*(\d+)개',txt).group(1))
    parts = re.split(r'삽입 ID:\s*(IMG_\d+)',txt)[1:]
    slots=[]
    for ident, part in zip(parts[::2], parts[1::2]):
        part = part.split('[제외·보류 이미지]')[0]
        path = re.search(r'업로드 파일 경로:\s*(.+)',part).group(1).strip()
        file = root / path
        image = Image.open(file); image.verify()
        token = '{{BLOGGER_IMAGE_URL_'+ident+'}}'
        assert html.count(token)==1 and html.count('data-image-id="'+ident+'"')==1, ident
        slots.append({'id':ident,'path':path,'bytes':file.stat().st_size,'tokenCount':html.count(token), 'details':part.strip()})
    assert len(slots)==count
    destination=run / f'original-{order}'
    destination.mkdir(exist_ok=True)
    for f in [htmlfile,txtfile,*[root/s['path'] for s in slots]]:
        shutil.copy2(f,destination/f.name)
    thumbs=[]
    for slot in slots:
        im=Image.open(root/slot['path']).convert('RGB')
        im.thumbnail((480,400))
        canvas=Image.new('RGB',(500,430),'white'); canvas.paste(im,((500-im.width)//2,25)); ImageDraw.Draw(canvas).text((10,5),slot['id'],fill='black'); thumbs.append(canvas)
    sheet=Image.new('RGB',(1000,430*((len(thumbs)+1)//2)),'white')
    for i,im in enumerate(thumbs): sheet.paste(im,((i%2)*500,(i//2)*430))
    sheet.save(run/f'contact-{order}.jpg',quality=85)
    result={'order':order,'row':row,'keyword':keyword,'spaceId':space,'blogId':'3087664879020853782','at':datetime.now().astimezone().isoformat(),'originalCount':count,'slots':slots,'localStateExists':(folder/'evidence/blogger-state.json').exists(),'html':str(htmlfile),'txt':str(txtfile)}
    (run/f'inspection-{order}.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'order':order,'count':count,'slots':[(s['id'],s['path'],s['bytes']) for s in slots],'localStateExists':result['localStateExists']},ensure_ascii=False))
