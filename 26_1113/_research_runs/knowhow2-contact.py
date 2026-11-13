from pathlib import Path
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[2]/'26_1113'
for key in ['진학어플라이 회원가입','인스타그램 탈퇴방법','배민클럽 환불']:
 files=sorted((root/f'노하우2_{key}'/'웹조사'/'publish').glob('*.png'))
 ims=[]
 for f in files:
  im=Image.open(f).convert('RGB');im.thumbnail((640,600));ims.append(im)
 sheet=Image.new('RGB',(1280,((len(ims)+1)//2)*620),'#cccccc')
 for i,im in enumerate(ims):sheet.paste(im,((i%2)*640,(i//2)*620))
 sheet.save(root/'_research_runs'/f'knowhow2-contact-{key}.jpg',quality=90)
