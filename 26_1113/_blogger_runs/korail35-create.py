from pathlib import Path
from PIL import Image, ImageDraw
import html

root = Path('26_1113/노하우_코레일 승차권 조회/웹조사')
pub = root / 'publish'
out = pub / 'blogger-images'
out.mkdir(exist_ok=True)
im = Image.open(root / 'raw/08_main_entry.png').convert('RGB')
im = im.crop((1085, 190, 1410, 500))
ImageDraw.Draw(im).rectangle((67, 91, 279, 129), outline='#f01624', width=5)
im.save(out / '08_main_entry_marked.png')

base='26_1113/노하우_코레일 승차권 조회/웹조사/'
images=[
 dict(id='01',file='01_01_search.png',raw='01_search.png',role='search',section='공식 사이트에서 승차권 확인으로 이동',sid='entry',pre='entry-search-intro',before='검색 결과에서 코레일 공식 주소와 결과 제목을 확인합니다.',post='entry-search-result',after='검색 결과의 표시 순서는 달라질 수 있으므로 주소도 함께 확인하세요.',alt='코레일 승차권 확인 로그인 공식 검색 결과',caption='검색 결과에서 공식 코레일 주소를 확인합니다. 2026년 11월 13일 검색 화면입니다.',size=(730,170),source='Google 검색 결과',url='https://www.google.com/search?q=%EC%BD%94%EB%A0%88%EC%9D%BC%20%EC%8A%B9%EC%B0%A8%EA%B6%8C%20%EC%A1%B0%ED%9A%8C',reason='공식 결과 제목과 주소에 빨간 테두리; 원본에서 자름',official='https://www.korail.com/ticket/myticket/list'),
 dict(id='02',file='blogger-images/08_main_entry_marked.png',raw='08_main_entry.png',role='guide',section='공식 사이트에서 승차권 확인으로 이동',sid='entry',pre='entry-main-intro',before='코레일 승차권예매 메인의 바로가기에서 승차권 확인을 선택합니다.',post='entry-main-result',after='출발역과 도착역을 입력하는 열차 조회는 새 열차를 찾는 영역입니다.',alt='코레일 승차권예매 메인 바로가기의 승차권 확인 메뉴',caption='메인 화면의 승차권 확인 바로가기입니다. 2026년 11월 13일 PC 웹 화면입니다.',size=(325,310),source='코레일 승차권예매 메인',url='https://www.korail.com/ticket/main',reason='새 캡처의 바로가기 영역을 자르고 승차권 확인에 빨간 테두리 추가'),
 dict(id='03',file='02_02_login.png',raw='02_login.png',role='guide',section='회원으로 예매한 승차권 확인',sid='member',pre='member-intro',before='회원 승차권 확인에 들어가면 회원번호, 이메일 주소 또는 휴대폰 번호 탭이 있는 로그인 화면이 표시됩니다.',post='member-result',after='예매에 사용한 계정으로 로그인해 승차권 확인을 이어갑니다.',alt='코레일 회원번호 이메일 휴대폰 번호 로그인 선택 화면',caption='회원 로그인 화면에서 이용할 로그인 방식을 선택합니다. 2026년 11월 13일 PC 웹 화면입니다.',size=(1085,460),source='코레일 회원 승차권 확인 로그인',url='https://www.korail.com/ticket/login?hiddenTabNms=nonMember&redirectUrl=/ticket/myticket/list',reason='회원번호 로그인 안내에 빨간 테두리; 원본에서 자름'),
 dict(id='04',file='03_06_method_clean.png',raw='06_method_clean.png',role='guide',section='비회원 예매 방식에 맞춰 확인',sid='nonmember',pre='nonmember-method-intro',before='비회원 승차권 확인 화면에서는 간편인증과 기존 비회원 승차권 확인 중 예매할 때 사용한 방식을 선택합니다.',post='nonmember-method-result',after='간편인증으로 예매한 승차권은 간편인증으로만 조회할 수 있습니다.',alt='코레일 비회원 간편인증과 기존 비회원 승차권 확인 선택 화면',caption='비회원 확인 방식 선택 화면입니다. 빨간 테두리는 기존 비회원 확인을 가리킵니다. 2026년 11월 13일 PC 웹 화면입니다.',size=(740,355),source='코레일 비회원 확인 방식',url='https://www.korail.com/ticket/reserve/nonmember/check/menu',reason='기존 비회원 확인에 빨간 테두리; 원본에서 자름'),
 dict(id='05',file='04_07_form_clean.png',raw='07_form_clean.png',role='guide',section='비회원 예매 방식에 맞춰 확인',sid='nonmember',pre='nonmember-form-intro',before='기존 비회원 확인 화면에는 이름, 휴대폰 번호, 비밀번호 5자리 입력란이 있습니다.',post='nonmember-form-result',after='휴대폰 번호는 화면 안내대로 하이픈을 빼고 입력한 뒤 비회원 승차권 확인을 누릅니다.',alt='코레일 기존 비회원 승차권 확인의 이름 휴대폰 번호 비밀번호 입력란',caption='기존 비회원 승차권 확인 입력란입니다. 2026년 11월 13일 PC 웹 화면입니다.',size=(1005,385),source='코레일 기존 비회원 승차권 확인',url='https://www.korail.com/ticket/reserve/nonmember/check',reason='입력란에 빨간 테두리; 원본에서 자름')]

def slot(d):
 n=d['id']; w,h=d['size']
 return f'''<p id="{d['pre']}" class="seo-text">{d['before']}</p>
<!-- IMAGE_SLOT:IMG_{n} START -->
<div id="img-{n}" data-image-id="IMG_{n}" class="seo-image-container" style="margin: 24px 0; background: transparent;">
  <img src="{{{{BLOGGER_IMAGE_URL_IMG_{n}}}}}" alt="{d['alt']}" class="seo-image" width="{w}" height="{h}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
  <p class="seo-image-caption" style="font-size: 16px; line-height: 1.6;">{d['caption']}</p>
</div>
<!-- IMAGE_SLOT:IMG_{n} END -->
<p id="{d['post']}" class="seo-text">{d['after']}</p>'''

def sources(items):
 return '<div class="box info" data-title="출처 및 확인 자료"><ul>' + ''.join(f'<li><a href="{html.escape(url,quote=True)}">{name}</a> · 2026-11-13 확인</li>' for name,url in items) + '</ul></div>'
main='https://www.korail.com/ticket/main'; member='https://www.korail.com/ticket/myticket/list'; non='https://www.korail.com/ticket/reserve/nonmember/check/menu'; form='https://www.korail.com/ticket/reserve/nonmember/check'; helpurl='https://www.korail.com/ticket/guest/csc'
body=f'''<p class="seo-text">코레일 승차권 조회는 예매 당시 회원으로 로그인했는지, 비회원으로 예매했는지에 따라 시작하는 곳이 다릅니다. 이미 구매한 표를 확인하려면 코레일 승차권예매의 <strong>승차권 확인</strong>으로 이동하세요. 비회원이라면 예매에 사용한 인증 방식을 먼저 확인하는 것이 중요합니다.</p>
<div class="box info" data-title="핵심 요약"><ul>
<li>회원 예매: 승차권 확인으로 이동해 예매에 사용한 계정으로 로그인합니다.</li>
<li>비회원 예매: 간편인증 또는 기존 비회원 확인을 선택합니다.</li>
<li>간편인증 예매분은 간편인증으로만 조회합니다.</li>
<li>기존 비회원 확인에는 이름, 휴대폰 번호, 비밀번호 5자리가 필요합니다.</li>
</ul></div>
<p>아래 공식 화면은 2026년 11월 13일 확인한 PC 웹 기준입니다. 로그인이나 본인 인증 이후의 실제 승차권 화면은 확인하지 않았습니다.</p>
<div class="button-container"><a class="button3" href="{member}" style="color: #ffffff;">회원 승차권 확인으로 이동</a></div>
<div class="button-container"><a class="button2" href="{non}" style="color: #ffffff;">비회원 승차권 확인으로 이동</a></div>

<br /><br /><h2 id="entry"><a href="{main}">공식 사이트에서 승차권 확인으로 이동</a></h2>
<p>검색으로 접속한다면 코레일 공식 결과를 확인하고 승차권예매 사이트로 이동합니다. 직접 주소를 입력하거나 공식 링크를 이용해도 됩니다.</p>
{slot(images[0])}
{slot(images[1])}
<p>기존 표 확인, 예약승차권 조회·취소, 이용내역·영수증 조회는 메뉴 이름이 서로 다릅니다. 필요한 업무에 맞는 항목을 선택하세요.</p>
{sources([('코레일 승차권예매 메인',main),('코레일 회원 승차권 확인',member)])}

<br /><br /><h2 id="member"><a href="{member}">회원으로 예매한 승차권 확인</a></h2>
<p>회원으로 예매했다면 승차권 확인 메뉴에서 로그인을 진행합니다. 화면에서 회원번호, 이메일 주소, 휴대폰 번호 중 제공되는 방식을 고를 수 있습니다.</p>
{slot(images[2])}
<p>회원번호나 비밀번호가 기억나지 않으면 로그인 화면의 회원번호 찾기 또는 비밀번호 찾기를 이용하세요. 화면에는 로그인 5회 실패 시 로그인할 수 없다는 안내가 있으므로 계정 정보를 반복해 추측하지 않는 편이 좋습니다.</p>
<p>이 조사는 로그인 전 화면까지 확인한 것으로, 로그인 후 목록의 구성과 실제 승차권 표시는 확인하지 않았습니다.</p>
{sources([('코레일 회원 승차권 확인',member)])}

<br /><br /><h2 id="nonmember"><a href="{non}">비회원 예매 방식에 맞춰 확인</a></h2>
<p>비회원으로 예매했다면 <a href="{non}" style="color:#1b1bf8;"><strong>코레일 비회원 승차권 확인</strong></a>에서 인증 방식을 고릅니다. 표시된 선택지는 간편인증과 기존 비회원 승차권 확인입니다.</p>
{slot(images[3])}
<p>간편인증으로 예매한 경우 기존 비회원 입력 화면에서는 조회되지 않습니다. 이전 선택 화면에서 간편인증을 선택해 안내를 따르세요.</p>
{slot(images[4])}
<p>전달받은 승차권의 비밀번호 5자리는 코레일 알림톡이나 문자메시지를 확인하라는 안내가 있습니다. 본인 인증과 실제 조회 결과는 이번 조사에서 확인하지 않았습니다.</p>
{sources([('코레일 비회원 확인 방식',non),('코레일 기존 비회원 승차권 확인',form)])}

<br /><br /><h2 id="troubleshooting"><a href="{helpurl}">조회가 되지 않을 때 확인할 점</a></h2>
<div class="table-responsive"><table><thead><tr><th>상황</th><th>먼저 확인할 내용</th></tr></thead><tbody>
<tr><td>회원 로그인이 안 됨</td><td>예매한 계정인지, 회원번호·비밀번호 찾기가 필요한지 확인</td></tr>
<tr><td>비회원 표가 보이지 않음</td><td>간편인증 예매 여부와 선택한 확인 방식 확인</td></tr>
<tr><td>전달받은 표의 비밀번호가 기억나지 않음</td><td>코레일 알림톡 또는 문자메시지 확인</td></tr>
</tbody></table></div>
<p>입력 정보와 예매 방식을 다시 확인해도 해결되지 않으면 <a href="{helpurl}" style="color:#1b1bf8;"><strong>코레일 고객센터</strong></a> 또는 대표전화 1588-7788을 이용하세요. 화면과 메뉴는 변경될 수 있으므로 접속한 시점의 공식 안내를 따르는 것이 좋습니다.</p>
{sources([('코레일 고객센터',helpurl),('코레일 기존 비회원 승차권 확인',form)])}
'''
htmlpath=pub/'노하우_코레일 승차권 조회_html콘텐츠.html'
txtpath=pub/'노하우_코레일 승차권 조회_제목메타디스크립션.txt'
if htmlpath.exists() or txtpath.exists(): raise SystemExit('existing output: stop')
htmlpath.write_text(body,encoding='utf-8')
titles=['코레일 승차권 조회 방법: 회원·비회원 확인 경로','코레일 승차권 조회, 예매한 표 확인하는 방법','코레일 승차권 조회 비회원 인증과 회원 로그인 안내','코레일 승차권 조회 안 될 때 확인할 사항','코레일 승차권 조회와 비회원 비밀번호 확인 방법','코레일 승차권 조회 공식 웹사이트 이용 순서','코레일 승차권 조회 간편인증과 기존 비회원 차이']
hooks=['회원과 비회원의 확인 경로부터 살펴보세요.','예매한 방식에 맞는 인증을 선택하세요.','이미 구매한 표는 승차권 확인 메뉴에서 찾습니다.','간편인증 예매분의 조회 조건을 확인하세요.','기존 비회원 확인에 필요한 정보를 정리했습니다.','조회가 안 될 때 확인할 항목을 살펴보세요.','전달받은 표의 비밀번호 안내를 확인하세요.']
metas=['코레일 승차권 조회 방법을 회원과 비회원으로 나눠 안내합니다. 간편인증과 기존 비회원 확인 조건도 확인하세요.','코레일 공식 웹에서 예매한 승차권을 확인하는 경로와 비회원 인증에 필요한 정보를 정리했습니다.','코레일 승차권 확인 메뉴부터 회원 로그인, 비회원 인증 선택과 조회가 안 될 때 확인할 사항까지 알아보세요.']
slugs=['korail-ticket-check','korail-ticket-lookup','korail-nonmember-ticket-check']
txt=f'''[작업 정보]
메인 키워드: 코레일 승차권 조회
탭 / 대상 폴더: 노하우 / 26_1113/노하우_코레일 승차권 조회
spreadsheetId / sheetId / 실제 시트 행 번호: 1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s / 799022458 / 35
runId / 담당 독립 채팅 threadId / 조정자: 20261113-content-1401 / 01a1d349-6c44-76a2-8624-43bbf100ae94 / 원 요청 채팅
작성 완료 열(D)의 반영·재조회 상태: 조정자 처리 대기 (배정 당시 빈 셀)
입력 웹조사 Markdown: {base}publish/노하우_코레일 승차권 조회_웹조사결과.md
조사 확인일 / 콘텐츠 작성일: 2026-11-13 / 2026-11-13
HTML 파일 / TXT 파일: {base}publish/{htmlpath.name} / {base}publish/{txtpath.name}
작업 상태: 파일 작성 완료 / 이미지 미업로드 / 미발행
발행 전 확인할 사실·이미지·광고 설정: 공식 화면과 인증 방식 변경 여부, 이미지 URL 치환, 대상 블로그 광고·제휴 설정 확인.

[콘텐츠 개요]
회원과 비회원이 이미 예매한 승차권을 어디서 확인하는지 안내합니다.
비회원의 인증 방식과 입력 항목, 조회가 어려울 때의 확인 사항을 설명합니다.

[제목 후보 7개]
최종 추천 제목: {titles[0]}
'''+ '\n'.join(f'{i}. {s}' for i,s in enumerate(titles,1))+'\n\n[후킹 문구 후보 7개]\n최종 추천: '+hooks[0]+'\n'+ '\n'.join(f'{i}. {s}' for i,s in enumerate(hooks,1))+'\n\n[메타디스크립션 후보 3개]\n최종 추천 메타디스크립션: '+metas[0]+'\n'+'\n'.join(f'{i}. {s} (공백 포함 {len(s)}자)' for i,s in enumerate(metas,1))+'\n\n[영문 퍼머링크 후보 3개]\n최종 추천 슬러그: '+slugs[0]+'\n'+'\n'.join(f'{i}. {s}' for i,s in enumerate(slugs,1))+'''\n한글 참고 문구: 코레일-승차권-조회-회원-비회원 (실제 설정용 아님)
라벨 제안: 코레일, 승차권, 생활정보

[Blogger 이미지 업로드 추천 순서와 삽입 위치]
채택 이미지 5개 / 제외·보류 원본 3개
대표 이미지 추천: IMG_02 / 08_main_entry_marked.png / 공식 확인 메뉴를 직접 보여줌. 첫 이미지의 대표 적용 여부는 테마에서 확인.
업로드 순서: IMG_01 → IMG_02 → IMG_03 → IMG_04 → IMG_05. 검색 → 공식 진입 → 회원 → 비회원 방식 → 기존 비회원 입력 순서.
'''
for i,d in enumerate(images,1):
 n=d['id']; w,h=d['size']
 txt+=f'''
삽입 ID: IMG_{n}
추천 업로드 순서 / 본문 노출 순서: {i} / {i}
원본 파일번호 / 원본 파일: {d['raw'][:2]} / {base}raw/{d['raw']}
업로드 파일: {base}publish/{d['file']}
이미지 내부 표식 번호 / 본문 절차 번호: 해당 없음 / 해당 없음 (빨간 테두리 강조)
역할 / 화면 종류: {d['role']} / {'Google 검색 PC 웹' if i==1 else '코레일 PC 웹'}
설명 및 채택 사유 / 편집: {d['reason']}
삽입 소제목: H2 {d['section']} / id={d['sid']}
직전 문단: id={d['pre']} / {d['before']}
직후 문단: id={d['post']} / {d['after']}
HTML 위치: id=img-{n} / data-image-id=IMG_{n} / IMAGE_SLOT:IMG_{n} START·END
치환 토큰: {{{{BLOGGER_IMAGE_URL_IMG_{n}}}}}
권장 alt: {d['alt']}
권장 캡션: {d['caption']}
실제 이미지 크기 / 표시 원칙: {w}×{h}px / 가로 100% 이내, 비율 유지
출처명 / 실제 화면 URL / 확인일: {d['source']} / {d['url']} / 2026-11-13
검색 결과에서 실제 연 공식 URL: {d.get('official','해당 없음')}
가림·가독성 검수: 개인정보 없음, 표식 및 화면 내용을 확인함. 모바일에서는 작은 화면 문구를 본문으로도 제공.
원래 순서와 변경 사유: {'추가한 메인 진입 화면을 검색 결과와 로그인 사이에 배치' if i==2 else '기존 순서 유지'}
업로드 상태 / Blogger 이미지 URL / 확대 링크 URL: 미업로드 / 미업로드 / 없음
'''
txt+=f'''
[제외·보류 이미지]
{base}raw/03_nonmember.png, 04_inputs.png, 05_method.png: 팝업이 대상 화면을 가려 제외. 각각 07·06 깨끗한 캡처로 대체.
추가 조사: Google 검색과 코레일 공식 메인을 확인해 IMG_02를 보강. 실제 로그인·인증 후 승차권과 앱 화면은 미확인으로 보류. 필요 시 본인 인증이 가능한 담당자가 해당 장면을 확인한 뒤 개인정보를 가리고 보강.

[업로드 담당 에이전트 전달사항]
대상 블로그·글 식별 정보: 지정되지 않음
허용 작업: 파일만 작성. 이미지 업로드·Blogger 초안·발행은 별도 요청 필요.
제목·메타·슬러그·라벨: 위 추천값 참고. 이미지 업로드 후 ID별 실제 URL로 토큰 치환, 테마 미리보기 확인.
현재 완료 단계 / 남은 작업 / 재개 지점: 원고 작성·로컬 검수 / 이미지 업로드 및 Blogger 편집 / IMG_01부터 업로드.
저장 또는 발행 후 글 URL·상태·확인 시각: 미수행
spaceId / blogId / postId / editorUrl: 미지정
실제 발행 시각 및 근거: 미발행
G/H/L 반영·재조회 상태: 미수행
로컬 blogger-state.json: 없음

[검수 결과]
파일·UTF-8·사실·순서·이미지·ID·토큰·alt·캡션: 검수 후 기록 예정.
모바일/PC 미리보기: 검수 후 기록 예정. 실제 Blogger 테마 미리보기 미실행.
미해결 사항: 실제 계정 로그인·인증 후 화면과 앱 미확인, 대상 블로그 광고 설정 미확인.
'''
txtpath.write_text(txt,encoding='utf-8')
print('HTML lines:',len(body.splitlines()),'H2:',body.count('<h2 '),'images:',len(images))
