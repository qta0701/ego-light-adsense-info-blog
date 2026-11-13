from pathlib import Path
from PIL import Image

root = Path('26_1113/은행_재테크_하나은행 환율조회/웹조사')
pub = root / 'publish'
base = '은행_재테크_하나은행 환율조회'
url = 'https://www.kebhana.com/cont/mall/mall15/mall1501/index.jsp'
items = [
('01_search.png','01_search.png','s1','1. 공식 현재환율 화면 열기','검색 결과에서 하나은행의 환율/외화예금 금리 공식 결과를 확인합니다.','공식 페이지에서 현재환율 탭을 확인합니다.','하나은행 환율조회 공식 검색 결과','검색 결과의 하나은행 공식 페이지, 2026년 11월 13일 PC 화면입니다.'),
('02_form.png','02_guide.png','s2','2. 통화와 날짜, 고시회차 선택','아래 화면에서 통화선택, 일자선택, 고시회차와 조회 위치를 확인할 수 있습니다.','조회 후에는 결과의 기준일과 고시일시부터 확인합니다.','하나은행 현재환율 통화 일자 고시회차 조회 화면','통화와 일자, 고시회차를 지정하는 PC 화면입니다.'),
('03_rates.png','03_guide.png','s3','3. 현찰과 송금 환율 읽기','결과표 상단에는 고시 정보와 현찰·송금·매매기준율 열이 나란히 표시됩니다.','표의 숫자는 캡처 당시 예시이므로 현재 값은 공식 화면에서 다시 확인합니다.','하나은행 환율표 고시일시와 현찰 송금 열','고시 정보와 거래 유형별 열을 구분한 PC 화면입니다.'),
('04_notes.png','04_guide.png','s4','4. 과거 환율과 휴일 확인','결과표 아래 유의사항에서 휴일과 영업일 첫 고시 전의 조회 기준을 확인합니다.','기대했던 날짜와 다르면 결과의 기준일과 회차를 함께 확인합니다.','하나은행 환율조회 휴일 고시 유의사항','휴일과 고시 기준에 관한 PC 화면입니다.')]
parts = ['<style>\n.seo-text{line-height:1.8;margin:1em 0}.box{background:#f0f3ff;padding:20px;border-radius:10px;margin:24px 0}.box:before{content:attr(data-title);font-weight:bold;color:#3c40ff}.seo-image-caption{font-size:16px;line-height:1.6;text-align:center}.faq-item{padding:16px;margin:12px 0;border:1px solid #dce3f0;border-radius:8px}.faq-answer{border-left:3px solid #3c40ff;padding-left:12px}.table-wrap{overflow-x:auto}table{border-collapse:collapse;width:100%}th,td{padding:10px;border:1px solid #dce3f0}a{color:#3c40ff}h2 a{color:inherit;text-decoration:none}.button{display:inline-block;background:#3c40ff;color:white;padding:14px 20px;border-radius:8px;text-decoration:none}\n</style>',
'<p class="seo-text">하나은행 환율조회는 통화와 날짜, 고시회차를 선택해 은행이 고시한 환율을 확인하는 방법입니다.</p>\n<p class="seo-text">환전과 송금에 필요한 열이 서로 다르므로 숫자뿐 아니라 기준 시점과 거래 유형도 함께 살펴보세요.</p>',
'<div class="box info" data-title="핵심 요약"><ul><li>공식 현재환율 화면에서 통화·일자·회차를 지정합니다.</li><li>결과의 기준일과 고시일시, 조회시각을 함께 확인합니다.</li><li>현찰과 송금에 맞는 열을 구분합니다.</li><li>JPY는 표에 표시된 100엔 단위를 확인합니다.</li><li>휴일에는 전 영업일 기준으로 조회될 수 있습니다.</li></ul></div>',
f'<p><a class="button" style="color:#ffffff" href="{url}">하나은행 현재환율 확인하기</a></p>']
extras = [
'<p class="seo-text">하나은행 홈페이지에서는 외환 → 환율/외화예금 금리 → 현재환율 순서로 접근할 수 있습니다.</p>\n<p class="seo-text">2026년 11월 13일 확인한 PC 공개 화면은 로그인하지 않은 상태에서 열렸습니다.</p>',
'<p class="seo-text">통화를 선택하고 날짜를 달력에서 고르거나 연월일 8자리로 입력합니다.</p>\n<p class="seo-text">고시회차는 최초·현재·특정회차 중 목적에 맞게 고른 뒤 조회를 누릅니다.</p>\n<p class="seo-text">특정 통화만으로 표가 갱신되는 동작은 확인하지 못했으므로 결과에서 원하는 통화 행을 직접 확인하세요.</p>',
'<div class="table-wrap"><table><tr><th>필요한 거래</th><th>확인할 열</th></tr><tr><td>외화 현찰을 살 때</td><td>현찰 사실 때</td></tr><tr><td>외화 현찰을 팔 때</td><td>현찰 파실 때</td></tr><tr><td>해외로 송금할 때</td><td>송금 보낼 때</td></tr><tr><td>해외에서 송금을 받을 때</td><td>송금 받을 때</td></tr></table></div>\n<p class="seo-text">매매기준율만 실제 거래액에 그대로 적용하지 말고, 우대와 수수료 등 거래 조건이 반영된 최종 확인 화면을 살펴보세요.</p>\n<p class="seo-text">일본 엔화는 표에서 JPY (100)으로 표시되므로 다른 통화와 비교할 때 기준 단위를 함께 읽어야 합니다.</p>',
'<p class="seo-text">과거 고시를 확인하려면 일자와 필요한 고시회차를 지정합니다.</p>\n<p class="seo-text">은행 안내에 따르면 토요일·일요일·공휴일 또는 영업일 첫 고시 전에는 전 영업일자로 조회될 수 있습니다.</p>\n<p class="seo-text">시장 상황에 따라 휴일에도 재고시될 수 있고, 거래되지 않는 통화는 고시되지 않을 수 있습니다.</p>']
meta_blocks=[]
for i,(raw,file,sec,title,before,after,alt,cap) in enumerate(items,1):
    n=f'{i:02d}'; w,h=Image.open(pub/file).size
    parts += [f'<h2 id="{sec}"><a href="{url}">{title}</a></h2>', extras[i-1], f'<p id="p{n}-before" class="seo-text">{before}</p>', f'<!-- IMAGE_SLOT:IMG_{n} START -->\n<div id="img-{n}" data-image-id="IMG_{n}" class="seo-image-container">\n<img src="{{{{BLOGGER_IMAGE_URL_IMG_{n}}}}}" alt="{alt}" width="{w}" height="{h}" style="max-width:100%;height:auto;display:block;margin:0 auto;">\n<p class="seo-image-caption">{cap}</p>\n</div>\n<!-- IMAGE_SLOT:IMG_{n} END -->', f'<p id="p{n}-after" class="seo-text">{after}</p>',f'<div class="box info" data-title="출처 및 확인 자료"><ul><li><a href="{url}">하나은행 현재환율</a> · 2026-11-13 확인</li></ul></div>']
    meta_blocks.append(f'''삽입 ID: IMG_{n} / 추천 업로드·노출 순서: {i} / 역할: {'search' if i==1 else 'guide'}
원래 파일번호·원본: {i:02d} / 26_1113/은행_재테크_하나은행 환율조회/웹조사/raw/{raw}
업로드 파일: 26_1113/은행_재테크_하나은행 환율조회/웹조사/publish/{file}
삽입 소제목: {title} / id={sec}
직전: p{n}-before / {before}
직후: p{n}-after / {after}
HTML 위치: img-{n} / IMAGE_SLOT:IMG_{n} / {{{{BLOGGER_IMAGE_URL_IMG_{n}}}}}
alt: {alt}
캡션: {cap}
크기: {w}×{h}px / 가로 100% 이내, 비율 유지
화면: PC 웹 / 출처: {url} / 확인일: 2026-11-13
표식: 빨간 테두리와 화살표 / 편집: {'계정·주소 가림 및 표식' if i==1 else '표식 추가'} / 채택: 해당 단계 설명
''')
parts += [f'<h2 id="faq"><a href="{url}">5. 자주 묻는 질문</a></h2>', '<div class="faq-container"><div class="faq-item"><div class="faq-question"><strong>Q. 기준일과 조회시각은 어떻게 다른가요?</strong></div><div class="faq-answer">기준일은 결과가 가리키는 날짜이고 조회시각은 결과를 확인한 시점입니다.<br />고시일시와 회차도 함께 기록하면 같은 날짜의 자료를 비교하기 쉽습니다.</div></div><div class="faq-item"><div class="faq-question"><strong>Q. 조회한 환율이 실제 결제액과 같나요?</strong></div><div class="faq-answer">거래 유형과 우대 조건 등에 따라 다를 수 있습니다.<br />거래를 진행할 때 최종 적용 환율과 금액을 확인하세요.</div></div><div class="faq-item"><div class="faq-question"><strong>Q. 결과를 저장할 수 있나요?</strong></div><div class="faq-answer">확인한 PC 화면에는 다운로드와 인쇄 메뉴가 표시됩니다.<br />실제 다운로드 동작은 확인하지 않았습니다.</div></div></div>', f'<div class="box info" data-title="출처 및 확인 자료"><ul><li id="source-s1"><a href="{url}">하나은행 현재환율 및 유의사항</a> · 2026-11-13 확인</li></ul></div>']
html='\n'.join(parts)+'\n'
meta='''[작업 정보]
spreadsheetId: 1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s / sheetId: 1126487498 / 탭: 은행_재테크 / 실제 행: 19 / 키워드: 하나은행 환율조회 / runId: 20261113-content-1401 / threadId: 01a1d34a-a0bc-7d90-9a35-dbba863cf6e8
D열 반영 상태: 조정자 담당, 미반영

[콘텐츠 개요]
하나은행 공식 현재환율 조회 조건과 결과표를 읽는 순서.
현찰·송금 열과 과거 날짜 및 휴일 고시 기준을 안내합니다.

[제목 후보]
1. 하나은행 환율조회 방법 통화 날짜 고시회차 확인 (최종 추천)
2. 하나은행 환율조회 현재환율과 과거 환율 보는 법
3. 하나은행 환율조회 현찰 송금 매매기준율 구분
4. 하나은행 환율조회 달러 엔화 단위 확인 방법
5. 하나은행 환율조회 공식 화면에서 회차 선택하기
6. 하나은행 환율조회 휴일과 과거 날짜 확인법
7. 하나은행 환율조회 고시일시와 조회시각 읽기

[후킹 문구]
1. 환율 숫자와 함께 고시 시점을 확인해 보세요. (최종 추천)
2. 현찰과 송금 중 어떤 열을 봐야 할까요?
3. 엔화 환율은 단위부터 살펴보세요.
4. 과거 환율은 날짜와 회차를 함께 확인하세요.
5. 환전 전 공식 환율표를 읽는 순서를 알아보세요.
6. 휴일 조회 결과의 기준일을 확인하세요.
7. 조회시각과 고시일시의 차이를 살펴보세요.

[영문 슬러그]
1. hana-bank-exchange-rate (최종 추천)
2. hana-bank-currency-rate
3. hana-exchange-rate-lookup

[메타디스크립션]
1. 하나은행 환율조회 방법, 통화와 날짜·고시회차 선택, 현찰·송금 환율과 과거 환율 확인. (최종 추천)
2. 하나은행 환율조회 공식 화면 사용법과 매매기준율, 엔화 단위, 휴일 고시 기준 안내.
3. 하나은행 환율조회에서 현재환율과 과거 날짜를 찾고 고시일시와 거래별 환율 열을 확인하세요.

[Blogger 이미지 업로드 추천 순서와 삽입 위치]
채택 4개 / 제외·보류 0개 / 대표 추천 IMG_02: 조회 조건과 핵심 동작을 보여줌.
업로드 순서: IMG_01 → IMG_02 → IMG_03 → IMG_04
'''+ '\n'.join(meta_blocks)+f'''
[제외·보류 이미지]
없음. raw 4장과 기존 발행본 4장을 확인했으며 동일 화면의 원본을 중복 삽입하지 않음.
추가 조사: Google 검색과 공식 현재환율 페이지 재확인. 기존 네 장이 핵심 화면을 다루며 추가 고유 장면은 확보하지 못함. 필요 장면: 통화 선택 후 필터링된 결과; 재개 시 실제 결과 갱신을 확인해 캡처.

[업로드 인계]
파일 작성 / 이미지 미업로드 / Blogger 미발행. 토큰은 실제 이미지 URL이 아님.
광고 및 제휴 설정은 대상 블로그에서 확인 필요. 실제 Blogger 테마의 대표 이미지 연결은 별도 확인.
URL·글 ID: 미생성. 다음 단계: 이미지 업로드 후 ID별 토큰 치환 및 Blogger 테마 미리보기.

[검수 결과]
공식 출처: 하나은행 현재환율 {url} / 2026-11-13 확인.
통화 선택 후 단일 통화 결과 갱신과 다운로드 동작은 미확인. 화면 숫자는 당시 예시.
모바일/PC 로컬 미리보기: 확인 예정. 실제 Blogger 테마 미리보기: 미실행.
'''
for path, value in [(pub/(base+'_html콘텐츠.html'),html),(pub/(base+'_제목메타디스크립션.txt'),meta)]:
    with path.open('x',encoding='utf-8',newline='\n') as f: f.write(value)
