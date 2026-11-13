from pathlib import Path
from html import escape
import json

root = Path('26_1113/은행_재테크_부산은행 환전/웹조사')
pub = root / 'publish'
name = '은행_재테크_부산은행 환전'
url = 'https://www.busanbank.co.kr/ib20/mnu/FPMFRX189002011'
prefix = '26_1113/은행_재테크_부산은행 환전/웹조사/'
sections = [
('one','1. 부산은행 ONE환전은 무엇인가요','02_intro.png','02_guide.png','공식 ONE환전 서비스 개요','ONE환전 개요와 수령·배달·보관 안내 화면입니다.','부산은행 PC 웹의 ONE환전 개요에서 서비스 범위를 확인합니다.','화면의 개인용 ONE환전과 기업용 ONE금고는 서로 구분해 확인하세요.'),
('conditions','2. 대상과 시간, 한도를 먼저 확인하세요','03_target.png','03_guide.png','ONE환전 개인 이용대상 안내','이용대상과 이용시간을 보여주는 부산은행 PC 웹 화면입니다.','이용대상 항목에 국민인 거주자 개인이라고 표시되어 있습니다.','이용시간 아래에는 금고보관과 비로그인 입금의 예외가 따로 적혀 있습니다.'),
('limit','환전 가능 한도 확인','04_limits.png','04_guide.png','로그인과 비로그인의 환전 가능 한도','로그인 여부에 따른 환전 한도 안내 화면입니다.','환전 가능 한도에서 로그인과 비로그인의 기준을 나누어 봅니다.','로그인 한도는 기존 비대면 신청액과 미수령 잔액을 합산하는 조건입니다.'),
('pickup','3. 신청과 외화 수령 방법','05_pickup.png','05_guide.png','환전수령과 현찰배달, 금고보관 비교표','환전 수령 방법별 비교표의 시작 부분입니다.','공식 안내의 환전 수령 방법 표에서 로그인 여부에 따른 차이를 확인합니다.','표에는 영업점 수령과 외화 ATM 이용 조건도 구분되어 있습니다.'),
('delivery','4. 현찰배달과 수령 기한의 주의점','06_delivery.png','blogger-images/06_delivery_marked.png','현찰배달 금액과 배송비 안내','현찰배달 조건과 배송비를 보여주는 부산은행 PC 웹 화면입니다.','현찰배달 항목에서 이용 가능 금액과 배송비를 확인합니다.','표의 빨간 테두리는 배송 건당 비용을 강조한 표시입니다.'),
]

def slot(i, item):
    key, title, raw, image, alt, caption, before, after = item
    ident=f'IMG_{i:02d}'
    return f'''<p id="{key}-intro" class="seo-text">{before}</p>
<!-- IMAGE_SLOT:{ident} START -->
<div id="img-{i:02d}" data-image-id="{ident}" class="seo-image-container" style="margin:24px 0; background:transparent;">
  <img src="{{{{BLOGGER_IMAGE_URL_{ident}}}}}" alt="{alt}" width="1440" height="900" style="max-width:100%; height:auto; display:block; margin:0 auto;" />
  <p class="seo-image-caption" style="font-size:16px; line-height:1.6;">{caption} 2026년 11월 13일 확인.</p>
</div>
<!-- IMAGE_SLOT:{ident} END -->
<p id="{key}-result" class="seo-text">{after}</p>'''

def source():
    return f'<div class="box info" data-title="출처 및 확인 자료"><ul><li><a href="{url}" style="color:#1b1bf8; text-decoration:underline;"><strong>부산은행 ONE환전 이용안내</strong></a> (2026년 11월 13일 확인)</li></ul></div>'

h = []
h.append(f'''<p class="seo-text"><strong>부산은행 환전</strong>은 ONE환전 안내를 통해 외화 수령, 현찰배달, 금고보관의 조건을 확인한 뒤 신청할 수 있습니다.</p>
<p class="seo-text">개인 이용 대상과 로그인 여부에 따라 한도와 수령 방법이 달라집니다.</p>
<p class="seo-text">아래 내용은 2026년 11월 13일 확인한 부산은행 공식 안내 기준이며, 적용환율과 실제 수령 가능 여부는 신청 화면에서 다시 확인하세요.</p>
<div class="box info" data-title="핵심 요약"><ul>
<li>개인 이용대상: 국민인 거주자 개인</li>
<li>로그인과 비로그인의 한도 및 수령 방법이 다릅니다.</li>
<li>영업점의 외화 보유 여부와 인수 예정일을 확인하세요.</li>
<li>현찰배달은 금액·통화·지역·배송비 조건이 있습니다.</li>
</ul></div>
<div class="box info tipsid-actionbox" data-title="공식 안내 확인">
<p>신청 전 <a href="{url}" style="color:#1b1bf8; text-decoration:underline;"><strong>ONE환전 이용조건</strong></a>을 확인하세요.</p>
<div class="wp-block-buttons is-layout-flex tipsid-button-row"><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="{url}">ONE환전 공식 안내 보기</a></div></div>
</div>''')
h.append(f'<br /><br />\n<h2 id="one"><a href="{url}" style="text-decoration:none; color:inherit;">{sections[0][1]}</a></h2>')
h.append('<p class="seo-text">ONE환전은 외화를 환전해 수령하거나 배달받고, 금고에 보관할 수 있도록 안내하는 서비스입니다.</p>')
h.append(slot(1,sections[0]))
h.append('<p class="seo-text">부산은행 웹사이트에서 금융상품 → 외환 → 환전 → 환전서비스안내 → ONE환전 순서로 안내를 찾을 수 있습니다.</p>')
h.append(f'<p class="seo-text">화면과 조건은 바뀔 수 있으므로 <a href="{url}" style="color:#1b1bf8;"><strong>공식 이용안내</strong></a>를 기준으로 다시 확인하세요.</p>')
h.append(source())
h.append(f'<br /><br />\n<h2 id="conditions"><a href="{url}" style="text-decoration:none; color:inherit;">{sections[1][1]}</a></h2>')
h.append(slot(2,sections[1]))
h.append('<p class="seo-text">안내상 이용시간은 24시간 365일이지만, 금고보관 거래는 주말과 공휴일에 할 수 없습니다.</p>\n<p class="seo-text">비로그인 환전의 가상계좌 입금은 23:30부터 24:30까지 불가합니다.</p>')
h.append('<p class="seo-text">환전 가능 통화는 USD, JPY, EUR, CNY를 포함해 총 15개로 안내됩니다.</p>\n<p class="seo-text">환전 가능 통화라도 원하는 지점이 해당 현찰과 권종을 보유하는지는 별도로 확인해야 합니다.</p>')
h.append(f'<br /><br />\n<h3 id="limit">{sections[2][1]}</h3>')
h.append(slot(3,sections[2]))
h.append('<p class="seo-text">로그인 환전은 미화 100달러부터 1만 달러 이하로 안내되며, 부산은행에서 신청한 비대면 환전금액과 미수령 잔액을 합산합니다.</p>\n<p class="seo-text">비로그인 환전은 원화 100만원 이하입니다.</p>\n<p class="seo-text">금액을 입력할 때 실제 적용 범위와 환율, 우대율을 신청 화면에서 확인하세요.</p>')
h.append(source())
h.append(f'<br /><br />\n<h2 id="pickup"><a href="{url}" style="text-decoration:none; color:inherit;">{sections[3][1]}</a></h2>')
h.append('<ol><li>공식 안내에서 대상, 통화, 이용시간과 한도를 확인합니다.</li><li>개인용 ONE환전으로 이동해 화면에서 안내하는 통화, 금액과 가능한 수령 방식을 확인합니다.</li><li>최종 환율과 수령 장소·날짜를 확인한 뒤 화면의 안내를 따릅니다.</li></ol>')
h.append('<p class="seo-text">로그인 이후의 실제 입력 순서와 거래 완료 화면은 확인하지 못했으므로 화면에 표시되는 절차를 우선하세요.</p>')
h.append(slot(4,sections[3]))
h.append('<p class="seo-text">개인 로그인 고객은 본인 또는 대리인이 수령할 수 있고, 비로그인 고객은 본인만 수령할 수 있습니다.</p>\n<p class="seo-text">대리 수령에 필요한 서류는 방문할 영업점에 미리 문의하세요.</p>\n<p class="seo-text">영업점 수령은 신청 시점에 해당 외화를 보유한 영업점이 대상입니다.</p>\n<p class="seo-text">외화 ATM은 당일 인수가 불가하며 이용 가능한 통화와 장소가 정해져 있습니다.</p>')
h.append(source())
h.append(f'<br /><br />\n<h2 id="delivery"><a href="{url}" style="text-decoration:none; color:inherit;">{sections[4][1]}</a></h2>')
h.append(slot(5,sections[4]))
h.append('<p class="seo-text">로그인 고객의 현찰배달은 미화 100달러 이상이면서 원화 150만원 이하이고, 안내된 11개 통화에 한합니다.</p>\n<p class="seo-text">배송비는 건당 1만원이며 배달 여건에 따라 이용할 수 없는 지역이 있습니다.</p>\n<p class="seo-text">비로그인 고객은 안내표상 현찰배달과 금고보관을 이용할 수 없습니다.</p>')
h.append('<p class="seo-text">영업점 환전수령은 신청일로부터 30일 이내 인수하도록 안내하며, 유효기간은 인수예정일을 포함해 7영업일입니다.</p>\n<p class="seo-text">실제 신청 내역에 표시된 날짜를 확인하고, 지점에 외화 재고와 방문 가능 시간을 문의하세요.</p>\n<p class="seo-text">유효기간이 지나면 로그인 환전수령 외화는 금고에 자동 보관되고, 비로그인 거래는 안내된 조건에 따라 자동환매됩니다.</p>\n<p class="seo-text">재환전 시점의 환율이 달라 원화로 돌려받는 금액도 달라질 수 있습니다.</p>')
h.append(source())
h.append(f'''<br /><br />
<h2 id="faq"><a href="{url}" style="text-decoration:none; color:inherit;">5. 자주 묻는 질문</a></h2>
<div class="faq-container"><div class="faq-item"><div class="faq-question"><strong>Q. 환율 우대율은 언제 확인하나요?</strong></div><div class="faq-answer">A. 통화와 이용 방식에 따라 달라질 수 있으므로 신청 직전 적용환율과 우대 내용을 확인하세요.</div></div>
<div class="faq-item"><div class="faq-question"><strong>Q. 환전 가능 통화라면 모든 지점에서 받을 수 있나요?</strong></div><div class="faq-answer">A. 아닙니다. 영업점은 신청 시점의 외화 보유 여부가 조건이므로 필요한 통화와 권종을 미리 확인하세요.</div></div>
<div class="faq-item"><div class="faq-question"><strong>Q. 외화 ATM에서 신청 당일 받을 수 있나요?</strong></div><div class="faq-answer">A. 공식 안내에는 당일 인수가 불가하다고 표시되어 있습니다. 장소별 제공 통화도 확인하세요.</div></div></div>
<p class="seo-text">출발 전에 수령 장소와 기한을 확인하고, 궁금한 사항은 부산은행에 문의하세요.</p>
<div id="source-s1">{source()}</div>''')
html='\n'.join(h)+'\n'
(pub / f'{name}_html콘텐츠.html').write_text(html,encoding='utf-8')

titles=['부산은행 환전 방법과 ONE환전 한도·수령 조건','부산은행 환전 신청 전 확인할 한도와 수령 방법','부산은행 ONE환전 이용대상과 외화 수령 안내','부산은행 환전 수령·현찰배달 조건 알아보기','부산은행 환전 로그인과 비로그인 차이 정리','부산은행 환전 가능 통화와 영업점 수령 기한','부산은행 ONE환전 현찰배달과 유의사항']
hooks=['로그인 여부에 따라 환전 한도가 달라집니다.','원하는 지점의 외화 보유 여부부터 확인하세요.','현찰배달에는 금액과 배송비 조건이 있습니다.','수령 예정일과 유효기간을 함께 살펴보세요.','금고보관과 비로그인 입금 시간에는 예외가 있습니다.','환전 가능 통화와 지점 보유 권종은 다를 수 있습니다.','최종 환율과 우대율은 신청 화면에서 확인하세요.']
metas=['부산은행 ONE환전의 이용대상과 한도, 영업점 수령 및 현찰배달 조건을 확인하세요.','부산은행 환전 전 로그인별 한도와 통화, 수령 기한 및 배달 조건을 정리했습니다.','부산은행 환전 신청 전 필요한 이용시간과 수령 방법, 유효기간을 살펴보세요.']
slugs=['busan-bank-currency-exchange','busan-bank-one-exchange-guide','busan-bank-foreign-currency-pickup']
d=json.loads(Path('26_1113/_blogger_runs/20261113-content-1401/dispatch.json').read_text(encoding='utf-8'))
row=next(r for s in d['sections'] if s['id']=='은행_재테크-1' for r in s['rows'] if r['row']==14)
lines=['[작업 정보]',f'메인 키워드: 부산은행 환전','탭 / 대상 폴더: 은행_재테크 / 26_1113/은행_재테크_부산은행 환전','spreadsheetId / sheetId / 실제 시트 행 번호: 1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s / 1126487498 / 14',f"runId / 담당 독립 채팅 threadId / 조정자: 20261113-content-1401 / {row['threadId']} / 배정 조정자",'작성 완료 열(D)의 반영·재조회 상태: 조정자 처리 대기',f'입력 웹조사 Markdown: {prefix}publish/{name}_웹조사결과.md','조사 확인일 / 콘텐츠 작성일: 2026-11-13 / 2026-11-13',f'HTML 파일 / TXT 파일: {prefix}publish/{name}_html콘텐츠.html / {prefix}publish/{name}_제목메타디스크립션.txt','작업 상태: 파일 작성 완료 / 이미지 미업로드 / 미발행','발행 전 확인: 실제 적용환율·우대율·한도·재고·수령일 및 대상 블로그 광고·제휴 설정', '', '[콘텐츠 개요]','ONE환전의 이용대상과 로그인별 조건을 먼저 확인합니다.','공식 안내를 따라 수령 방식과 기한, 배달 조건을 비교합니다.','', '[제목 후보 7개]',f'최종 추천 제목: {titles[0]}']
lines += [f'{i}. {x}' for i,x in enumerate(titles,1)]
lines += ['', '[후킹 문구 후보 7개]']+[f'{i}. {x}' for i,x in enumerate(hooks,1)]
lines += ['', '[메타디스크립션 후보 3개]',f'최종 추천 메타디스크립션: {metas[0]} ({len(metas[0])}자)']+[f'{i}. {x} (공백 포함 {len(x)}자)' for i,x in enumerate(metas,1)]
lines += ['', '[영문 퍼머링크 후보 3개]',f'최종 추천 슬러그: {slugs[0]}']+[f'{i}. {x}' for i,x in enumerate(slugs,1)]+['한글 참고 문구: 부산은행 환전 방법','라벨 제안: 부산은행, 환전, 외화', '', '[Blogger 이미지 업로드 추천 순서와 삽입 위치]','채택 이미지 5개 / 제외·보류 1개','대표 이미지 추천: IMG_01 / 02_guide.png / ONE환전의 서비스 개요를 보여줌','업로드 순서: IMG_01 → 02_guide.png / IMG_02 → 03_guide.png / IMG_03 → 04_guide.png / IMG_04 → 05_guide.png / IMG_05 → 06_delivery_marked.png']
for i,item in enumerate(sections,1):
    key,title,raw,img,alt,caption,before,after=item; ident=f'IMG_{i:02d}'
    heading=('H3' if i==3 else 'H2')
    edit='원본에 배송비 행 빨간 테두리 추가, 가림 없음' if i==5 else '기존 발행본의 빨간 테두리와 화살표, 가림 없음'
    reason='배달 조건과 배송비 보강' if i==5 else '해당 조건을 공식 화면으로 확인'
    lines += ['',f'삽입 ID: {ident}',f'추천 업로드 순서 / 본문 노출 순서: {i} / {i}',f'원래 파일번호 / 원본 경로: {i+1:02d} / {prefix}raw/{raw}',f'업로드 파일 경로: {prefix}publish/{img}',f'이미지 내부 표식 번호 / 본문 절차 번호: {"번호 없음" if i==5 else "1"} / 해당 없음',f'역할: reference / 부산은행 PC 웹; {reason}',f'삽입 소제목: {heading} {title} / id={key}',f'직전 문단: id={key}-intro / {before}',f'직후 문단: id={key}-result / {after}',f'HTML 위치: id=img-{i:02d} / data-image-id={ident} / IMAGE_SLOT:{ident} START 및 END',f'치환 토큰: {{{{BLOGGER_IMAGE_URL_{ident}}}}}',f'권장 alt: {alt}',f'권장 캡션: {caption} 2026년 11월 13일 확인.','실제 이미지 크기 / 표시 원칙: 1440×900px / 가로 100% 이내, 비율 유지',f'출처 S1: 부산은행 ONE환전 이용안내 / {url} / 2026-11-13',f'편집·가림·가독성: {edit}; PC 원본 확인, 모바일에서는 작은 글씨 확대 필요','순서: 조사 자료의 서비스·대상·한도·수령 순서 유지; 배달 화면 추가','업로드 상태 / Blogger 이미지 URL / 확대 링크 URL: 미업로드 / 미업로드 / 없음']
lines += ['', '[제외·보류 이미지]',f'{prefix}publish/01_search.png 및 {prefix}raw/01_search.png: 검색 결과의 첫 공식 링크가 오류이므로 제외.','추가 시도: raw 후보 확인 후 Google 검색과 실제 부산은행 ONE환전 안내 방문, 현찰배달 화면 추가.','미확보 장면: 로그인 이후 신청 입력 및 거래 완료 화면. 실제 절차 확인 시 보강.','', '[업로드 담당 에이전트 전달사항]','대상 블로그·글 식별 정보: 지정되지 않음','허용 작업: 파일 작성만; 이미지 업로드·초안 저장·발행 미수행','제목·메타·슬러그·라벨: 위 추천값 사용 여부 및 현재 입력 제한 확인','이미지 업로드 후 각 ID별 URL 매핑 및 토큰 치환, Blogger 테마에서 모바일·PC 확인','광고·제휴 설정 미확인: 예시 광고 ID 삽입하지 않음','저장 또는 발행 URL·상태·시각, spaceId/blogId/postId/editorUrl: 미수행','G/H/L 시트 반영·재조회: 범위 밖, 미수행','', '[검수 결과]','파일·이미지·출처·슬롯 대응: 검수 진행','모바일/PC 로컬 미리보기: 검수 진행','실제 Blogger 테마 미리보기: 미수행','미해결 사항: 로그인 이후 실제 신청 과정, 최신 환율·우대율·지점 재고, 광고 설정 확인 필요']
(pub / f'{name}_제목메타디스크립션.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print('HTML lines',len(html.splitlines()),'H2',html.count('<h2 '),'images',len(sections))
