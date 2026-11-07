import json
from pathlib import Path
root=Path(__file__).resolve().parents[3]
d=root/'26_1107/앱사용_11월 넷플릭스 드라마 순위/웹조사'
p=d/'research.json'
data=json.loads(p.read_text(encoding='utf-8'))
data['body']='''## 2026년 11월, 어떤 순위를 봐야 할까요?

2026년 11월 7일 확인한 넷플릭스 공식 Tudum의 한국 Shows 차트에서 최신으로 표시된 집계 기간은 **2026년 10월 26일~11월 1일**입니다. 이 기간은 11월 첫날을 포함한 한 주이며 11월 한 달 전체의 확정 순위가 아닙니다. 이후 주간 결과가 발표되면 순위가 달라질 수 있습니다. 공식 페이지의 Shows는 드라마만이 아니라 다른 종류의 시리즈·프로그램도 포함하는 분류이므로 ‘드라마만의 순위’와 동일하게 취급하지 않는 것이 정확합니다. [S1]

확인한 한국 Shows 주간 차트의 상위 세 작품은 1위 《닥터X: 하얀 마피아의 시대》, 2위 《꿀알바》, 3위 《100일의 거짓말》입니다. 공식 표에는 각각 영문 제목 Doctor X: Mafia in White, Dead-End Job, 100 Days of Deception으로 표시됐고 작품 이미지에서 한국어 제목도 확인했습니다. 조사 화면은 1위와 3위의 톱10 진입 주 수를 각각 4주, 2위는 1주로 표시했습니다. 이는 순위에 머문 주 수이며 시청자 수나 방송 시청률이 아닙니다. [S1]

같은 주의 공식 Shows 목록 나머지는 아래와 같습니다. 표에 나온 영문 표기를 그대로 적었고, 시즌·파트가 다른 항목도 별개 표기로 유지했습니다. 이 목록에는 드라마 외 프로그램이 포함됩니다. [S1]

- 4위 I am Solo: Part 34
- 5위 The Ballad of Us: Season 2
- 6위 World Dice Tour: Season 4
- 7위 The Wonder Coach: Season 2
- 8위 Where the Mask Ends: Season 1
- 9위 Marriage of Convenience: Season 1
- 10위 Take Charge of My Heart: Limited Series

원래 검색어로 나온 공식 결과 중에는 2022년 12월에 발표된 11월 28일 주간 자료도 있었습니다. 검색 결과 제목에 ‘11월’과 ‘TOP 10’이 있더라도 발행 연도와 집계 국가·기간을 함께 확인해야 합니다. 해당 과거 자료는 2026년 순위의 근거로 사용하지 않았습니다. 현재 차트를 찾기 위해 공식 도메인으로 범위를 좁혀 다시 검색했습니다. [S2]

## 공식 한국 주간 차트 확인 순서

1. Google에서 넷플릭스 공식 순위 결과를 찾고 주소와 제목을 살펴봅니다. 원래 검색 결과에서 확인한 About Netflix 자료는 과거 자료였으므로 연도를 확인한 후 추가 탐색했습니다. 공식 차트 검색 결과의 ‘Top 10 Shows in South Korea’를 열면 조사 시점의 한국 Shows 페이지로 이동합니다. 검색 결과의 순서와 광고 표시는 접속 시점에 따라 달라질 수 있습니다. [S1][S2]

2. 차트 상단의 국가 선택을 확인합니다. 조사 화면은 South Korea로 표시됐으며, 국가 목록에서 다른 나라나 Global을 선택할 수 있었습니다. 한국 차트와 글로벌 차트는 대상이 다르므로 두 순위를 한 목록에 섞어 쓰지 마세요. 검색한 사람이 해외에 있거나 이전 선택이 남아 있으면 먼저 현재 표시를 확인하는 것이 좋습니다. [S1]

3. 분류가 Shows인지 Movies인지 확인합니다. 드라마를 찾는다면 Shows를 살펴볼 수 있지만, 이 분류에 예능 등도 들어갈 수 있습니다. 실제로 조사 시점의 한국 Shows 차트에는 《나는 SOLO》가 4위로 표시됐습니다. ‘드라마 4위’라고 바꿔 쓰거나 다른 프로그램을 제외한 뒤 원래 순위 번호를 그대로 드라마 전용 순위로 제시하면 범주가 달라집니다. [S1]

4. 날짜 선택에서 표시된 주간 기간을 읽습니다. 조사 시점의 기본값은 10월 26일부터 11월 1일까지였고 이전 주를 선택할 수 있었습니다. 같은 작품이 몇 주 연속 상위에 있는지 보려면 각 주를 따로 선택해 같은 국가와 분류를 유지한 채 비교하세요. 주간 차트가 갱신되는 시점에는 보이는 최신 기간이 바뀔 수 있습니다. [S1]

5. 아래 Overview 목록에서는 순위, 작품명과 톱10에 포함된 주 수를 함께 확인할 수 있습니다. 목록의 작품 이름을 선택하면 상세 정보를 살펴보는 경로가 제공되지만 이번 조사에서는 재생이나 구독, 가입을 진행하지 않았습니다. 서비스에서 제공하는 작품과 재생 가능 여부는 계정 및 지역에 따라 달라질 수 있습니다. [S1]

## 확인한 순위를 활용하는 법

이 차트는 당시 한국에서 많이 본 Shows 목록을 살펴보는 출발점입니다. 관심 있는 드라마를 고를 때에는 포스터와 제목만 보고 결정하기보다 작품 소개, 회차, 장르와 이용 가능 여부를 현재 서비스에서 확인하세요. 1위라는 숫자는 해당 주의 특정 지역과 분류에서의 위치를 뜻하며 모든 시청자에게 가장 잘 맞는 작품이라는 뜻은 아닙니다. 작품의 평점이나 개인 취향과는 별도로 해석하는 것이 좋습니다.

조사된 차트에서 1위부터 3위까지와 4위의 프로그램이 모두 Shows에 들어간다는 점은 범주를 이해하는 데 도움이 됩니다. 드라마만 보고 싶으면 차트 전체의 순위를 그대로 남긴 채 원하는 장르를 골라 살펴보세요. 일부 항목을 제외해 다시 번호를 매긴다면 넷플릭스가 발표한 순위가 아니라 독자가 별도로 추린 목록이라는 점을 명확히 밝혀야 합니다. 공개 자료의 집계 기간과 조사일도 함께 적어야 나중에 다른 차트와 비교하기 쉽습니다. [S1]

인터넷에서 보는 일간 순위나 외부 인기 지표는 공식 주간 차트와 집계 주기와 기준이 다를 수 있습니다. 숫자가 서로 다르다는 사실만으로 어느 한쪽이 틀렸다고 결론 내리기보다 출처, 대상 지역, 분류, 날짜와 집계 단위를 먼저 비교하세요. 공식 차트의 항목에 나타나는 주 수 역시 해당 차트에 오른 기간을 뜻하며 총 시청 시간이나 시청률 수치로 바꾸어 쓰면 안 됩니다. [S1]

## 자주 묻는 질문

**2026년 11월 전체 1위가 확정됐나요?** 11월 7일 조사 시점에 확인한 최신 공식 한국 Shows 기간은 10월 26일~11월 1일이었습니다. 이 자료만으로 아직 진행 중인 11월 전체의 순위를 확정할 수 없습니다. [S1]

**한국 1위는 글로벌 1위와 같은가요?** 국가 선택과 Global은 다른 차트입니다. 같은 주와 분류를 선택하더라도 순위가 다를 수 있으므로 각각 확인해야 합니다. [S1]

**Shows 차트는 드라마 전용인가요?** 아닙니다. 확인한 목록에는 드라마 외 프로그램도 포함됐습니다. 드라마만 선택한 별도 집계라고 표시하지 마세요. [S1]

**과거 11월 검색 결과를 써도 되나요?** 목적이 과거 자료 비교라면 연도와 기간을 밝혀 참고할 수 있습니다. 이번에 열린 공식 검색 결과 중 하나는 2022년 자료여서 2026년 현재 순위의 근거로 사용하지 않았습니다. [S2]

## 편집 메모와 캡처 기록

발행 전 공식 페이지의 최신 주간 기간과 순위를 다시 확인하고, 차트 이미지와 작품 포스터의 재사용 권한을 확인하세요. 아래 목록에서 발행 순서는 10, 01, 06, 07, 08, 09입니다. 나머지는 중복 화면 또는 좌표 확인용 원본으로 보존합니다. Google 화면은 해당 검색 결과의 URL이며 차트 화면은 촬영 당시 공식 URL입니다.

- raw/10-original-search.png: 원래 검색의 2022년 공식 결과, https://www.google.com/search?q=11월%20넷플릭스%20드라마%20순위&start=10
- raw/01-search.png: 공식 현재 차트 추가 검색, https://www.google.com/search?q=site%3Anetflix.com%2Ftudum%2Ftop10%2Fsouth-korea%20tv%202026
- raw/02-ranking.png, 03-country.png, 04-category.png, 05-week.png: 차트 기본 화면과 좌표 기록, https://www.netflix.com/tudum/top10/south-korea/tv
- raw/06-country-menu.png: 국가 선택, https://www.netflix.com/tudum/top10/south-korea/tv
- raw/07-category-menu.png: Shows·Movies 선택, https://www.netflix.com/tudum/top10/south-korea/tv
- raw/08-week-menu.png: 주간 기간 선택, https://www.netflix.com/tudum/top10/south-korea/tv
- raw/09-overview.png: 한국 주간 순위 목록, https://www.netflix.com/tudum/top10/south-korea/tv
'''.strip()
data['sources']=[
 {'id':'S1','title':'Netflix Tudum 한국 Shows 주간 TOP 10','url':'https://www.netflix.com/tudum/top10/south-korea/tv','official':True,'checkedAt':'2026-11-07'},
 {'id':'S2','title':'About Netflix 2022년 11월 28일 주간 자료','url':'https://about.netflix.com/ko/news/top-10-week-of-november-28-two-snaps-for-wednesday-as-the-series-enters-the','official':True,'checkedAt':'2026-11-07'}]
specs=[('search','10-original-search','원래 검색에서 열린 공식 결과는 2022년 자료입니다.','S2'),
 ('reference','01-search','추가 검색에서 현재 한국 주간 차트를 찾습니다.','S1'),
 ('guide','06-country-menu','국가 선택에서 South Korea를 확인합니다.','S1'),
 ('guide','07-category-menu','Shows와 Movies의 분류를 확인합니다.','S1'),
 ('guide','08-week-menu','집계 주간을 확인하고 이전 주를 선택합니다.','S1'),
 ('guide','09-overview','한국 Shows의 주간 순위 목록을 살펴봅니다.','S1')]
data['images']=[]
for role,name,caption,source in specs:
 m=json.loads((d/'evidence'/f'{name}.json').read_text(encoding='utf-8'))
 item={'role':role,'file':f'raw/{name}.png','sourceId':source,'caption':caption,'alt':caption,'boxes':m['boxes']}
 if role=='search':
  item['query']='11월 넷플릭스 드라마 순위';item['boxes']=[[130,470,670,100]];item['redactions']=[[1040,5,220,80]]
 if name=='01-search': item['boxes']=[[130,190,370,110]];item['redactions']=[[1040,5,220,80]]
 if name in ('06-country-menu','07-category-menu','08-week-menu'):
  item['redactions']=[[20,5,220,60]]
  item['boxes']={'06-country-menu':[[80,125,245,55]],'07-category-menu':[[295,125,245,55]],'08-week-menu':[[80,238,215,55]]}[name]
 if name=='09-overview': item['boxes']=[[80,640,1070,245]]
 data['images'].append(item)
p.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print('body length',len(data['body']))
