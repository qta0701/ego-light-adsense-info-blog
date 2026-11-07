import json
from pathlib import Path
from PIL import Image, ImageDraw

root=Path(__file__).resolve().parents[3]/'26_1107'
for keyword in ['11월 넷플릭스 한국영화 순위','11월 넷플릭스 오리지널 순위','넷플릭스 성인인증 방법']:
    folder=root/('앱사용_'+keyword)/'웹조사'
    research=folder/'research.json'; data=json.loads(research.read_text(encoding='utf-8'))
    age=keyword=='넷플릭스 성인인증 방법'
    search=data['images'][0]
    path=folder/search['file']
    with Image.open(path) as im:
        im=im.convert('RGB'); draw=ImageDraw.Draw(im)
        draw.rectangle((1010,0,1070,90),fill='white')
        bands=[(135,412,495,427),(135,613,495,628),(135,813,495,828)] if age else [(135,225,475,242),(135,425,475,442),(135,625,475,642),(135,825,475,842)]
        for rect in bands: draw.rectangle(rect,fill='white')
        im.save(path)
    search['boxes']=[[80,365,480,110]] if age else [[80,180,420 if '한국영화' in keyword else 450,110]]
    if age:
        masks={'guide-entry':[(390,278,556,299),(487,342,654,363)],'guide-renew':[(390,160,556,181),(487,224,654,245)],'guide-details':[(488,0,660,18)]}
        for img in data['images']:
            stem=Path(img['file']).stem
            if stem in masks:
                source=folder/img['file']; dest=source.with_name('privacy-'+source.name)
                if dest.exists(): raise RuntimeError('Privacy output already exists')
                with Image.open(source) as im:
                    im=im.convert('RGB'); draw=ImageDraw.Draw(im)
                    for rect in masks[stem]:draw.rectangle(rect,fill='white')
                    im.save(dest)
                data['body']=data['body'].replace(f'| {source.name} (원본 {source.name})',f'| {dest.name} (원본 {source.name})')
                img['file']='raw/'+dest.name
            if stem=='guide-entry':img['boxes']=[[3,250,870,90]]
            elif stem=='guide-renew':img['boxes']=[[3,260,870,65]]
            elif stem=='guide-details':img['boxes']=[[20,250,850,105]]
            elif stem=='guide-error':img['boxes']=[[160,263,270,55]]
            elif stem=='privacy-guide-form':img['boxes']=[[60,83,760,85]]
    data['body']=data['body'].replace('프로필 그림이 보이는 화면은 발행용 사본에서 해당 영역을 가렸습니다.','프로필 그림과 화면의 URL 표기는 발행용 사본에서 가렸습니다.')
    research.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(keyword, len(list((folder/'raw').glob('*.png'))),'raw files')
