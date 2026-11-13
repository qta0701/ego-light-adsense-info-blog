from pathlib import Path
from html import escape
import shutil

root = Path.cwd()
base = root / '26_1113/노하우2_인스타그램 탈퇴방법/웹조사'
pub = base / 'publish'
extra = pub / 'blogger-images'
extra.mkdir(exist_ok=True)
shutil.copyfile(base / 'raw/08_android.png', extra / '08_android.png')
official = 'https://help.instagram.com/370452623149242/?helpref=hc_fnav&locale=ko_KR'
android = 'https://help.instagram.com/139886812848894/?cms_platform=android-app&helpref=platform_switcher&locale=ko_KR'
export = 'https://help.instagram.com/181231772500920?helpref=faq_content'
pause = 'https://help.instagram.com/728869160569983?helpref=faq_content'
login = 'https://help.instagram.com/374546259294234/?helpref=faq_content'
items = [
 dict(n=1, file='02_02_export.png', raw='02_export.png', h='삭제 전 정보 보관과 계정 확인', hid='prepare', pre='저장할 사진이나 게시물이 있다면 삭제 전에 정보 사본을 내보내세요.', post='삭제 후에는 Instagram의 정보 내보내기 도구에 접근할 수 없습니다.', alt='인스타그램 탈퇴방법 중 정보 사본 내보내기를 안내하는 공식 고객센터 화면', cap='삭제 전 정보 사본 내보내기 안내입니다. 2026년 11월 13일 확인한 PC 고객센터 화면입니다.', w=1280,hgt=1056, source=official, mark='빨간 테두리와 화살표, 원 안 숫자 1', role='guide'),
 dict(n=2, file='blogger-images/08_android.png', raw='08_android.png', h='Android 사용자와 접속 경로', hid='android', pre='Android 도움말에는 컴퓨터나 모바일 브라우저의 Instagram.com으로 이동하라는 안내가 표시됩니다.', post='같은 도움말에 앱 메뉴 절차도 함께 표시되므로 실제 계정에서 보이는 안내를 확인하세요.', alt='Android 도움말에서 브라우저로 이동하라는 문구를 강조한 공식 고객센터 화면', cap='Android 도움말의 브라우저 이동 안내입니다. 2026년 11월 13일 확인한 고객센터 화면입니다.', w=1280,hgt=1000, source=android, mark='빨간 테두리, 번호 없음', role='reference'),
 dict(n=3, file='03_03_manage.png', raw='03_manage.png', h='계정 관리가 표시될 때', hid='manage', pre='계정 센터 하단에 계정 관리가 보이면 공식 도움말의 첫 번째 경로를 따릅니다.', post='마지막 확인 전에 선택한 프로필이 삭제하려는 계정인지 다시 확인하세요.', alt='계정 관리가 표시될 때의 인스타그램 프로필 삭제 절차를 강조한 PC 도움말', cap='계정 관리가 표시되는 경우의 PC 도움말 절차입니다. 2026년 11월 13일 확인했습니다.', w=1280,hgt=1056, source=official, mark='빨간 테두리와 화살표, 원 안 숫자 1', role='guide'),
 dict(n=4, file='04_04_account.png', raw='04_account.png', h='계정이 표시될 때', hid='account', pre='계정 센터 하단에 계정이 보이면 개인정보와 계정 소유권 및 관리로 들어갑니다.', post='비활성화 또는 삭제에서 대상을 선택한 뒤 계정 삭제와 계속을 선택하고 화면의 안내를 확인하세요.', alt='계정이 표시될 때 개인정보와 계정 소유권 및 관리로 이동하는 PC 도움말', cap='계정이 표시되는 경우의 PC 도움말 절차입니다. 2026년 11월 13일 확인했습니다.', w=1280,hgt=1056, source=official, mark='빨간 테두리와 화살표, 원 안 숫자 1', role='guide'),
 dict(n=5, file='05_05_wait.png', raw='05_wait.png', h='삭제 요청 뒤 기간과 주의사항', hid='wait', pre='공식 도움말은 삭제 요청 후 30일이 지나면 프로필과 정보를 가져올 수 없다고 설명합니다.', post='삭제 취소 가능 기간은 지역별로 다르므로 요청 화면에 표시된 기한을 확인하세요.', alt='삭제 요청 후 30일과 지역별 취소 기간을 설명하는 PC 고객센터 화면', cap='삭제 요청 이후 기간에 관한 PC 고객센터 안내입니다. 2026년 11월 13일 확인했습니다.', w=1280,hgt=1056, source=official, mark='빨간 테두리와 화살표, 원 안 숫자 1', role='reference'),
]
def a(url, label): return f'<a href="{escape(url, quote=True)}" style="color:#1b1bf8;text-decoration:underline;font-weight:700;"><strong>{label}</strong></a>'
def h2(id, label, url): return f'<h2 id="{id}"><a href="{escape(url, quote=True)}">{label}</a></h2>'
def source(url, label): return f'<div class="box info" data-title="출처 및 확인 자료"><ul><li>{a(url,label)} · 2026년 11월 13일 확인</li></ul></div>'
def img(i):
 n=i['n']; s=f'{n:02}'; return f'''<p id="{i['hid']}-intro">{i['pre']}</p>
<!-- IMAGE_SLOT:IMG_{s} START -->
<div id="img-{s}" data-image-id="IMG_{s}" class="seo-image-container" style="margin:24px 0;background:transparent;">
  <img src="{{{{BLOGGER_IMAGE_URL_IMG_{s}}}}}" alt="{i['alt']}" class="seo-image" width="{i['w']}" height="{i['hgt']}" style="max-width:100%;height:auto;display:block;margin:0 auto;" />
  <p class="seo-image-caption" style="font-size:16px;line-height:1.6;">{i['cap']}</p>
</div>
<!-- IMAGE_SLOT:IMG_{s} END -->
<p id="{i['hid']}-result">{i['post']}</p>'''

html = f'''<p>인스타그램 탈퇴방법을 찾고 있다면 먼저 삭제할 프로필에 로그인한 뒤 계정 센터에서 삭제 대상을 선택하세요.</p>
<p>영구 삭제와 일시 비활성화는 다르므로 사진과 게시물 보관 여부부터 확인하는 것이 좋습니다.</p>
<p>아래 내용은 2026년 11월 13일 확인한 Instagram 공식 도움말을 바탕으로 하며, 실제 계정의 메뉴와 표시 문구는 다를 수 있습니다.</p>
<div class="box info" data-title="핵심 요약"><ul>
<li>영구 삭제 전 필요한 정보의 사본을 내보내고 계정 이름을 확인합니다.</li>
<li>계정 센터의 표시 방식에 따라 두 가지 경로 중 화면에 맞는 안내를 따릅니다.</li>
<li>Android 도움말은 브라우저의 Instagram.com으로 이동하라는 문구도 안내합니다.</li>
<li>삭제 취소 가능 기간은 지역별로 다르므로 실제 요청 화면의 기한을 확인합니다.</li>
<li>잠시 쉬려는 목적이라면 일시 비활성화를 검토할 수 있습니다.</li>
</ul></div>
<div style="background:#f7fafc;padding:20px;border-radius:12px;margin:24px 0;">
<p>먼저 {a(official,'Instagram 공식 삭제 안내')}와 {a(pause,'일시 비활성화 안내')}를 비교해 보세요.</p>
<div class="button-container"><a class="button3" href="{escape(official, quote=True)}">공식 삭제 안내 확인하기</a></div>
</div>
{h2('prepare','삭제 전 정보 보관과 계정 확인',official)}
<p>프로필을 삭제하면 사진, 동영상, 댓글, 좋아요와 팔로워도 영구 삭제됩니다.</p>
{img(items[0])}
<p>계정이 여러 개라면 사용자 이름을 확인하고, 필요한 자료를 보관한 뒤 다음 단계로 이동하세요.</p>
<p>정보 보관 절차는 {a(export,'Instagram 정보 사본 내보내기 안내')}에서 확인할 수 있습니다.</p>
{source(official,'Instagram 고객센터 · 프로필 삭제 안내')}
{h2('android','Android 사용자와 접속 경로',android)}
{img(items[1])}
<p>이 글의 두 삭제 경로와 이미지는 컴퓨터 도움말을 기준으로 설명합니다.</p>
<p>모바일에서는 브라우저로 접속한 뒤 해당 기기의 도움말과 실제 계정 화면에 표시되는 메뉴를 기준으로 진행하세요.</p>
{source(android,'Instagram 고객센터 · Android 도움말')}
{h2('manage','계정 관리가 표시될 때',official)}
<p>컴퓨터에서 Instagram에 로그인한 후 왼쪽 아래 <strong>더 보기 → 설정 → 계정 센터 → 프로필 및 개인정보</strong> 순으로 이동합니다.</p>
{img(items[2])}
<ol><li>삭제하려는 계정 유형 옆의 <strong>관리</strong>를 선택합니다.</li><li><strong>비활성화 또는 삭제</strong>를 선택합니다.</li><li>삭제할 계정을 고르고 <strong>계정 삭제 → 계속</strong>을 선택합니다.</li></ol>
<p>공식 도움말의 목록을 보여주는 이미지이며, 실제 로그인 후 설정 화면이나 삭제 완료 화면은 아닙니다.</p>
{source(official,'Instagram 고객센터 · 계정 관리 경로')}
{h2('account','계정이 표시될 때',official)}
<p>컴퓨터의 왼쪽 아래에서 더 보기와 설정을 선택한 다음 계정 센터를 엽니다.</p>
{img(items[3])}
<p>두 경로는 계정 센터에 표시되는 항목을 기준으로 고릅니다.</p>
<p>메뉴가 다르게 보이면 {a(official,'Instagram 공식 삭제 도움말')}에서 사용하는 기기의 안내를 다시 확인하세요.</p>
{source(official,'Instagram 고객센터 · 계정 경로')}
{h2('wait','삭제 요청 뒤 기간과 주의사항',official)}
{img(items[4])}
<p>삭제 과정이 완료되기까지 최대 90일이 걸릴 수 있으며, 공식 문서는 백업 사본 등이 그 이후에도 남을 수 있다고 설명합니다.</p>
<p>요청을 진행하려면 본인이 로그인할 수 있어야 합니다.</p>
<p>로그인이 어렵다면 먼저 {a(login,'Instagram 로그인 관련 도움말')}을 확인하세요.</p>
{source(official,'Instagram 고객센터 · 삭제 기간과 로그인 조건')}
{h2('faq','자주 묻는 질문',pause)}
<div class="faq-container"><div class="faq-item"><div class="faq-question"><strong>Q. 잠시 쉬고 싶은데 삭제해야 하나요?</strong></div><div class="faq-answer">A. 잠시 활동을 중단하려면 {a(pause,'프로필 일시 비활성화 안내')}를 확인하고 삭제와 비교하세요.</div></div>
<div class="faq-item"><div class="faq-question"><strong>Q. 이 글에서 대신 탈퇴 요청을 하나요?</strong></div><div class="faq-answer">A. 아닙니다. 공식 안내를 설명한 글이며, 본인이 로그인하여 대상과 화면의 확인 내용을 직접 살펴봐야 합니다.</div></div></div>
{source(pause,'Instagram 고객센터 · 일시 비활성화')}
'''
name='노하우2_인스타그램 탈퇴방법'
(pub/(name+'_html콘텐츠.html')).write_text(html,encoding='utf-8',newline='\n')
titles=['인스타그램 탈퇴방법 계정 삭제 전 준비와 PC 설정 순서','인스타그램 탈퇴방법 계정 센터에서 삭제하는 두 가지 경로','인스타그램 탈퇴방법 사진 보관부터 삭제 요청까지','인스타그램 탈퇴방법 모바일 브라우저와 PC 안내','인스타그램 탈퇴방법 비활성화와 영구 삭제 차이 확인','인스타그램 탈퇴방법 계정 관리 메뉴별 삭제 순서','인스타그램 탈퇴방법 삭제 기간과 로그인 조건 정리']
hooks=['삭제할 계정이 맞는지 먼저 확인하세요.','사진과 게시물은 삭제 전에 보관하세요.','계정 센터의 표시 방식에 따라 경로가 달라집니다.','Android 도움말의 브라우저 이동 문구를 확인하세요.','잠시 쉰다면 일시 비활성화도 살펴보세요.','삭제 요청 화면에서 취소 가능 기한을 확인하세요.','로그인할 수 없다면 복구 안내부터 확인하세요.']
metas=['인스타그램 탈퇴방법을 공식 도움말 기준으로 정리했습니다. 삭제 전 정보 보관, 계정 센터 경로와 요청 후 기간을 확인하세요.','인스타그램 계정 삭제 전 사진을 보관하고 계정 센터의 표시 방식에 맞는 절차와 취소 기간을 확인하세요.','인스타그램 탈퇴 전 준비부터 PC 삭제 경로, Android 브라우저 안내와 일시 비활성화까지 살펴보세요.']
rel='26_1113/노하우2_인스타그램 탈퇴방법/웹조사/'
txt=f'''[작업 정보]
메인 키워드: 인스타그램 탈퇴방법
탭 / 대상 폴더: 노하우2 / 26_1113/노하우2_인스타그램 탈퇴방법
spreadsheetId / sheetId / 실제 시트 행 번호: 1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s / 962861723 / 35
runId / 담당 독립 채팅 threadId / 조정자: 20261113-content-1401 / 01a1d349-c883-7ed2-b1cf-575fc9efdb86 / 원 작업 조정자
작성 완료 열(D)의 반영·재조회 상태: 미반영, 조정자 전담
입력 웹조사 Markdown: {rel}publish/{name}_웹조사결과.md
조사 확인일 / 콘텐츠 작성일: 2026-11-13 / 2026-11-13
HTML 파일 / TXT 파일: {rel}publish/{name}_html콘텐츠.html / {rel}publish/{name}_제목메타디스크립션.txt
작업 상태: 파일 작성 완료 / 이미지 미업로드 / 미발행
발행 전 확인: 실제 계정 및 기기의 메뉴와 Android 공식 도움말의 브라우저 안내, 삭제 취소 기한, 대상 블로그의 광고·제휴 설정과 Blogger 입력란 제한.

[콘텐츠 개요]
영구 삭제 전 정보 보관과 계정 확인, PC 공식 도움말의 두 가지 경로를 안내합니다.
Android 브라우저 안내, 삭제 후 기간과 일시 비활성화 및 로그인 문제를 구분합니다.

[제목 후보 7개]
최종 추천 제목: {titles[0]}
'''
txt+='\n'.join(f'{i}. {x}' for i,x in enumerate(titles,1))+'\n\n[후킹 문구 후보 7개]\n'+'\n'.join(f'{i}. {x}' for i,x in enumerate(hooks,1))
txt+='\n\n[메타디스크립션 후보 3개]\n최종 추천 메타디스크립션: '+metas[0]+'\n'+'\n'.join(f'{i}. {x} (공백 포함 {len(x)}자)' for i,x in enumerate(metas,1))
txt+='''

[영문 퍼머링크 후보 3개]
최종 추천 슬러그: instagram-account-deletion-guide
1. instagram-account-deletion-guide
2. how-to-delete-instagram-profile
3. instagram-delete-account-steps
한글 참고 문구: 인스타그램 탈퇴방법 계정 삭제 안내
라벨 제안: 인스타그램, 계정관리, 이용방법

[Blogger 이미지 업로드 추천 순서와 삽입 위치]
채택 이미지 5개 / 제외·보류 3개
대표 이미지 추천: IMG_03 / 03_03_manage.png / 계정 센터의 삭제 경로를 직접 설명하는 공식 안내 화면
업로드 순서 요약: IMG_01 → IMG_02 → IMG_03 → IMG_04 → IMG_05
'''
for i in items:
 n=i['n']; s=f'{n:02}'; orig=rel+'raw/'+i['raw']; upload=rel+'publish/'+i['file']; src='S2 Android 공식 도움말' if n==2 else 'S1 Instagram 고객센터 컴퓨터 도움말'
 txt+=f'''
삽입 ID: IMG_{s}
추천 업로드 순서 / 본문 노출 순서: {n} / {n}
원래 파일번호 / 원본 파일명과 경로: {i['raw'][:2]} / {orig}
업로드 파일 경로: {upload}
이미지 내부 표식 / 본문 절차 번호: {i['mark']} / 해당 없음
역할 / 화면 종류: {i['role']} / 공식 고객센터 PC 웹 안내문, 실제 계정 설정 화면 아님
삽입 소제목: H2 {i['h']} / id={i['hid']}
직전 문단: id={i['hid']}-intro / {i['pre']}
직후 문단: id={i['hid']}-result / {i['post']}
HTML 위치: id=img-{s} / data-image-id=IMG_{s} / IMAGE_SLOT:IMG_{s} START·END
치환 토큰: {{{{BLOGGER_IMAGE_URL_IMG_{s}}}}}
권장 alt: {i['alt']}
권장 캡션: {i['cap']}
실제 이미지 크기 / 표시: {i['w']}×{i['hgt']} px / 가로 100% 이내, 비율 유지
출처 ID·출처명 / 실제 화면 URL / 확인일: {src} / {i['source']} / 2026-11-13
채택 이유·편집: {'Android 안내의 상충하는 문구를 보여줌; 원본에 브라우저 내 빨간 테두리 적용 후 그대로 복사' if n==2 else '해당 설명의 공식 근거를 표시; 기존 발행본의 빨간 표식 사용'}
가림·가독성: 개인정보 식별 항목 없음; 모바일에서는 작은 글씨가 축소되므로 본문 텍스트 병행.
원래 순서 변경: {'준비 다음에 Android 안내를 추가' if n==2 else '검색 화면 제외에 따른 순번 이동'}
업로드 상태 / Blogger 이미지 URL / 확대 링크 URL: 미업로드 / 미업로드 / 없음
'''
txt+=f'''
[제외·보류 이미지]
{rel}publish/01_01_search.png: 검색 결과와 AI 개요가 핵심 절차 설명에 필요하지 않아 제외. 공식 링크를 본문에 직접 제공.
{rel}raw/06_android.png: 이전 표식이 본문 전체를 둘러싸고 AI 창이 열려 있어 제외.
{rel}raw/07_android.png: 닫히는 AI 창이 강조 문구를 가려 제외.
실제 로그인 후 모바일 설정·삭제 완료 화면: 확보하지 않음. 재개 시 사용자 계정의 실제 화면과 공식 기기별 도움말을 확인; 로그인이나 삭제를 대신 수행하지 않음.

[업로드 담당 에이전트 전달사항]
대상 블로그·글 식별 정보: 지정되지 않음
허용 작업: 파일만 작성. 이미지 업로드, 초안 저장과 발행은 이번 요청에 포함되지 않음.
재개 지점: 각 슬롯에 실제 업로드 URL을 1:1로 매핑하고 Blogger 테마에서 모바일·PC 미리보기와 광고 설정을 확인.
저장·발행 URL·시각 / spaceId / blogId / postId / editorUrl: 미수행
G/H/L 반영·재조회: 미수행

[검수 결과]
파일·이미지·ID·토큰·alt·캡션 및 앞뒤 문장: 자동 대조와 육안 확인 예정.
모바일/PC 로컬 미리보기: 예정. 실제 Blogger 테마 미리보기: 미수행.
미해결 사항: 로그인 후 실제 화면 미확인, 광고·제휴 설정 미확인, 이미지 미업로드.
'''
(pub/(name+'_제목메타디스크립션.txt')).write_text(txt,encoding='utf-8',newline='\n')
print('created',len(html.splitlines()),'lines; images',len(items))
