from pathlib import Path
from PIL import Image
import html
base=Path(__file__).parent/'웹조사'/'publish'
prefix='은행_재테크_신한은행 간편조회'
url='https://bank.shinhan.com/rib/easy/index.jsp#210000000000'
items=[
('01_search.png','raw/01_search.png','search','공식 경로 찾기','search','검색 결과에서 신한은행 개인뱅킹의 신한간편서비스를 확인합니다.','검색 결과의 은행 이름과 주소를 확인한 뒤 공식 결과를 선택하세요.','검색 결과에서 신한은행 공식 간편조회서비스를 확인합니다.'),
('03_guide.png','raw/03_eligibility.png','reference','이용 대상과 로그인 조건','eligibility','회원 구분별 이용 범위가 표시된 PC 화면입니다.','자신의 회원 유형에 맞는 로그인 수단을 준비하세요.','회원 구분별 이용 범위와 로그인 없이 이용 가능한 항목을 확인합니다.'),
('02_guide.png','raw/02_login.png','guide','PC에서 계좌조회하기','account','금융인증서·공동인증서와 이용자 ID 로그인 영역을 확인합니다.','본인에게 해당하는 방법을 선택하고 은행 화면의 안내를 따르세요.','계좌조회에서 인증서 또는 이용자 ID 로그인 진입점을 확인합니다.'),
('04_guide.png','raw/05_other.png','guide','로그인 없이 이용하는 기타조회','other','상단 기타조회 메뉴와 환율조회 등 세부 항목을 확인합니다.','필요한 항목으로 이동해 해당 화면의 조회 조건을 확인하세요.','기타조회 메뉴를 펼쳐 환율조회 등 별도 항목을 확인합니다.')]
def heading(id,title): return f'<h2 id="{id}"><a href="{url}">{title}</a></h2>'
def slot(i,it):
 name,raw,role,title,id,before,after,cap=it
 return f'''<p class="seo-text" id="{id}-intro">{before}</p>
<!-- IMAGE_SLOT:IMG_{i:02} START -->
<figure id="img-{i:02}" data-image-id="IMG_{i:02}" style="margin:20px 0; text-align:center;">
<img class="seo-image" src="{{{{BLOGGER_IMAGE_URL_IMG_{i:02}}}}}" alt="{cap}" style="max-width:100%; height:auto;" />
<figcaption style="font-size:16px; color:#718096;">{cap} (2026.11.13 PC 화면)</figcaption>
</figure>
<!-- IMAGE_SLOT:IMG_{i:02} END -->
<p class="seo-text" id="{id}-result">{after}</p>'''
source=f'<div class="box info" data-title="출처 및 확인 자료"><ul><li><a href="{url}">신한은행 간편조회서비스</a> (2026.11.13 확인)</li></ul></div>'
parts=['''<p class="seo-text">신한은행 간편조회는 계좌조회와 환율조회 등으로 이동할 수 있는 개인뱅킹 서비스입니다.<br />계좌조회 화면에는 인증서 또는 이용자 ID 로그인 수단이 표시되므로, 간편조회라는 이름만으로 누구나 인증 없이 잔액을 볼 수 있다고 생각하지 않는 것이 좋습니다.</p>
<div class="box info" data-title="핵심 요약"><ul><li>계좌조회는 본인에게 맞는 로그인 수단을 확인합니다.</li><li>기타조회와 대학등록금 납부를 제외한 조회, 법원업무는 공식 안내상 로그인 없이 이용할 수 있습니다.</li><li>이미지는 2026년 11월 13일 확인한 PC 웹 화면입니다.</li><li>로그인 이후 화면과 모바일 앱의 실제 절차는 확인하지 않았습니다.</li></ul></div>''',
heading('search','공식 경로 찾기'),
'<p class="seo-text">검색창에 신한은행 간편조회를 입력하거나 아래 공식 서비스로 이동합니다.<br />문자나 메신저로 받은 낯선 링크 대신 주소와 은행 이름을 직접 확인하세요.</p>',slot(1,items[0]),f'<a class="button" href="{url}" style="color:#ffffff;">신한은행 간편조회서비스 열기</a>',source,
heading('eligibility','이용 대상과 로그인 조건'),'<p class="seo-text">공식 안내는 인증서를 발급받은 인터넷뱅킹 고객, 인터넷뱅킹 회원, 개인회원의 이용 범위를 구분합니다.<br />각 유형에 계좌조회가 표시되며, 인증서 고객에게는 대학등록금 납부도 표시됩니다.<br />아이핀 회원은 개인회원 전환 후 계좌조회를 이용할 수 있다고 안내합니다.</p>',slot(2,items[1]),'<p class="seo-text">가입 여부가 불확실하다면 화면에 표시된 회원가입이나 은행의 안내를 먼저 살펴보세요.<br />가입과 전환의 세부 절차는 이번 조사에서 실행하지 않았습니다.</p>',source,
heading('account','PC에서 계좌조회하기'),'<p class="seo-text">간편조회서비스의 상단 또는 주요서비스에서 계좌조회를 선택합니다.<br />확인한 PC 화면에는 금융인증서, 공동인증서와 이용자 ID 로그인 영역이 나타납니다.</p>',slot(3,items[2]),'<p class="seo-text">아이디와 비밀번호 또는 인증서 비밀번호는 본인이 은행의 공식 화면에 직접 입력하세요.<br />로그인 후에는 은행이 제공하는 화면의 안내에 따라 본인 계좌와 거래내역을 확인합니다.<br />이번 조사에서는 로그인 이후 화면을 열지 않아 구체적인 메뉴나 추가 등록을 단정하지 않습니다.</p>',source,
heading('other','로그인 없이 이용하는 기타조회'),'<p class="seo-text">상단 기타조회를 열면 환율조회와 자기앞수표조회 등 별도 메뉴가 보입니다.<br />은행은 기타조회, 대학등록금 중 납부를 제외한 항목, 법원업무를 로그인 없이 이용할 수 있다고 안내합니다.</p>',slot(4,items[3]),'<p class="seo-text">로그인이 필요 없다는 안내와 별개로 각 서비스가 요구하는 조회 정보나 이용 조건은 해당 화면에서 확인해야 합니다.<br />계좌조회와 기타조회는 목적이 다르므로 필요한 항목을 골라 이동하세요.</p>',source,
heading('faq','자주 묻는 질문'),'''<div class="faq-container"><div class="faq-item"><div class="faq-question"><strong>아이디나 비밀번호를 잊었다면 어떻게 하나요?</strong></div><div class="faq-answer">로그인 영역 아래의 아이디 찾기와 비밀번호 재설정 안내를 확인하세요.<br />인증서 발급과 관리는 화면이 안내하는 신한은행 홈페이지 또는 앱에서 처리합니다.</div></div>
<div class="faq-item"><div class="faq-question"><strong>스마트폰에서도 화면이 똑같나요?</strong></div><div class="faq-answer">이 글의 이미지는 PC 웹 화면입니다.<br />모바일 앱의 실제 메뉴와 로그인 방식은 확인하지 않았으므로 현재 앱의 안내를 확인하세요.</div></div>
<div class="faq-item"><div class="faq-question"><strong>조회 화면을 다른 사람에게 보내도 되나요?</strong></div><div class="faq-answer">공유하기 전에 계좌번호와 잔액 등 개인 정보가 포함되어 있는지 확인하세요.</div></div></div>''',source]
body='\n'.join(parts)+'\n'
(base/(prefix+'_html콘텐츠.html')).write_text(body,encoding='utf-8')
metas=['신한은행 간편조회에서 계좌조회 로그인 방법과 회원별 이용 범위, 기타조회 메뉴를 확인하세요.','신한은행 간편조회 PC 화면을 기준으로 계좌조회 진입과 로그인 없이 이용할 수 있는 항목을 안내합니다.','신한은행 간편조회 공식 경로와 로그인 수단, 환율조회 등 기타조회 이용 전 확인할 내용을 정리했습니다.']
titles=['신한은행 간편조회 방법: 계좌조회 로그인과 이용 범위','신한은행 간편조회 계좌조회와 기타조회 이용 안내','신한은행 간편조회 로그인 방법과 회원별 조건','신한은행 간편조회 PC에서 계좌 확인하는 순서','신한은행 간편조회 환율조회와 계좌조회 차이','신한은행 간편조회 공식 서비스 이용 전 확인사항','신한은행 간편조회 아이디와 인증서 로그인 안내']
hooks=['계좌조회 전 로그인 수단부터 확인하세요','기타조회는 어떤 항목을 볼 수 있을까요?','공식 경로부터 PC 화면까지 살펴보세요','회원 구분에 따른 이용 범위를 확인하세요','인증서와 이용자 ID 진입점을 알아보세요','환율조회 메뉴를 찾는 순서를 정리했습니다','로그인이 어려울 때 확인할 경로를 살펴보세요']
root='26_1113/은행_재테크_신한은행 간편조회/웹조사/'
txt=f'''[작업 정보]
메인 키워드: 신한은행 간편조회
탭 / 대상 폴더: 은행_재테크 / 26_1113/은행_재테크_신한은행 간편조회
spreadsheetId / sheetId / 실제 행: 1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s / 1126487498 / 17
runId / threadId: 20261113-content-1401 / 01a1d34a-86df-7f93-809b-40e62ae16824
D열 반영·재조회: 조정자 전담, 미반영
입력: {root}publish/{prefix}_웹조사결과.md
조사 확인일 / 작성일: 2026-11-13 / 2026-11-13
HTML: {root}publish/{prefix}_html콘텐츠.html
TXT: {root}publish/{prefix}_제목메타디스크립션.txt
작업 상태: 파일 작성 / 이미지 미업로드 / 미발행
발행 전 확인: 현재 은행 화면 및 로그인 조건, Blogger 이미지 URL과 광고 설정 확인. 로그인 후와 모바일 앱은 미확인.

[콘텐츠 개요]
계좌조회는 어떤 로그인 수단이 필요한가? PC 공식 화면의 진입점과 회원별 범위를 설명합니다.
로그인 없이 무엇을 볼 수 있는가? 기타조회 등 공식 안내와 항목별 조건 확인을 안내합니다.

[제목 후보 7개]
최종 추천 제목: {titles[0]}
'''+''.join(f'{i}. {v}\n' for i,v in enumerate(titles,1))+'\n[후킹 문구 후보 7개]\n최종 추천: '+hooks[0]+'\n'+''.join(f'{i}. {v}\n' for i,v in enumerate(hooks,1))+'\n[메타디스크립션 후보 3개]\n최종 추천: '+metas[0]+'\n'+''.join(f'{i}. {v} (공백 포함 {len(v)}자)\n' for i,v in enumerate(metas,1))+'''\n[영문 퍼머링크 후보 3개]
최종 추천 슬러그: shinhan-easy-account-inquiry
1. shinhan-easy-account-inquiry
2. shinhan-bank-easy-lookup
3. shinhan-easy-banking-guide
한글 참고 문구: 신한은행 간편조회 방법
라벨 제안: 은행, 신한은행, 계좌조회

[Blogger 이미지 업로드 추천 순서와 삽입 위치]
채택 4개 / 보류 1개
대표 이미지 추천: IMG_03 / 02_guide.png / 계좌조회 로그인 수단을 보여줌
순서: IMG_01 검색 → IMG_02 이용 범위 → IMG_03 로그인 → IMG_04 기타조회. 조건을 먼저 설명하도록 원 조사 순서에서 02와 03을 교환함.
'''
for i,it in enumerate(items,1):
 name,raw,role,title,id,before,after,cap=it
 w,h=Image.open(base/name).size
 txt+=f'''
삽입 ID: IMG_{i:02} / 업로드·노출 순서: {i} / {i}
원본: {root}{raw} / 발행: {root}publish/{name}
원래 파일번호: {name[:2]} / 역할: {role} / 본문 절차 번호: 해당 없음 / 이미지 내부 표식 번호: {name[:2]} (캡션 번호, 절차 번호와 다름)
화면: PC 웹 / 설명: {cap}
소제목: {title} / id={id}
직전 문단: id={id}-intro / {before}
직후 문단: id={id}-result / {after}
HTML 위치: id=img-{i:02} / data-image-id=IMG_{i:02} / IMAGE_SLOT:IMG_{i:02}
치환 토큰: {{{{BLOGGER_IMAGE_URL_IMG_{i:02}}}}}
alt: {cap}
캡션: {cap} (2026.11.13 PC 화면)
크기: {w}×{h}px / 최대 너비 100%, 비율 유지
출처: S1 신한은행 간편조회서비스 / {url} / 2026-11-13
'''
 if i==1: txt+='검색 화면 URL: https://www.google.com/search?q=신한은행%20간편조회 / 실제 연 공식 결과: '+url+'\n'
 txt+='채택·편집: 조사 발행본의 빨간 테두리 및 화살표 확인; 검색본 계정 표시와 주소 가림. 화면과 글 내용 대조. 미업로드 / Blogger 이미지 URL 없음 / 확대 링크 없음.\n'
txt+=f'''\n[제외·보류 이미지]
{root}raw/04_account.png: 로그인 화면이 IMG_03과 중복되어 제외. 보완 필요 장면: 로그인 후 실제 계좌조회 화면과 모바일 앱 화면. 개인 인증이 필요해 확보하지 않음. 같은 키워드 raw와 공식 검색·PC 페이지를 확인했으며 채택 4개. 추후 본인 인증 가능한 담당자가 현재 화면을 확인한 뒤 추가.

[업로드 담당 에이전트 전달사항]
대상 블로그 미지정. 허용 작업: 파일 작성만. 이미지 업로드 후 ID별 실제 URL로 토큰을 치환하고 Blogger 미리보기 및 현재 광고 설정을 확인합니다. 미발행.
'''
(base/(prefix+'_제목메타디스크립션.txt')).write_text(txt,encoding='utf-8')
