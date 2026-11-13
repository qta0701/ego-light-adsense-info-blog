from pathlib import Path
from PIL import Image, ImageDraw
root=Path(__file__).resolve().parents[2]
for keyword in ('신한은행 간편조회','신한은행 환전 방법','하나은행 환율조회'):
    files=sorted((root/'26_1113'/f'은행_재테크_{keyword}'/'웹조사'/'publish').glob('*.png'))
    canvas=Image.new('RGB',(1280,((len(files)+1)//2)*520),'white');draw=ImageDraw.Draw(canvas)
    for i,p in enumerate(files):
        im=Image.open(p).convert('RGB');im.thumbnail((630,480));x=i%2*640;y=i//2*520
        canvas.paste(im,(x,y+25));draw.text((x+5,y+5),p.name,fill='black')
    canvas.save(root/'26_1113'/'_research_runs'/f'publish-contact-{keyword}.jpg',quality=90)
