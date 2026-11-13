from pathlib import Path
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[2]
for k in ['앱스토어 로그아웃','코레일 민원접수','테무 회원탈퇴']:
 fs=sorted((root/'26_1113'/('이슈_'+k)/'웹조사'/'publish').glob('*.png')); images=[Image.open(f).convert('RGB') for f in fs]
 width=max(im.width for im in images); height=sum(im.height+32 for im in images); canvas=Image.new('RGB',(width,height),'#ddd');d=ImageDraw.Draw(canvas); y=0
 for f,im in zip(fs,images): d.text((5,y+5),f.name,fill='black');y+=32;canvas.paste(im,(0,y));y+=im.height
 canvas.save(root/'26_1113'/'_research_runs'/('publish-'+k+'.png'))
