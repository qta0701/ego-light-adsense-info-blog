import json
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[3]
run = Path(__file__).resolve().parent
date = '2026-11-07'
jobs = [
    {'row':53, 'keyword':'11월 넷플릭스 한국영화 순위', 'query':'site:netflix.com/tudum/top10 south korea films netflix top 10', 'search_url':'https://www.google.com/search?q=site%3Anetflix.com%2Ftudum%2Ftop10%20south%20korea%20films%20netflix%20top%2010', 'page':'https://www.netflix.com/tudum/top10/south-korea', 'extra':'add-53.md'},
    {'row':54, 'keyword':'11월 넷플릭스 오리지널 순위', 'query':'site:netflix.com/tudum/top10 netflix top 10 weekly', 'search_url':'https://www.google.com/search?q=site%3Anetflix.com%2Ftudum%2Ftop10%20netflix%20top%2010%20weekly', 'page':'https://www.netflix.com/tudum/top10', 'extra':'add-54.md'},
    {'row':55, 'keyword':'넷플릭스 성인인증 방법', 'query':'넷플릭스 성인인증 방법', 'search_url':'https://www.google.com/search?q=%EB%84%B7%ED%94%8C%EB%A6%AD%EC%8A%A4%20%EC%84%B1%EC%9D%B8%EC%9D%B8%EC%A6%9D%20%EB%B0%A9%EB%B2%95', 'page':'https://help.netflix.com/ko/node/41299', 'extra':'add-55.md'},
]
for job in jobs:
    folder = root / '26_1107' / ('앱사용_' + job['keyword']) / '웹조사'
    research_file = folder / 'research.json'
    data = json.loads(research_file.read_text(encoding='utf-8'))
    if data['images']:
        raise RuntimeError('Existing image plan; stop rather than overwrite')
    draft = folder / 'publish' / ('앱사용_' + job['keyword'] + '_웹조사결과.md')
    backup = folder / 'evidence' / 'initial-draft.md'
    if not backup.exists(): backup.write_bytes(draft.read_bytes())
    base = data['body']
    extra = (run / job['extra']).read_text(encoding='utf-8').strip()
    if job['row'] == 54:
        data['sources'].append({'id':'S2','title':'KPop Demon Hunters 오리지널 영화 소개','url':'https://www.netflix.com/tudum/articles/kpop-demon-hunters-most-popular-netflix-film','official':True,'checkedAt':date})
    related = data['sources'][0].setdefault('relatedUrls', [])
    if job['row']==53:
        related.extend([{'title':'글로벌 Top 10과 집계 방법','url':'https://www.netflix.com/tudum/top10'}, {'title':'한국 영화 장르 페이지','url':'https://www.netflix.com/kr/browse/genre/5685'}])
    elif job['row']==55:
        related.append({'title':'성인 인증 진입 화면','url':'https://www.netflix.com/verifyage'})
    related.append({'title':'공식 결과를 찾은 Google 검색','url':job['search_url']})
    data['queries'] = [job['query']]
    if job['row'] != 55:
        items=[('search-official','search','공식 Netflix Top 10 검색 결과를 선택합니다.'),('guide-filters','guide','1단계. 지역과 영화 분류를 확인합니다.'),('guide-category','guide','2단계. 영화와 시리즈 분류를 확인합니다.'),('guide-week','guide','3단계. 표시된 주간 집계 기간을 확인합니다.'),('guide-table','guide','4단계. 순위와 목록에 오른 주 수를 읽습니다.')]
    else:
        items=[('search-official','search','넷플릭스 고객 센터의 성인 인증 안내를 선택합니다.'),('guide-entry','guide','1단계. 공식 안내에서 인증 대상과 진입 경로를 확인합니다.'),('guide-form','guide','2단계. 인증 화면에서 실제 정보와 동의 항목을 본인이 확인합니다.'),('guide-details','guide','3단계. 이동통신사 계정의 이름과 전화번호 안내를 확인합니다.'),('guide-renew','guide','4단계. 적용 기기와 12개월 재인증 안내를 확인합니다.'),('guide-error','guide','5단계. 오류가 나면 해당 공식 도움말을 확인합니다.')]
    provenance=[]
    for idx,(name,role,caption) in enumerate(items, 1):
        metadata=json.loads((folder/'evidence'/f'{name}.json').read_text(encoding='utf-8'))
        original=folder/'raw'/f'{name}.png'
        use=original
        mask = None
        if role=='search': mask=(1013,20,1065,82)
        elif job['row']!=55: mask=(32,0,95,65)
        elif name=='guide-form': mask=(777,10,850,65)
        if mask:
            use=folder/'raw'/f'privacy-{name}.png'
            if use.exists(): raise RuntimeError('Privacy copy already exists')
            with Image.open(original) as im:
                im=im.convert('RGB'); ImageDraw.Draw(im).rectangle(mask,fill='#242424' if role!='search' else '#ffffff'); im.save(use)
        image_url=metadata['url']
        img={'role':role,'file':'raw/'+use.name,'sourceId':'S1','caption':caption,'alt':caption,'boxes':metadata['boxes']}
        if role=='search': img['query']=job['query']
        data['images'].append(img)
        provenance.append(f'| {idx:02d} | {use.name} (원본 {original.name}) | {caption} | [{"Google 검색" if role=="search" else "넷플릭스 화면"}]({image_url}) |')
    data['body']=base+'\n\n'+extra+'\n\n## 이미지 원본과 배치 기록\n\n| 순서 | 파일명 | 설명 | 실제 화면 출처 |\n|---:|---|---|---|\n'+'\n'.join(provenance)+'\n\n프로필 그림이 보이는 화면은 발행용 사본에서 해당 영역을 가렸습니다. 원본과 캡처 좌표는 raw 및 evidence에 보존합니다.'
    data['visualReviewed']=False
    research_file.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    state_file=folder/'evidence'/'browser.json'
    state=json.loads(state_file.read_text(encoding='utf-8'))
    state['status']='search_ready'; state.pop('blockReason',None)
    state_file.write_text(json.dumps(state,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(job['row'],len(data['body']),'chars',len(data['images']),'images')
