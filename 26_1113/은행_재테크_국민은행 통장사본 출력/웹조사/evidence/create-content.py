from pathlib import Path
from PIL import Image
from html import escape

root = Path('26_1113/은행_재테크_국민은행 통장사본 출력/웹조사')
pub = root / 'publish'
base = '은행_재테크_국민은행 통장사본 출력'
out = pub / 'blogger-images'
out.mkdir(exist_ok=True)
images = [
    ('02_guide.png', '02_guide_detail.png', (220, 390, 820, 585)),
    ('03_guide.png', '03_guide_detail.png', (275, 130, 1210, 220)),
    ('04_guide.png', '04_guide_detail.png', (475, 135, 1280, 560)),
]
for src, dst, rect in images:
    with Image.open(pub / src) as im:
        im.crop(rect).save(out / dst)

slots = [
  dict(n=1, orig='raw/03_menu.png', source='publish/02_guide.png', file='02_guide_detail.png', role='guide', heading='1. PC에서 통장사본 출력하기', hid='pc', before_id='pc-menu-intro', before='뱅킹관리 화면의 제증명발급 항목에서 통장사본을 선택합니다.', after_id='pc-menu-result', after='통장사본을 선택하면 로그인 화면으로 연결됩니다.', alt='국민은행 뱅킹관리 제증명발급의 통장사본 메뉴', caption='PC 뱅킹관리 화면에서 통장사본 메뉴를 표시했습니다. 2026년 11월 13일 확인.', url='https://obank.kbstar.com/quics?page=C016535', size=(600,195), stage='PC 메뉴 선택'),
  dict(n=2, orig='raw/02_login.png', source='publish/03_guide.png', file='03_guide_detail.png', role='guide', heading='1. PC에서 통장사본 출력하기', hid='pc', before_id='pc-login-intro', before='로그인 화면에서는 본인이 사용하는 인증 수단을 선택해 안내에 따라 로그인합니다.', after_id='pc-login-result', after='화면에는 KB국민인증서, 공동·금융인증서, 아이디 로그인 탭이 보입니다.', alt='국민은행 로그인 화면의 세 가지 로그인 탭', caption='로그인 방식 선택 화면이며 실제 로그인과 계좌 조회는 진행하지 않았습니다. 2026년 11월 13일 확인.', url='https://obank.kbstar.com/quics?page=C040611', size=(935,90), stage='로그인 방식 선택'),
  dict(n=3, orig='raw/04_stm.png', source='publish/04_guide.png', file='04_guide_detail.png', role='reference', heading='3. STM에서 출력하는 대안', hid='stm', before_id='stm-intro', before='국민은행 STM 안내의 주요 가능 업무에는 통장 사본 출력이 포함되어 있습니다.', after_id='stm-result', after='방문 전에는 이용대상과 운영점, 화상인증 가능 시간을 공식 안내에서 확인하세요.', alt='국민은행 STM 주요 가능 업무 중 통장 사본 출력 안내', caption='STM 주요 가능 업무 표의 기타업무를 표시했습니다. 2026년 11월 13일 확인.', url='https://obank.kbstar.com/quics?page=C058772', size=(805,425), stage='STM 가능 업무 확인'),
]
def slot(s):
    n=s['n']; w,h=s['size']
    return f'''<p id="{s['before_id']}" class="seo-text">{s['before']}</p>
<!-- IMAGE_SLOT:IMG_{n:02} START -->
<div id="img-{n:02}" data-image-id="IMG_{n:02}" class="seo-image-container" style="margin:24px 0;background:transparent;">
  <img src="{{{{BLOGGER_IMAGE_URL_IMG_{n:02}}}}}" alt="{s['alt']}" class="seo-image" width="{w}" height="{h}" style="max-width:100%;height:auto;display:block;margin:0 auto;">
  <p class="seo-image-caption" style="font-size:16px;line-height:1.6;">{s['caption']}</p>
</div>
<!-- IMAGE_SLOT:IMG_{n:02} END -->
<p id="{s['after_id']}" class="seo-text">{s['after']}</p>'''

html = f'''<p class="seo-text">국민은행 통장사본 출력은 PC 개인뱅킹의 <strong>뱅킹관리 → 제증명발급 → 통장사본</strong> 메뉴에서 시작할 수 있습니다. 로그인 뒤 필요한 계좌를 선택해 인쇄하는 방법과 스마트폰 저장 경로, STM 대안을 차례로 살펴보겠습니다.</p>
<div class="box info" data-title="핵심 요약">
  <ul>
    <li>PC에서는 뱅킹관리의 제증명발급 아래 통장사본 메뉴로 이동합니다.</li>
    <li>로그인 뒤 계좌·언어를 확인하고 인쇄하며, PDF는 인쇄창의 저장 대상을 확인합니다.</li>
    <li>모바일 경로는 별도 공개 안내를 참고한 것으로 앱 내부 현행 화면은 직접 확인하지 못했습니다.</li>
    <li>STM 이용 전에는 대상과 운영점·이용 시간을 확인합니다.</li>
  </ul>
</div>
<a class="button3" href="https://obank.kbstar.com/quics?page=C040611" style="color:#ffffff;">국민은행 통장사본 메뉴 열기</a>
<p>아래 내용은 2026년 11월 13일 확인한 자료를 기준으로 합니다. 로그인 후 계좌 목록·인쇄 화면과 앱 내부는 직접 확인하지 않아, 관련 단계는 별도 안내와 구분해 설명합니다.</p>

<h2 id="pc"><a href="https://obank.kbstar.com/quics?page=C016535">1. PC에서 통장사본 출력하기</a></h2>
<p>국민은행 개인뱅킹에 접속한 후 상단의 <strong>뱅킹관리</strong>로 이동하세요. 공식 화면에서 제증명발급 아래에 통장사본이 표시되는 것을 확인했습니다. <a href="#source-menu" style="color:#1b1bf8;font-weight:bold;">공식 메뉴 확인 자료</a></p>
{slot(slots[0])}
{slot(slots[1])}
<p>2026년 4월 30일 공개된 <a href="#source-guide" style="color:#1b1bf8;font-weight:bold;">별도 사용 안내</a>에 따르면 로그인 후 필요한 계좌의 한글 또는 영문 미리보기를 선택하고 인쇄를 누른 뒤 인쇄 팝업에서도 인쇄를 선택합니다. 이 계좌 선택과 인쇄 화면은 직접 확인하지 못했으므로, 실제 표시되는 계좌와 버튼을 확인하며 진행하세요.</p>
<p>종이로 제출한다면 인쇄창에서 연결된 프린터를 고릅니다. PDF가 필요하다면 인쇄창에 PDF 저장 대상이 제공되는지 확인하고 저장할 수 있습니다. 파일을 열어 잘림 여부와 예금주·계좌번호가 제출할 계좌와 일치하는지 확인하세요. 제출처가 원하는 서류와 파일 형식도 먼저 확인하는 것이 좋습니다.</p>
<div class="box info" data-title="출처 및 확인 자료"><ul><li><a href="https://obank.kbstar.com/quics?page=C016535">국민은행 뱅킹관리 메뉴</a></li><li><a href="https://dobiho.com/57893/">dobiho PC 출력 안내</a></li></ul></div>

<h2 id="mobile"><a href="https://dobiho.com/57893/">2. 스마트폰에서 저장하기</a></h2>
<p>별도 공개 안내에서는 KB스타뱅킹에 로그인한 뒤 해당 계좌의 더보기 메뉴에서 통장사본을 선택하고 인증을 거쳐 저장하는 흐름을 설명합니다. 이 설명은 <a href="#source-guide" style="color:#1b1bf8;font-weight:bold;">2026년 4월 안내</a>를 바탕으로 하며, 이번 조사에서 앱 안의 현행 메뉴와 저장 결과를 직접 확인하지 않았습니다.</p>
<p>앱 버전이나 계좌 종류에 따라 표시가 다를 수 있습니다. 해당 계좌의 메뉴를 살펴보거나 앱에서 통장사본을 검색하고, 화면에 표시되는 안내를 확인하세요. 저장 후에는 이미지의 은행명·예금주·계좌번호가 필요한 계좌의 정보인지 확인합니다.</p>
<div class="box info" data-title="출처 및 확인 자료"><ul><li><a href="https://dobiho.com/57893/">dobiho 모바일 저장 안내</a></li></ul></div>

<h2 id="stm"><a href="https://obank.kbstar.com/quics?page=C058772">3. STM에서 출력하는 대안</a></h2>
{slot(slots[2])}
<p>공식 안내에 따르면 STM은 신분증 스캔과 인증을 사용하는 무인 채널입니다. 안내된 이용대상은 만 19세 이상 실명의 개인이며 개인사업자·임의단체·외국인·공동명의 계좌는 제외됩니다. 운영점 및 화상인증 시간은 서로 다를 수 있으므로 <a href="#source-stm" style="color:#1b1bf8;font-weight:bold;">STM 공식 이용안내</a>를 먼저 살펴보세요. 일반 ATM에서도 같은 업무가 가능하다고 단정하지 마세요.</p>
<div class="box info" data-title="출처 및 확인 자료"><ul><li><a href="https://obank.kbstar.com/quics?page=C058772">국민은행 STM 이용안내</a></li></ul></div>

<h2 id="check"><a href="https://obank.kbstar.com/quics?page=C040611">4. 제출 전 확인할 사항</a></h2>
<div class="table-responsive"><table><thead><tr><th>확인 항목</th><th>살펴볼 내용</th></tr></thead><tbody><tr><td>서류 종류</td><td>통장사본인지 계좌개설확인서 등 다른 서류인지 제출처에 확인</td></tr><tr><td>계좌 정보</td><td>예금주와 계좌번호가 제출 대상과 일치하는지 확인</td></tr><tr><td>제출 형식</td><td>한글·영문 및 이미지·PDF·종이 중 요구 형식 확인</td></tr></tbody></table></div>
<p>통장사본에는 계좌 정보가 포함됩니다. 저장한 파일과 인쇄물은 필요한 범위에서만 전달하고, 제출이 끝난 뒤 보관 여부를 확인하세요. 프린터나 PDF 저장이 되지 않는다면 인쇄창의 대상을 다시 확인하고, 계속 문제가 생기면 국민은행 공식 고객지원에 문의하세요.</p>
<div class="box info" data-title="출처 및 확인 자료"><ul><li><a href="https://obank.kbstar.com/quics?page=C040611">국민은행 통장사본 메뉴</a></li></ul></div>

<h2 id="sources"><a href="https://obank.kbstar.com/quics?page=C016535">5. 출처와 확인 범위</a></h2>
<ul>
  <li id="source-menu"><a href="https://obank.kbstar.com/quics?page=C016535">KB국민은행 뱅킹관리 메뉴</a> — 2026년 11월 13일 확인.</li>
  <li id="source-login"><a href="https://obank.kbstar.com/quics?page=C040611">KB국민은행 통장사본 진입·로그인 화면</a> — 2026년 11월 13일 확인.</li>
  <li id="source-stm"><a href="https://obank.kbstar.com/quics?page=C058772">KB국민은행 STM 이용안내</a> — 2026년 11월 13일 확인.</li>
  <li id="source-guide"><a href="https://dobiho.com/57893/">dobiho 모바일·PC 이용 안내</a> — 2026년 4월 30일 공개, 2026년 11월 13일 조사.</li>
</ul>
'''
titles=['국민은행 통장사본 출력 방법: PC·모바일 저장과 STM 안내','국민은행 통장사본 출력, PC 메뉴와 스마트폰 저장 경로','국민은행 통장사본 출력 및 PDF 저장 전 확인할 점','국민은행 통장사본 출력 어디서? PC와 STM 경로','국민은행 통장사본 출력: 로그인부터 제출 전 확인까지','국민은행 통장사본 출력과 모바일 저장 방법 살펴보기','국민은행 통장사본 출력 시 계좌·제출 형식 확인하기']
hooks=['PC 뱅킹관리에서 통장사본 메뉴를 찾아보세요.','스마트폰 저장 경로와 확인 범위를 함께 정리했습니다.','인쇄 전 계좌와 언어를 확인하세요.','PDF 제출이 필요할 때 인쇄창의 대상을 확인하세요.','STM 방문 전 이용대상과 운영 시간을 살펴보세요.','제출처가 원하는 서류와 파일 형식을 먼저 확인하세요.','공식 메뉴 화면과 별도 사용 안내를 구분했습니다.']
metas=['국민은행 통장사본 출력의 PC 메뉴와 모바일 저장 안내, STM 대안 및 제출 전 확인사항을 정리했습니다.','국민은행 통장사본을 PC에서 찾는 경로와 인쇄·PDF 저장 시 확인할 점을 알아봅니다.','국민은행 통장사본 출력과 모바일 저장 경로, STM 이용 전 확인할 조건을 살펴보세요.']
slugs=['kb-bank-passbook-copy-print','kookmin-bank-account-copy','kb-passbook-copy-guide']
meta=f'''[작업 정보]
메인 키워드: 국민은행 통장사본 출력
탭 / 대상 폴더: 은행_재테크 / 26_1113/은행_재테크_국민은행 통장사본 출력
spreadsheetId / sheetId / 실제 시트 행 번호: 1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s / 1126487498 / 16
runId / 담당 독립 채팅 threadId / 조정자: 20261113-content-1401 / 01a1d34a-3bd3-7a52-8699-242d6d15d919 / 원 요청 조정자
작성 완료 열(D): 조정자 전담, 이 작업에서 쓰기·재조회 미수행
입력 웹조사 Markdown: 26_1113/{base}/웹조사/publish/{base}_웹조사결과.md
조사 확인일 / 콘텐츠 작성일: 2026-11-13 / 2026-11-13
HTML 파일 / TXT 파일: 26_1113/{base}/웹조사/publish/{base}_html콘텐츠.html / 26_1113/{base}/웹조사/publish/{base}_제목메타디스크립션.txt
작업 상태: 파일 작성 완료 / 이미지 미업로드 / 미발행
발행 전 확인: 로그인 후 PC 인쇄와 앱 현행 경로 및 실제 화면, 제출처 형식, Blogger 테마와 광고 설정.

[콘텐츠 개요]
PC 공식 메뉴에서 통장사본으로 진입하고 인쇄하는 흐름을 안내한다.
모바일은 제3자 설명임을 밝히고 STM 대안과 제출 전 점검 사항을 제공한다.

[제목 후보 7개]
최종 추천 제목: {titles[0]}
'''+'\n'.join(f'{i}. {v}' for i,v in enumerate(titles,1))+'\n\n[후킹 문구 후보 7개]\n'+'\n'.join(f'{i}. {v}' for i,v in enumerate(hooks,1))+'\n\n[메타디스크립션 후보 3개]\n'+f'최종 추천 메타디스크립션: {metas[0]}\n'+'\n'.join(f'{i}. {v} (공백 포함 {len(v)}자)' for i,v in enumerate(metas,1))+'\n\n[영문 퍼머링크 후보 3개]\n'+f'최종 추천 슬러그: {slugs[0]}\n'+'\n'.join(f'{i}. {v}' for i,v in enumerate(slugs,1))+'''\n한글 참고 문구: 국민은행 통장사본 출력 방법
라벨 제안: 은행, 국민은행, 통장사본

[Blogger 이미지 업로드 추천 순서와 삽입 위치]
채택 이미지 3개 / 제외·보류 이미지 1개
대표 이미지 추천: IMG_01 / 02_guide_detail.png / 핵심 메뉴 위치를 직접 보여줌. 테마의 대표 이미지 동작 확인 필요.
업로드 순서 요약: IMG_01 메뉴 → IMG_02 로그인 → IMG_03 STM 가능 업무
'''
for s in slots:
    n=s['n'];w,h=s['size']
    meta+=f'''
삽입 ID: IMG_{n:02}
추천 업로드 순서 / 본문 노출 순서: {n} / {n}
원래 파일번호 / 원본: {s['orig']} / 기존 발행본 {s['source']}
업로드 파일 경로: 26_1113/{base}/웹조사/publish/blogger-images/{s['file']}
이미지 내부 표식 번호 / 본문 절차: 빨간 1 / {s['stage']} (표식은 전체 절차 번호가 아님)
역할: {s['role']}
설명하는 내용 / 실제 화면 종류: {s['stage']} / PC 웹
삽입 소제목: {s['heading']} / id={s['hid']}
직전 문단: id={s['before_id']} / {s['before']}
직후 문단: id={s['after_id']} / {s['after']}
HTML 위치: id=img-{n:02} / data-image-id=IMG_{n:02} / IMAGE_SLOT:IMG_{n:02}
치환 토큰: {{{{BLOGGER_IMAGE_URL_IMG_{n:02}}}}}
권장 alt: {s['alt']}
권장 캡션: {s['caption']}
실제 이미지 크기 / 표시 원칙: {w}×{h}px / 가로 100% 이내, 비율 유지
출처: KB국민은행 / {s['url']} / 2026-11-13
채택 사유·편집: 관련 메뉴 또는 업무를 표시한 기존 발행본을 잘라 글씨를 확대. 원본 보존, 새 표식 없음.
가림·가독성: 계좌 개인정보 및 실제 로그인 QR 없음. 모바일에서 작은 글자는 본문으로 보완.
원래 순서: 메뉴 → 로그인 → STM, 실제 흐름 유지.
업로드 상태 / Blogger 이미지 URL / 확대 링크: 미업로드 / 미업로드 / 없음
'''
meta+='''
[제외·보류 이미지]
웹조사/publish/01_search.png 및 원본 웹조사/raw/01_search.png: 공식 검색 결과 화면은 직접 메뉴 링크와 중복되어 제외.
웹조사/raw/03_menu.png, 02_login.png, 04_stm.png: 동일 화면의 원본으로 중복 삽입하지 않음. 해당 발행본에서 상세 사본 생성.
추가 조사: Google에서 메인 키워드와 공식 앱 안내 검색 후 국민은행 통장사본 페이지를 다시 열었으나 로그인 화면까지만 공개됨. 앱 내부와 로그인 후 계좌·출력 화면은 확보하지 못함. 인증된 계정의 적합한 화면을 확보할 수 있을 때 재개.

[업로드 담당 에이전트 전달사항]
대상 블로그·글 식별 정보: 지정되지 않음. 허용 작업: 파일 작성만.
이미지 업로드 후 ID별 실제 URL을 치환하고 실제 Blogger 테마에서 모바일·PC를 확인. 본문에 광고 ID는 임의 삽입하지 않았으며 대상 블로그 광고 설정 확인 필요.
현재 완료 단계: 파일 작성 및 로컬 검수. 남은 작업: 이미지 업로드, URL 치환, Blogger 미리보기 및 별도 요청에 따른 저장·발행.
실제 글 URL·상태·시각 / spaceId·blogId·postId·editorUrl / G·H·L / blogger-state.json: 미수행.

[검수 결과]
파일·이미지 실물·본문 사실·순서·ID·토큰·alt·캡션: 검수 예정.
모바일/PC 미리보기: 검수 예정.
미해결: PC 로그인 후 계좌·인쇄 화면과 앱 현행 화면은 직접 미확인. 이미지 미업로드, 실제 Blogger 테마 미확인.
'''
(pub / f'{base}_html콘텐츠.html').write_text(html,encoding='utf-8')
(pub / f'{base}_제목메타디스크립션.txt').write_text(meta,encoding='utf-8')
print('created',len(html.splitlines()),'lines',html.count('<h2 '),'H2')
