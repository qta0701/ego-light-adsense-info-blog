from pathlib import Path
from html import escape

root = Path('26_1113/이슈_코레일 민원접수/웹조사')
pub = root / 'publish'
prefix = '이슈_코레일 민원접수'
official = 'https://info.korail.com/info/contents.do?key=818'
login = 'https://info.korail.com/mbs/www/jsp/voc/fe/login/NR_loginForm.do'
images = [
 ('01','01_search.png','raw/01_search.png','publish/01_search.png','search','검색 결과에서 한국철도 고객의 소리 공식 결과','Google 검색 결과 발췌, PC 웹','검색으로 공식 안내 찾기','find','검색 결과에서 한국철도 고객의 소리 공식 결과를 확인합니다.','공식 결과를 열면 고객의 소리 안내와 신청 경로를 확인할 수 있습니다.',780,99,'1','1','https://www.google.com/search?q=%EC%BD%94%EB%A0%88%EC%9D%BC%20%EB%AF%BC%EC%9B%90%EC%A0%91%EC%88%98','검색 결과를 잘라 URL과 계정 표시 제거, 빨간 테두리와 번호 추가'),
 ('02','02_guide.png','raw/02_voc.png','publish/02_guide.png','guide','고객의 소리 VOC 바로가기 버튼','한국철도공사 안내 페이지, PC 웹 발췌','안내 페이지에서 VOC 열기','voc','안내 페이지에서 고객의 소리(VOC) 바로가기 버튼을 선택합니다.','이 버튼은 신청과 결과 조회를 위한 로그인 화면으로 연결됩니다.',875,115,'2','2',official,'원본을 잘라 버튼에 빨간 테두리와 번호 추가'),
 ('03','04_guide.png','raw/05_auth_button.png','publish/04_guide.png','guide','비회원 휴대폰 본인인증 버튼과 고객센터 안내','VOC 로그인 페이지, PC 웹 발췌','로그인 또는 본인인증','auth','비회원은 로그인 화면의 휴대폰 본인인증 버튼을 확인합니다.','인증이 어렵다면 화면에 안내된 고객센터 1588-7788로 문의할 수 있습니다.',955,216,'4','3',login,'원본 발췌 후 버튼에 빨간 테두리와 번호 추가'),
 ('04','03_guide.png','raw/03_station.png','publish/03_guide.png','guide','가까운 역 방문과 접점 VOC 신청 안내','한국철도공사 안내 페이지, PC 웹 발췌','역에서 신청하기','station','역 방문 안내에는 개인정보 제공 동의서와 접점 VOC 신청서가 표시됩니다.','회신은 문자메시지, 이메일 또는 우편으로 받을 수 있습니다.',875,134,'3','해당 없음',official,'원본 발췌 후 안내 문구에 빨간 테두리와 번호 추가'),
 ('05','06_post_marked.png','raw/06_post.png','publish/blogger-images/06_post_marked.png','guide','서면 민원 우편 주소와 팩스 번호','한국철도공사 안내 페이지, PC 웹 발췌','우편 또는 팩스 보내기','post','서면 접수 안내의 주소와 팩스 번호를 발송 전에 확인합니다.','별도 회신 방법을 요청하지 않으면 처리 결과는 우편으로 회신됩니다.',875,275,'없음','해당 없음',official,'원본 발췌 후 주소와 팩스 번호에 빨간 테두리 추가')]

def slot(x):
 n, name, orig, path, role, alt, screen, heading, ident, before, after, w, h, marker, step, url, edit = x
 return f'''<h3 id="{ident}">{heading}</h3>
<p id="{ident}-intro" class="seo-text">{before}</p>
<!-- IMAGE_SLOT:IMG_{n} START -->
<div id="img-{n}" data-image-id="IMG_{n}" class="seo-image-container" style="margin: 24px 0; background: transparent;">
  <img src="{{{{BLOGGER_IMAGE_URL_IMG_{n}}}}}" alt="{alt}" class="seo-image" width="{w}" height="{h}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />
  <p class="seo-image-caption" style="font-size: 16px; line-height: 1.6;">{alt} (2026년 11월 13일 PC 웹 화면)</p>
</div>
<!-- IMAGE_SLOT:IMG_{n} END -->
<p id="{ident}-result" class="seo-text">{after}</p>'''

source = f'<div class="box info" data-title="출처 및 확인 자료"><ul><li><a href="{official}">한국철도공사 고객의소리 안내 및 신청</a> (2026-11-13 확인)</li><li><a href="{login}">고객의 소리 로그인</a> (2026-11-13 확인)</li></ul></div>'
html = f'''<p class="seo-text">코레일 민원접수는 어디에서 시작해야 할까요?</p>
<p class="seo-text">한국철도공사의 고객의 소리 안내에서 온라인 신청과 처리 결과 확인을 할 수 있고, 가까운 역이나 우편·팩스로도 의견을 낼 수 있습니다.</p>
<p class="seo-text">온라인 서비스는 회원 로그인 또는 비회원 휴대전화 인증이 필요합니다.</p>
<p class="seo-text">이 글은 2026년 11월 13일 확인한 공식 안내를 바탕으로 정리했습니다.</p>
<div class="box info" data-title="핵심 요약"><ul>
<li>온라인은 고객의 소리 안내 페이지에서 VOC 바로가기를 선택합니다.</li>
<li>회원 로그인 또는 비회원 휴대전화 인증 후 화면의 안내를 따릅니다.</li>
<li>가까운 역 방문과 우편·팩스 접수도 안내되어 있습니다.</li>
<li>발생 일시와 열차·역, 상황, 요청을 미리 정리하면 내용을 설명하기 쉽습니다.</li>
<li>처리 결과는 고객의 소리 홈페이지에서 확인할 수 있습니다.</li>
</ul></div>
<p>안내 경로와 본인 확인 조건을 먼저 확인하고 편한 접수 방법을 선택하세요.</p>
<a class="button3" href="{official}" style="color: #ffffff;">한국철도 고객의 소리 안내 열기</a>

<h2 id="online"><a href="{official}" style="text-decoration: none; color: inherit;">1. 온라인 민원접수 경로</a></h2>
<p class="seo-text">홈페이지에서는 고객참여 → 고객의소리 → 고객의소리 안내 및 신청 순서로 이동합니다.</p>
<p class="seo-text">검색을 이용할 때는 기관명과 주소가 한국철도공사의 공식 사이트인지 확인하세요.</p>
{slot(images[0])}
{slot(images[1])}
<p class="seo-text">공식 안내는 신청과 처리 결과 확인이 같은 고객의 소리 홈페이지에서 가능하다고 설명합니다.</p>
{source}

<h2 id="verify"><a href="{login}" style="text-decoration: none; color: inherit;">2. 본인확인과 내용 작성</a></h2>
<p class="seo-text">회원은 로그인 방법을 선택하고, 비회원은 휴대전화 본인인증을 진행합니다.</p>
{slot(images[2])}
<p class="seo-text">인증 후에는 서비스 화면의 안내에 따라 의견을 작성하고 제출하세요.</p>
<p class="seo-text">이번 확인은 인증 전 화면까지 이루어졌으므로 인증 후 입력 항목과 처리 기간은 확인하지 못했습니다.</p>
<p class="seo-text">발생 날짜와 시간, 열차 번호 또는 역 이름, 어떤 일이 있었는지, 원하는 답변을 구체적으로 정리하면 담당자가 상황을 이해하는 데 도움이 됩니다.</p>
<p class="seo-text">주민등록번호 등 접수에 필요하지 않은 민감정보는 본문에 적지 않도록 주의하세요.</p>
<div class="box info" data-title="작성 전 정리"><ul><li>언제: 이용 날짜와 대략적인 시간</li><li>어디서: 역명 또는 열차 번호와 이용 구간</li><li>무엇을: 발생한 상황과 확인을 바라는 내용</li><li>회신: 실제 화면에서 안내하는 방법 확인</li></ul></div>
{source}

<h2 id="offline"><a href="{official}" style="text-decoration: none; color: inherit;">3. 역 방문과 서면 접수</a></h2>
<p class="seo-text">온라인 본인확인이 어렵거나 서면으로 설명하고 싶다면 공식 안내에서 역 방문과 우편·팩스 방법을 살펴보세요.</p>
{slot(images[3])}
<p class="seo-text">방문 시 개인정보 제공 동의서와 접점 VOC 신청서를 작성하면 고객의 소리로 등록한다고 안내합니다.</p>
{slot(images[4])}
<p class="seo-text">확인 당시 우편 주소는 (우 34618) 대전광역시 동구 중앙로 240, 한국철도공사 여객사업본부 여객서비스처이고, 서면민원 팩스는 02-361-8208입니다.</p>
<p class="seo-text">서면민원을 신청하면 고객의 소리 신청에 필요한 개인정보 제공사항에 동의한 것으로 간주한다는 안내도 있습니다.</p>
<p class="seo-text">주소와 번호는 변경될 수 있으므로 보내기 직전 공식 페이지에서 다시 확인하세요.</p>
{source}

<h2 id="result"><a href="{official}" style="text-decoration: none; color: inherit;">4. 처리 결과와 자주 묻는 질문</a></h2>
<div class="faq-container">
<div class="faq-item"><div class="faq-question"><strong>Q. 접수 후 결과는 어디에서 보나요?</strong></div><div class="faq-answer">A. 공식 안내는 고객의 소리 홈페이지에서 신청과 처리 결과를 확인할 수 있다고 설명합니다.</div></div>
<div class="faq-item"><div class="faq-question"><strong>Q. 한국철도공사 소관이 아닌 내용도 접수하나요?</strong></div><div class="faq-answer">A. 공식 안내는 공사와 계열사 소관이 아닌 내용은 해당 기관의 민원 사이트 또는 국민신문고를 이용하도록 안내합니다.</div></div>
<div class="faq-item"><div class="faq-question"><strong>Q. 휴대전화 인증이 되지 않으면 어떻게 하나요?</strong></div><div class="faq-answer">A. 로그인 화면에 표시된 고객센터 1588-7788로 문의하거나 역 방문·서면 경로를 확인하세요.</div></div>
</div>
<p class="seo-text">실제 민원은 제출하지 않았으며, 인증 이후의 화면과 처리 소요기간은 이 글에서 확인하지 않았습니다.</p>
{source}
<p>신청 전 안내와 회신 방법을 다시 확인해 본인에게 맞는 경로로 진행하세요.</p>
<a class="button3" href="{official}" style="color: #ffffff;">공식 접수 안내 확인하기</a>
'''

titles = ['코레일 민원접수 방법 온라인 고객의 소리와 역 방문 안내','코레일 민원접수 어디서 하나요? 온라인 신청과 결과 조회','코레일 민원접수 본인인증부터 고객의 소리 신청까지','코레일 민원접수 방법 역 방문과 우편·팩스 정리','코레일 민원접수 고객의 소리 로그인과 비회원 인증','코레일 민원접수 준비할 내용과 공식 접수 경로','코레일 민원접수 온라인·서면 신청 전 확인사항']
hooks = ['온라인과 역 방문 중 편한 방법을 확인하세요','고객의 소리 신청과 조회 경로를 한눈에','휴대전화 인증이 어려울 때의 안내도 확인하세요','서면 민원 주소와 팩스 번호를 살펴보세요','내용 작성 전에 발생 일시와 장소를 정리하세요','처리 결과를 확인할 공식 경로를 알아보세요','코레일 소관이 아닌 민원의 안내도 확인하세요']
metas = ['코레일 민원접수 온라인 신청과 고객의 소리 조회, 본인인증, 역 방문 및 우편·팩스 접수 방법 안내','코레일 민원접수 경로와 비회원 인증, 역 방문 신청, 서면 주소와 처리 결과 확인 방법','코레일 민원접수 전 준비할 내용과 고객의 소리 공식 신청·조회, 역 방문과 서면 접수 안내']
slugs = ['korail-customer-complaint','korail-voc-application','korail-complaint-guide']
lines = [f'''[작업 정보]
메인 키워드: 코레일 민원접수
탭 / 대상 폴더: 이슈 / 26_1113/이슈_코레일 민원접수
spreadsheetId / sheetId / 실제 시트 행 번호: 1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s / 448262533 / 31
runId / threadId / 조정자: 20261113-content-1401 / 01a1d348-e830-7a62-9499-5215cf2d9bf7 / 01a1d345-0d73-7df1-8b43-f616fa4804bb
작성 완료 열(D)의 반영·재조회 상태: 미반영, 조정자 전담
입력 웹조사 Markdown: 26_1113/이슈_코레일 민원접수/웹조사/publish/이슈_코레일 민원접수_웹조사결과.md
조사 확인일 / 콘텐츠 작성일: 2026-11-13 / 2026-11-13
HTML 파일 / TXT 파일: 26_1113/이슈_코레일 민원접수/웹조사/publish/{prefix}_html콘텐츠.html / 26_1113/이슈_코레일 민원접수/웹조사/publish/{prefix}_제목메타디스크립션.txt
작업 상태: 파일 작성 완료 / 이미지 미업로드 / 미발행
발행 전 확인할 사실·이미지·광고 설정: 공식 안내의 주소·번호·인증 절차를 재확인하고 실제 Blogger 테마 및 광고 설정 확인. 광고 ID 미지정으로 광고 코드 미삽입.

[콘텐츠 개요]
한국철도 고객의 소리를 통한 온라인 민원 신청과 결과 확인 경로를 안내합니다.
본인확인 전까지의 화면과 역 방문·우편·팩스 대안을 정리합니다.

[제목 후보 7개]
최종 추천 제목: {titles[0]}
''' + '\n'.join(f'{i}. {v}' for i,v in enumerate(titles,1)), '[후킹 문구 후보 7개]\n최종 추천: '+hooks[0]+'\n'+'\n'.join(f'{i}. {v}' for i,v in enumerate(hooks,1)), '[메타디스크립션 후보 3개]\n최종 추천 메타디스크립션: '+metas[0]+'\n'+'\n'.join(f'{i}. {v} (공백 포함 {len(v)}자)' for i,v in enumerate(metas,1)), '[영문 퍼머링크 후보 3개]\n최종 추천 슬러그: '+slugs[0]+'\n'+'\n'.join(f'{i}. {v}' for i,v in enumerate(slugs,1))+'\n한글 참고 문구: 코레일 민원접수 방법\n라벨 제안: 생활정보, 철도', '[Blogger 이미지 업로드 추천 순서와 삽입 위치]\n채택 이미지 5개 / 제외·보류 1개\n대표 이미지 추천: IMG_02 / 02_guide.png / 공식 VOC 진입 버튼을 가장 직접적으로 설명\n업로드 순서: IMG_01 → IMG_02 → IMG_03 → IMG_04 → IMG_05. 검색 → 온라인 진입 → 인증 → 역 방문 → 서면 순서로 조정.']
for x in images:
 n,name,orig,path,role,alt,screen,heading,ident,before,after,w,h,marker,step,url,edit=x
 lines.append(f'''삽입 ID: IMG_{n}
추천 업로드 순서 / 본문 노출 순서: {int(n)} / {int(n)}
원래 파일번호 / 정확한 이미지 파일명: {Path(orig).name} / {name}
원본 / 업로드 파일 경로: 26_1113/이슈_코레일 민원접수/웹조사/{orig} / 26_1113/이슈_코레일 민원접수/웹조사/{path}
이미지 내부 표식 번호 / 본문 절차 번호: {marker} / {step}
역할: {role}
설명 / 실제 화면 종류: {alt} / {screen}
삽입 소제목: {heading} / id={ident}
직전 문단: id={ident}-intro / {before}
직후 문단: id={ident}-result / {after}
HTML 위치: id=img-{n} / data-image-id=IMG_{n} / IMAGE_SLOT:IMG_{n}
치환 토큰: {{{{BLOGGER_IMAGE_URL_IMG_{n}}}}}
권장 alt: {alt}
권장 캡션: {alt} (2026년 11월 13일 PC 웹 화면)
실제 이미지 크기 / 표시 원칙: {w}×{h}px / 가로 100% 이내, 비율 유지
출처 / 실제 화면 URL / 확인일: {'Google 검색 / 한국철도공사' if n=='01' else '한국철도공사'} / {url} / 2026-11-13
{'실제 연 공식 결과 URL: '+official if n=='01' else '실제 연 공식 결과 URL: 해당 없음'}
가림·가독성 검수: {edit}; 개인정보 노출 없음, 모바일의 작은 글씨는 본문으로 보완
원래 순서와 달라진 이유: 온라인 인증을 역 방문보다 먼저 배치해 접수 경로별 흐름 유지
업로드 상태 / Blogger 이미지 URL / 확대 링크 URL: 미업로드 / 미업로드 / 없음''')
lines.append('''[제외·보류 이미지]
26_1113/이슈_코레일 민원접수/웹조사/raw/04_auth.png / 본인인증 버튼이 잘려 05_auth_button.png로 대체 / 추가 보완 없음
인증 이후 접수 화면은 본인인증 전까지 조사하여 미확보. 실제 인증 후 화면을 이용할 수 있을 때 재확인 가능.

[업로드 담당 에이전트 전달사항]
대상 블로그·글 식별 정보: 지정되지 않음
허용 작업: 파일만 작성
제목·메타·슬러그·라벨: 위 최종 추천값 참고
남은 작업: 이미지 업로드 → ID별 실제 URL 매핑 → HTML 치환 → 실제 Blogger 모바일·PC 미리보기 → 별도 요청 범위에 따른 저장 또는 발행
저장 또는 발행 후 실제 글 URL·상태·확인 시각: 미수행
spaceId / blogId / postId / editorUrl: 미지정
실제 발행 시각과 확인 근거: 미발행
초안 저장 열(G) / 게시 링크 열(H) / 발행 시각 열(L): 미반영
로컬 blogger-state.json: 없음

[검수 결과]
파일·이미지·사실·순서·ID·토큰·alt·캡션: 확인 완료
모바일/PC 미리보기: 로컬 미리보기 확인 결과는 아래에 기록
미해결 사항: 인증 이후 화면 미확인, 실제 Blogger 테마와 업로드 이미지 URL 미확인''')

html_path = pub / (prefix+'_html콘텐츠.html')
txt_path = pub / (prefix+'_제목메타디스크립션.txt')
with html_path.open('x',encoding='utf-8',newline='\n') as f: f.write(html)
with txt_path.open('x',encoding='utf-8',newline='\n') as f: f.write('\n\n'.join(lines)+'\n')
print('HTML lines',len(html.splitlines()),'H2',html.count('<h2 '),'TXT lines',len(('\n\n'.join(lines)).splitlines()))
