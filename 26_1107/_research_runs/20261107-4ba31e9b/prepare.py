import json
from pathlib import Path
from PIL import Image, ImageDraw

run=Path(__file__).resolve().parent
root=run.parents[2]
day='2026-11-07'
for row,keyword in [(53,'넷플릭스 한국 인기 영화 순위 확인 방법'),(54,'넷플릭스 오리지널 역대 영화 순위')]:
    folder=root/'26_1107'/('앱사용_'+keyword)/'웹조사'
    path=folder/'research.json'; d=json.loads(path.read_text(encoding='utf-8'))
    if d['body'] or d['images'] or d['sources']:raise RuntimeError('Existing research; stop')
    if row==53:
        previous=root/'26_1107/앱사용_11월 넷플릭스 한국영화 순위/웹조사/research.json'
        prev=json.loads(previous.read_text(encoding='utf-8'))
        body=prev['body'].split('## 이미지 원본과 배치 기록')[0].strip()
        body=body.replace('11월에 넷플릭스에서 인기 있는 한국 영화를 찾을 때는 먼저','넷플릭스에서 한국 인기 영화 순위를 찾을 때는 먼저').replace('원하는 11월 주간에 해당하는지','원하는 주간에 해당하는지').replace('## 11월 자료를 나중에 다시 확인하려면','## 주간 자료를 나중에 다시 확인하려면')
        d['sources']=prev['sources']
        d['sources'][0]['relatedUrls']=[{'title':'Top 10 글로벌 및 집계 방법','url':'https://www.netflix.com/tudum/top10'},{'title':'한국 영화 장르','url':'https://www.netflix.com/kr/browse/genre/5685'}]
        items=[('search-official','search','공식 Netflix 한국 영화 Top 10 검색 결과를 선택합니다.','S1'),('guide-filters','guide','1단계. South Korea와 Movies 분류를 확인합니다.','S1'),('guide-category','guide','2단계. 영화와 시리즈 중 Movies를 선택합니다.','S1'),('guide-period','guide','3단계. 주간 집계 날짜를 확인합니다.','S1'),('guide-table','guide','4단계. 순위와 Top 10에 오른 주 수를 확인합니다.','S1')]
    else:
        body=(run/'body54.md').read_text(encoding='utf-8').strip()
        d['sources']=[{'id':'S1','title':'Netflix 글로벌 역대 영어 영화 Top 10 및 집계 방법','url':'https://www.netflix.com/tudum/top10/most-popular','official':True,'checkedAt':day},{'id':'S2','title':'Netflix 글로벌 역대 비영어 영화 Top 10','url':'https://www.netflix.com/tudum/top10/most-popular/films-non-english','official':True,'checkedAt':day}]
        items=[('search-official','search','Netflix 공식 역대 영화 Top 10 검색 결과를 선택합니다.','S1'),('guide-filters','guide','1단계. Global과 Movies | English를 확인합니다.','S1'),('guide-category','guide','2단계. 영어와 비영어 영화 분류를 확인합니다.','S1'),('guide-period','guide','3단계. All Time 기준을 확인합니다.','S1'),('guide-table','guide','4단계. 영어 영화의 역대 순위와 조회 수를 확인합니다.','S1'),('guide-nonenglish-table','guide','5단계. 비영어 영화의 별도 역대 순위를 확인합니다.','S2')]
    image_rows=[]
    for index,(name,role,caption,sid) in enumerate(items,1):
        meta=json.loads((folder/'evidence'/f'{name}.json').read_text(encoding='utf-8'))
        original=folder/'raw'/f'{name}.png'; chosen=original
        # Non-English table has no visible profile or URL and needs no duplicate.
        if name!='guide-nonenglish-table':
            chosen=folder/'raw'/f'privacy-{name}.png'
            if chosen.exists():raise RuntimeError('Existing privacy copy')
            with Image.open(original) as im:
                im=im.convert('RGB'); draw=ImageDraw.Draw(im)
                if role=='search':
                    draw.rectangle((1010,0,1070,90),fill='white')
                    for y in (210,410,610,810): draw.rectangle((130,y,500,y+22),fill='white')
                else:draw.rectangle((32,0,95,65),fill='#242424')
                im.save(chosen)
        boxes=meta['boxes']
        if role=='search':boxes=[[80,365,600 if row==54 else 420,110]]
        img={'role':role,'file':'raw/'+chosen.name,'sourceId':sid,'caption':caption,'alt':caption,'boxes':boxes}
        if role=='search':img['query']=d['queries'][0]
        d['images'].append(img)
        image_rows.append(f'| {index:02d} | {chosen.name} (원본 {original.name}) | {caption} | [화면 출처]({meta["url"]}) |')
    if row==54:
        meta=json.loads((folder/'evidence/guide-nonenglish-filter.json').read_text(encoding='utf-8'))
        image_rows.append(f'| 미배치 | guide-nonenglish-filter.png | 비영어 분류로 전환한 원본 화면 | [화면 출처]({meta["url"]}) |')
    d['sources'][0].setdefault('relatedUrls',[]).append({'title':'공식 결과를 찾은 Google 검색','url':json.loads((folder/'evidence/search-official.json').read_text(encoding='utf-8'))['url']})
    d['body']=body+'\n\n## 이미지 원본과 배치 기록\n\n| 순서 | 파일명 | 설명 | 실제 화면 출처 |\n|---:|---|---|---|\n'+'\n'.join(image_rows)+'\n\n발행용 사본에서 표시된 URL과 프로필 그림을 가렸으며, 원본과 좌표는 raw와 evidence에 보존합니다.'
    d['visualReviewed']=False
    path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    state=folder/'evidence/browser.json'; s=json.loads(state.read_text(encoding='utf-8'));s['status']='search_ready';state.write_text(json.dumps(s,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(row,'본문',len(body),'전체',len(d['body']),'이미지',len(d['images']),'raw',len(list((folder/'raw').glob('*.png'))))
