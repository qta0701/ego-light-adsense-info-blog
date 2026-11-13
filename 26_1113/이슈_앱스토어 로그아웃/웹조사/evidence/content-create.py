from pathlib import Path
from PIL import Image, ImageDraw
import html

base = Path('26_1113/이슈_앱스토어 로그아웃/웹조사')
pub = base / 'publish'
images = pub / 'blogger-images'
images.mkdir(exist_ok=True)
im = Image.open(base / 'raw/05_family.png').convert('RGB')
im = im.crop((110, 280, 980, 455))
ImageDraw.Draw(im).rectangle((20, 72, 845, 162), outline='#f00000', width=4)
im.save(images / '05_family_marked.png')

url = 'https://support.apple.com/ko-kr/108911'
link = lambda s: f'<a href="{url}" style="color: #1b1bf8; font-weight: 700;"><strong>{s}</strong></a>'
slots = [
 dict(n=1, heading='미디어 및 구입 항목에서 로그아웃', hid='iphone', pre='iphone-intro', post='iphone-result', before='아래는 실제 설정 화면이 아니라 Apple 지원 문서에서 해당 메뉴를 강조한 발췌입니다.', after='같은 발췌의 다음 줄에서 로그아웃과 확인 순서도 볼 수 있습니다.', alt='Apple 지원 문서의 iPhone과 iPad 로그아웃 안내 중 미디어 및 구입 항목 강조', caption='Apple 지원 문서 발췌: 미디어 및 구입 항목 선택과 로그아웃 순서 (2026-11-13 확인)', file='02_guide.png', orig='raw/02_iphone.png', upload='publish/02_guide.png', size=(955,193), mark='빨간 원 2와 상자 / 본문 2단계', role='guide', why='기존 발행본, 메뉴와 다음 절차를 함께 표시; 편집 추가 없음'),
 dict(n=2, heading='Mac에서는 스토어 메뉴 사용', hid='mac', pre='mac-intro', post='mac-result', before='아래 Apple 지원 문서 발췌에서 스토어와 로그아웃 메뉴 순서를 확인할 수 있습니다.', after='다시 로그인하려면 같은 스토어 메뉴에서 로그인을 선택합니다.', alt='Apple 지원 문서의 Mac 스토어 메뉴 로그아웃 경로 강조', caption='Apple 지원 문서 발췌: Mac App Store의 스토어 메뉴 (2026-11-13 확인)', file='04_guide.png', orig='raw/04_mac.png', upload='publish/04_guide.png', size=(955,193), mark='빨간 원 4와 상자 / Mac 절차', role='guide', why='기존 발행본, Mac 경로를 직접 설명; 편집 추가 없음'),
 dict(n=3, heading='가족 공유가 보이지 않을 때', hid='family', pre='family-intro', post='family-result', before='아래 공식 문서 발췌는 계정과 구입 항목 공유 설정을 함께 확인하도록 안내합니다.', after='공유하려는 가족 구성원도 구입 항목 공유 설정을 확인해야 합니다.', alt='Apple 지원 문서의 가족 공유 계정과 구입 항목 공유 설정 안내 강조', caption='Apple 지원 문서 발췌: 가족 공유 계정과 구입 항목 공유 설정 (2026-11-13 확인)', file='05_family_marked.png', orig='raw/05_family.png', upload='publish/blogger-images/05_family_marked.png', size=(870,175), mark='빨간 상자 / 본문 절차 번호 없음', role='reference', why='가족 공유 확인 조건 보강; 원본에서 안내 부분 자르고 빨간 상자 추가, 개인정보 없음')]

def img(s):
    n=s['n']; w,h=s['size']
    return f'''<!-- IMAGE_SLOT:IMG_{n:02d} START -->
<div id="img-{n:02d}" data-image-id="IMG_{n:02d}" class="seo-image-container" style="text-align:center; margin:20px 0;">
  <img class="seo-image" src="{{{{BLOGGER_IMAGE_URL_IMG_{n:02d}}}}}" alt="{s['alt']}" width="{w}" height="{h}" style="max-width:100%; height:auto; display:block; margin:auto;" />
  <p class="seo-image-caption" style="font-size:16px; line-height:1.6;">{s['caption']}</p>
</div>
<!-- IMAGE_SLOT:IMG_{n:02d} END -->'''

content = f'''<p class="seo-text">앱스토어 로그아웃을 하려면 iPhone·iPad에서 <strong>설정 → 사용자 이름 → 미디어 및 구입 항목 → 로그아웃 → 확인</strong>으로 이동하세요. Mac은 App Store의 메뉴 막대에서 <strong>스토어 → 로그아웃</strong>을 선택합니다. 이 안내는 Apple 지원 문서를 2026년 11월 13일에 확인한 내용이며 기기와 운영체제에 따라 표시가 다를 수 있습니다.</p>
<div style="background:#f0f3ff; padding:20px; border-radius:12px; margin:20px 0;">
  <p>기기별 경로와 가족 공유 확인 사항은 Apple의 안내에서도 살펴볼 수 있습니다.</p>
  <a class="button3" href="{url}" style="color:#ffffff;">Apple 공식 로그아웃 안내 확인하기</a>
</div>
<h2 id="iphone">{link('iPhone·iPad에서 앱스토어 로그아웃')}</h2>
<p>설정 앱을 열고 화면 위쪽의 사용자 이름을 탭합니다. 계정 화면에서 <strong>미디어 및 구입 항목</strong>을 선택한 뒤 <strong>로그아웃</strong>을 누르고 확인하세요. Apple이 가족 공유 콘텐츠 문제에 대해 안내하는 경로입니다. {link('Apple 지원의 iPhone·iPad 안내')}</p>
<h3 id="iphone-step">미디어 및 구입 항목에서 로그아웃</h3>
<p id="iphone-intro">{slots[0]['before']}</p>
{img(slots[0])}
<p id="iphone-result">{slots[0]['after']} 화면 맨 아래의 기기 전체 Apple 계정 로그아웃과 혼동하지 않도록 메뉴 이름을 확인하세요.</p>
<p>다른 계정으로 로그인해야 한다면 미디어 및 구입 항목을 다시 탭하고 화면에 나오는 로그인 안내를 따릅니다. Apple의 가족 공유 안내에는 ‘[사용자 이름]님이 아닙니까?’를 선택해 가족 공유에 사용하는 계정으로 로그인하는 과정이 나옵니다. 암호와 인증은 본인 기기에서 직접 진행하세요.</p>
<h2 id="scope">{link('로그아웃 전 확인할 범위')}</h2>
<p>이 글의 iPhone·iPad 경로는 <strong>미디어 및 구입 항목</strong>의 계정을 다룹니다. Apple은 가족 공유를 위한 이 절차에서 iCloud와 iMessage 등 다른 Apple 계정 서비스에서 로그아웃할 필요가 없다고 설명합니다. 따라서 설정의 다른 로그아웃 항목을 누르기 전에 현재 선택한 메뉴를 살펴보세요.</p>
<div class="table-responsive" style="overflow-x:auto;"><table><thead><tr><th>기기</th><th>로그아웃 경로</th></tr></thead><tbody><tr><td>iPhone·iPad</td><td>설정 → 사용자 이름 → 미디어 및 구입 항목 → 로그아웃 → 확인</td></tr><tr><td>Mac</td><td>App Store → 메뉴 막대 스토어 → 로그아웃</td></tr></tbody></table></div>
<p>어떤 계정으로 콘텐츠를 구입했는지와 가족 공유에 쓰는 계정을 먼저 확인해 두면 계정을 다시 선택할 때 도움이 됩니다. 화면 이름이나 배치가 다르면 기기의 운영체제에 맞는 안내를 다시 확인하세요.</p>
<h2 id="mac">{link('Mac에서 앱스토어 로그아웃')}</h2>
<h3 id="mac-step">Mac에서는 스토어 메뉴 사용</h3>
<p id="mac-intro">{slots[1]['before']}</p>
{img(slots[1])}
<p id="mac-result">{slots[1]['after']} 가족 공유를 사용하는 경우 Apple은 가족 공유에 사용하는 것과 동일한 계정으로 로그인하도록 안내합니다.</p>
<p>Mac은 iPhone의 설정 경로가 아니라 App Store를 연 후 화면 위쪽 메뉴 막대를 사용합니다. 스토어 메뉴가 보이지 않으면 App Store가 활성화되어 있는지 먼저 살펴보세요. {link('Apple 지원의 Mac 안내')}</p>
<h2 id="family">{link('가족 공유와 자주 묻는 질문')}</h2>
<h3 id="family-step">가족 공유가 보이지 않을 때</h3>
<p id="family-intro">{slots[2]['before']}</p>
{img(slots[2])}
<p id="family-result">{slots[2]['after']} 가족 공유와 미디어 및 구입 항목에 사용하는 계정이 맞는지도 살펴보세요. 일부 구독이나 앱 내 구입은 공유할 수 없고 가려진 구입 항목은 보이지 않을 수 있습니다. {link('Apple 가족 공유 문제 해결 안내')}</p>
<h3>로그아웃하면 iCloud도 함께 로그아웃해야 하나요?</h3>
<p>Apple의 이 안내에서는 iCloud나 iMessage 등 다른 서비스에서 로그아웃할 필요가 없다고 설명합니다. 다만 기기 전체 계정 로그아웃과는 다른 메뉴이므로 선택 전 경로를 확인하세요.</p>
<h3>로그아웃 후 다른 계정을 사용하려면 어떻게 하나요?</h3>
<p>iPhone·iPad는 미디어 및 구입 항목을 다시 열어 표시되는 로그인 안내를 따릅니다. Mac은 App Store 메뉴 막대에서 스토어 → 로그인을 선택합니다. 실제 로그인과 인증 완료 화면은 이번 조사에서 확인하지 않았습니다.</p>
<p>출처: {link('Apple 지원 — 가족의 공유 앱 및 콘텐츠를 찾을 수 없는 경우')} (2026-11-13 확인). 이미지도 같은 공식 문서의 발췌이며 실제 기기 조작 화면이 아닙니다.</p>
'''

titles=['앱스토어 로그아웃 방법: 아이폰·아이패드와 맥에서 계정 바꾸기','아이폰 앱스토어 로그아웃, 미디어 및 구입 항목에서 찾는 방법','앱스토어 계정 로그아웃과 다시 로그인하는 순서','아이패드 앱스토어 로그아웃 경로와 가족 공유 확인','맥 앱스토어 로그아웃은 어디서? 스토어 메뉴 안내','앱스토어 로그아웃 전 확인할 계정과 가족 공유 설정','아이폰·맥 앱스토어 로그아웃 메뉴 한눈에 보기']
hooks=['설정에서 찾아야 할 메뉴부터 확인하세요.','아이폰과 맥의 경로를 구분해 살펴보세요.','미디어 및 구입 항목의 로그아웃 순서를 정리했습니다.','가족 공유가 보이지 않을 때 확인할 항목도 함께 알아보세요.','다른 계정으로 로그인하기 전 경로를 살펴보세요.','공식 안내 화면과 함께 메뉴를 확인하세요.','iCloud와 관련된 로그아웃 범위도 확인하세요.']
metas=['앱스토어 로그아웃을 위한 아이폰·아이패드 설정 경로와 맥 메뉴, 가족 공유 계정 확인 사항을 정리했습니다.','아이폰과 맥에서 앱스토어 계정을 로그아웃하는 순서와 다시 로그인할 때 확인할 사항을 알아보세요.','미디어 및 구입 항목의 로그아웃 경로와 가족 공유 문제를 확인하는 방법을 Apple 공식 안내로 살펴봅니다.']
meta = f'''[작업 정보]
메인 키워드: 앱스토어 로그아웃
탭 / 대상 폴더: 이슈 / 26_1113/이슈_앱스토어 로그아웃
spreadsheetId / sheetId / 실제 시트 행 번호: 1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s / 448262533 / 30
runId / 담당 독립 채팅 threadId / 조정자: 20261113-content-1401 / 01a1d348-dc18-7160-9248-8bb6968afc43 / 상위 조정 채팅
작성 완료 열(D)의 반영·재조회 상태: 조정자 전담, 이 작업에서는 미반영·미재조회
입력 웹조사 Markdown: 26_1113/이슈_앱스토어 로그아웃/웹조사/publish/이슈_앱스토어 로그아웃_웹조사결과.md
조사 확인일 / 콘텐츠 작성일: 2026-11-13 / 2026-11-13 (KST)
HTML 파일 / TXT 파일: 26_1113/이슈_앱스토어 로그아웃/웹조사/publish/이슈_앱스토어 로그아웃_html콘텐츠.html / 26_1113/이슈_앱스토어 로그아웃/웹조사/publish/이슈_앱스토어 로그아웃_제목메타디스크립션.txt
작업 상태: 파일 작성 완료 / 이미지 미업로드 / 미발행
발행 전 확인할 사실·이미지·광고 설정: Apple 안내의 변경 여부, Blogger 테마에서 이미지 가독성·대표 이미지, 대상 블로그 광고·제휴 설정 확인. 실제 기기 및 인증 후 화면은 확인하지 않음.

[콘텐츠 개요]
iPhone·iPad에서 미디어 및 구입 항목에 사용하는 계정을 로그아웃하는 경로와 Mac의 스토어 메뉴를 안내합니다.
로그아웃 범위, 다른 계정 로그인 및 가족 공유 확인 조건을 Apple 공식 문서에 근거해 설명합니다.

[제목 후보 7개]
최종 추천 제목: {titles[0]}
''' + '\n'.join(f'{i}. {x}' for i,x in enumerate(titles,1)) + '''

[후킹 문구 후보 7개]
''' + '\n'.join(f'{i}. {x}' for i,x in enumerate(hooks,1)) + f'''

[메타디스크립션 후보 3개]
최종 추천 메타디스크립션: {metas[0]}
''' + '\n'.join(f'{i}. {x} (공백 포함 {len(x)}자)' for i,x in enumerate(metas,1)) + '''

[영문 퍼머링크 후보 3개]
최종 추천 슬러그: app-store-sign-out-guide
1. app-store-sign-out-guide
2. sign-out-app-store-iphone-mac
3. apple-media-purchases-sign-out
한글 참고 문구: 앱스토어 로그아웃 방법
라벨 제안: 앱스토어, 아이폰, 맥, 애플계정

[Blogger 이미지 업로드 추천 순서와 삽입 위치]
채택 이미지 3개 / 제외·보류 기존 발행 후보 2개
대표 이미지 추천: IMG_01 / 02_guide.png / 핵심 메뉴와 로그아웃 안내를 함께 보여줌. 테마의 대표 이미지 동작은 확인 필요.
업로드 순서 요약: IMG_01 → 02_guide.png → iPhone·iPad / IMG_02 → 04_guide.png → Mac / IMG_03 → 05_family_marked.png → 가족 공유
'''
for s in slots:
 n=s['n']; w,h=s['size']
 meta+=f'''
삽입 ID: IMG_{n:02d}
추천 업로드 순서 / 본문 노출 순서: {n} / {n}
원래 파일번호 / 정확한 이미지 파일명: {s['orig'].split('/')[-1].split('_')[0]} / {s['orig'].split('/')[-1]}
원본 경로 / 업로드 파일 경로: 26_1113/이슈_앱스토어 로그아웃/웹조사/{s['orig']} / 26_1113/이슈_앱스토어 로그아웃/웹조사/{s['upload']}
이미지 내부 표식 번호 / 본문 절차 번호: {s['mark']}
역할 / 실제 화면 종류: {s['role']} / Apple 지원 웹 문서 발췌, 실제 앱 화면 아님
삽입 소제목: {s['heading']} / id={s['hid']}-step
직전 문단: id={s['pre']} / {s['before']}
직후 문단: id={s['post']} / {s['after']}
HTML 위치: id=img-{n:02d} / data-image-id=IMG_{n:02d} / IMAGE_SLOT:IMG_{n:02d} START·END
치환 토큰: {{{{BLOGGER_IMAGE_URL_IMG_{n:02d}}}}}
권장 alt: {s['alt']}
권장 캡션: {s['caption']}
실제 이미지 크기 / 표시 원칙: {w}×{h}px / 가로 100% 이내, 비율 유지
출처 ID·출처명 / 실제 화면 URL / 확인일: S1 / Apple 지원 / {url} / 2026-11-13
검색 이미지인 경우 실제 연 공식 결과 URL: 해당 없음
가림·가독성 검수 / 채택 사유·편집: {s['why']}. 문서 글자는 모바일 축소 시 작아 본문에 핵심 경로를 텍스트로 기재.
원래 순서와 달라진 경우 이유: 검색 화면을 제외하고 절차와 관련 조건 순으로 배치.
업로드 상태 / Blogger 이미지 URL / 확대 링크 URL: 미업로드 / 미업로드 / 없음
'''
meta+='''
[제외·보류 이미지]
26_1113/이슈_앱스토어 로그아웃/웹조사/publish/01_search.png: 검색 결과 찾기보다 본문 절차가 우선이므로 제외.
26_1113/이슈_앱스토어 로그아웃/웹조사/publish/03_guide.png: 02_guide.png와 같은 iPhone 안내 화면이며 강조 위치만 달라 중복 제외. 02에 로그아웃 문구도 보임.
같은 키워드 raw 4장과 신규 공식 문서 캡처를 확인했고 Google에서 키워드를 재검색한 뒤 Apple 공식 페이지를 재확인함. 최종 3장. 실제 iPhone 설정·로그아웃 확인 화면은 접근하지 못해 보류. 재개 시 본인 기기에서 개인정보를 가린 실제 화면을 확보하고 단계와 일치하는지 확인할 것.

[업로드 담당 에이전트 전달사항]
대상 블로그·글 식별 정보: 지정되지 않음
허용 작업: 파일만 작성. 이미지 업로드·초안 저장·공개 발행 미수행.
제목·메타·슬러그·라벨: 위 추천값을 검토해 사용.
이미지 업로드 → ID별 실제 URL 매핑 → HTML 토큰 치환 → Blogger 테마 미리보기 후 요청된 작업 수행.
현재 완료 단계 / 남은 작업 / 재개 지점: 파일 검수 / 조정자의 D열 확인·기록, 이미지 업로드와 실제 테마 확인 / IMG_01부터 매핑.
저장 또는 발행 후 실제 글 URL·상태·확인 시각: 미수행
spaceId / blogId / postId / editorUrl: 미지정
실제 발행 시각 및 근거: 미발행
초안 저장 열(G) / 게시 링크 열(H) / 발행 시각 열(L): 미반영·미재조회
로컬 blogger-state.json: 없음

[검수 결과]
파일 존재·이미지 실물·본문 사실·순서·ID/토큰 대응·alt/캡션: 검수 완료. Apple 공식 문서 2026-11-13 재확인. 문서 발췌와 실제 기기 화면을 구분함.
모바일/PC 미리보기 결과: PREVIEW_STATUS
미해결 사항: 실제 기기 및 로그인 후 화면 미확인, 테마·광고 설정 미확인, 이미지 미업로드. 문서 이미지의 작은 글자는 본문 텍스트로 보완.
'''
(pub / '이슈_앱스토어 로그아웃_html콘텐츠.html').write_text(content,encoding='utf-8')
(pub / '이슈_앱스토어 로그아웃_제목메타디스크립션.txt').write_text(meta,encoding='utf-8')
