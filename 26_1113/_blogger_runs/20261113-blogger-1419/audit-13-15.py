from pathlib import Path
import hashlib, json, re, shutil
from datetime import datetime, timezone
from PIL import Image, ImageDraw

root = Path('Y:/antigravity-project/ego-light-adsense-info-blog')
run = root / '26_1113/_blogger_runs/20261113-blogger-1419'
jobs = {
 13: ('신한은행 간편조회', ['01_search.png','03_guide.png','02_guide.png','04_guide.png']),
 14: ('신한은행 환전 방법', ['02_guide.png','03_guide.png','05_guide.png','06_guide.png','04_guide.png']),
 15: ('하나은행 환율조회', ['01_search.png','02_guide.png','03_guide.png','04_guide.png']),
}
for order, (keyword, names) in jobs.items():
    folder = root / f'26_1113/은행_재테크_{keyword}/웹조사'
    pub = folder / 'publish'
    html = next(pub.glob('*_html콘텐츠.html'))
    txt = next(pub.glob('*_제목메타디스크립션.txt'))
    content = html.read_text(encoding='utf-8')
    text = txt.read_text(encoding='utf-8')
    mapping = json.loads((folder/'evidence/publish-map.json').read_text(encoding='utf-8'))
    by_name = {item['publish']: item for item in mapping}
    output = run / f'original-{order}'
    output.mkdir(exist_ok=True)
    for source in [html,txt,folder/'research.json',folder/'evidence/publish-map.json',folder/'evidence/review.json']:
        shutil.copy2(source, output/source.name)
    slots=[]
    for n,name in enumerate(names,1):
        slot=f'IMG_{n:02d}'
        item=by_name[name]
        raw=folder/'raw'/item['raw']; image=pub/name
        block=re.search(rf'<!--\s*IMAGE_SLOT:{slot} START\s*-->(.*?)<!--\s*IMAGE_SLOT:{slot} END\s*-->', content,re.S)
        assert block and content.count('{{BLOGGER_IMAGE_URL_'+slot+'}}') == 1
        txtblock=re.search(rf'삽입 ID: {slot}.*?(?=삽입 ID: IMG_|\[제외·보류 이미지\])',text,re.S)
        assert txtblock and name in txtblock.group()
        alt=re.search(r'alt="([^"]*)"',block.group()).group(1)
        caption_match=re.search(r'<figcaption[^>]*>(.*?)</figcaption>',block.group(),re.S) or re.search(r'<p class="seo-image-caption">(.*?)</p>',block.group(),re.S)
        caption=caption_match.group(1).strip()
        for path,key in [(raw,'rawSha256'),(image,'publishSha256')]:
            assert path.is_file() and hashlib.sha256(path.read_bytes()).hexdigest()==item[key], str(path)
        with Image.open(image) as im: im.verify()
        shutil.copy2(image,output/f'{slot}-{name}')
        shutil.copy2(raw,output/f'{slot}-raw-{raw.name}')
        slots.append({'id':slot,'raw':str(raw),'file':str(image),'alt':alt,'caption':caption,'source':item['actualUrl'],'sha256':item['publishSha256'],'txtBlock':txtblock.group().strip()})
    assert re.findall(r'IMAGE_SLOT:(IMG_\d+) START',content)==[x['id'] for x in slots]
    result={'order':order,'keyword':keyword,'checkedAt':datetime.now(timezone.utc).isoformat(),'adoptedCount':len(slots),'slots':slots,'html':str(html),'txt':str(txt),'duplicateSearchEvidence':f'duplicate-{order}.txt'}
    (run/f'image-audit-{order}.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    thumbs=[]
    for slot in slots:
        im=Image.open(slot['file']).convert('RGB'); im.thumbnail((640,490)); thumbs.append((slot['id'],im.copy()))
    sheet=Image.new('RGB',(1280,((len(thumbs)+1)//2)*530),'white'); draw=ImageDraw.Draw(sheet)
    for i,(label,im) in enumerate(thumbs):
        x=(i%2)*640; y=(i//2)*530; draw.text((x+8,y+5),label,fill='black'); sheet.paste(im,(x,y+25))
    sheet.save(run/f'contact-{order}.jpg',quality=90)
    print(order, len(slots), [(s['id'],Path(s['file']).name) for s in slots])
