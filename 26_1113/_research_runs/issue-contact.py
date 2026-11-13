from pathlib import Path
from PIL import Image, ImageDraw
root=Path(__file__).resolve().parents[2]
for name in ['앱스토어 로그아웃','코레일 민원접수','테무 회원탈퇴']:
    files=sorted((root/'26_1113'/('이슈_'+name)/'웹조사'/'raw').glob('*.png'))
    sheet=Image.new('RGB',(1000, len(files)*380),'white'); d=ImageDraw.Draw(sheet)
    for i,f in enumerate(files):
        im=Image.open(f); im.thumbnail((990,345)); sheet.paste(im,(0,i*380+25)); d.text((0,i*380),f.name,fill='black')
    sheet.save(root/'26_1113'/'_research_runs'/('contact-'+str(len(files))+'-'+name+'.jpg'))
