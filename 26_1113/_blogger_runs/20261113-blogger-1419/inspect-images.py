from PIL import Image, ImageDraw
from pathlib import Path
root=Path('26_1113')
sets=[('app',['02_guide.png','04_guide.png','blogger-images/05_family_marked.png'],'이슈_앱스토어 로그아웃'),('rail',['01_search.png','02_guide.png','04_guide.png','03_guide.png','blogger-images/06_post_marked.png'],'이슈_코레일 민원접수'),('temu',['01_search.png','02_guide.png','03_guide.png','04_guide.png'],'이슈_테무 회원탈퇴')]
out=Image.new('RGB',(1100,3000),'white')
d=ImageDraw.Draw(out)
y=0
for tag,files,folder in sets:
    for i,f in enumerate(files):
        im=Image.open(root/folder/'웹조사'/'publish'/f).convert('RGB')
        im.thumbnail((1000,200))
        d.text((0,y),tag+str(i+1)+' '+f,fill='black')
        y+=20
        out.paste(im,(0,y))
        y+=im.height+15
out.crop((0,0,1100,y)).save(root/'_blogger_runs'/'20261113-blogger-1419'/'images-contact.png')
