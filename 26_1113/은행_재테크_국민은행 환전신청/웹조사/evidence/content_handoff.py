from pathlib import Path
from html.parser import HTMLParser
import re

root = Path(__file__).resolve().parent.parent
pub = root / 'publish'
base = '은행_재테크_국민은행 환전신청'
html = (pub / (base + '_html콘텐츠.html')).read_text(encoding='utf-8')
u = 'https://obank.kbstar.com/quics?page=C101339'
g = 'https://obank.kbstar.com/quics?page=C102233&cc=b028364:b105107&QSL=F'
rows = [
 ('02_options.png','02_guide.png','s1','1. 신청 경로','지점에서 받기','1440×900',u+'#loading'),
 ('04_payment.png','05_guide.png','s2','2. 대상과 결제','로그인별 결제','1200×900',g),
 ('07_login_choice.png','03_guide.png','s3','3. 신청 단계','로그인 선택','1440×900',u+'#loading'),
 ('08_nonlogin.png','04_guide.png','s3','3. 신청 단계','비로그인 약관','1440×900','https://obank.kbstar.com/quics?page=C101340#loading'),
 ('05_pickup.png','06_guide.png','s4','4. 수령일과 준비물','수령희망일','1200×900',g),
 ('06_caution.png','07_guide.png','s5','5. 취소와 자주 묻는 질문','거래 유의사항','1200×900',g)]
metas = ['국민은행 환전신청 방법, 지점 수령일과 준비물, 비로그인 결제 및 한도, 취소와 되팔기 안내','국민은행 환전신청 지점 수령 절차와 로그인별 결제, 수령희망일, 환율 우대 및 유의사항','국민은행 환전신청 이용 대상, 비로그인 입금 기한, 지점 수령 서류와 완료 후 되팔기 조건']
t = ['[작업 정보]','메인 키워드: 국민은행 환전신청','탭 / 대상 폴더: 은행_재테크 / 26_1113/은행_재테크_국민은행 환전신청','spreadsheetId / sheetId / 실제 행: 1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s / 1126487498 / 15','runId / 담당 채팅 / 조정자: 20261113-content-1401 / 01a1d34a-30fa-7670-b176-f3d406f5d20c / 조정자 별도','작성 완료 열(D)의 반영·재조회 상태: 조정자 전담, 미반영','입력 웹조사 Markdown: 26_1113/은행_재테크_국민은행 환전신청/웹조사/publish/은행_재테크_국민은행 환전신청_웹조사결과.md','조사 확인일 / 콘텐츠 작성일: 2026-11-13 / 2026-11-13',f'HTML / TXT: publish/{base}_html콘텐츠.html / publish/{base}_제목메타디스크립션.txt','작업 상태: 파일 작성 완료 / 이미지 미업로드 / 미발행','발행 전 확인: 환율·한도·지점 재고 및 영업시간, 약관 이후 입력 화면, 이미지 업로드, Blogger 테마와 광고·제휴 설정. 광고 설정 미확인으로 광고 코드 미삽입.','','[콘텐츠 개요]','KB국민은행 PC 웹의 지점 수령 환전 신청 경로와 결제 조건을 안내합니다.','수령일과 준비물, 취소와 되팔기 유의사항을 공식 자료로 정리합니다.','','[제목 후보 7개]','최종 추천 제목: 국민은행 환전신청 방법 지점 수령일 준비물 비로그인 한도']
titles = ['방법 지점 수령일 준비물 비로그인 한도','지점 수령 방법과 결제 기한','비로그인 조건과 수령 준비물','로그인 결제와 수령일 안내','통화별 수령일과 지점 확인','한도 환율 우대 취소 안내','지점에서 받기 단계별 정리']
t += [f'{i}. 국민은행 환전신청 {x}' for i,x in enumerate(titles,1)]
t += ['','[후킹 문구 후보 7개]','1. 지점에 가기 전 수령일과 재고부터 확인하세요','2. 비로그인 환전 입금 기한은 얼마나 될까요?','3. 환전 완료 뒤 취소할 수 있을까요?','4. 통화에 따라 수령일이 달라집니다','5. 신청 전 확인할 결제와 수령 조건','6. 최대 우대율과 실제 적용률은 다를 수 있어요','7. 신분증과 신청번호를 방문 전에 챙기세요','','[메타디스크립션 후보 3개]',f'최종 추천 메타디스크립션: {metas[0]}']
t += [f'{i}. {x} (공백 포함 {len(x)}자)' for i,x in enumerate(metas,1)]
t += ['','[영문 퍼머링크 후보 3개]','최종 추천 슬러그: kb-currency-exchange','1. kb-currency-exchange','2. kb-exchange-apply','3. kb-forex-pickup','한글 참고 문구: 국민은행 환전신청 지점 수령','라벨 제안: 은행, 환전, 국민은행','','[Blogger 이미지 업로드 추천 순서와 삽입 위치]','채택 이미지 6개 / 제외 이미지 2개 / 보류 장면 1개','대표 이미지 추천: IMG_01 / 02_guide.png / 지점 수령 선택 화면','업로드 순서: ' + ' → '.join(f'IMG_{i:02} {r[1]}' for i,r in enumerate(rows,1))]
for i,(raw,fn,sec,title,desc,size,url) in enumerate(rows,1):
 n=f'{i:02}'
 before=re.search(fr'<p id="p-{n}-before">(.*?)</p>',html).group(1)
 after=re.search(fr'<p id="p-{n}-after">(.*?)</p>',html).group(1)
 alt=re.search(fr'<img src="\{{\{{BLOGGER_IMAGE_URL_IMG_{n}\}}\}}" alt="(.*?)"',html).group(1)
 cap=re.search(fr'<figure id="img-{n}".*?<figcaption>(.*?)</figcaption>',html,re.S).group(1)
 t += ['',f'삽입 ID: IMG_{n}',f'추천 업로드 순서 / 본문 노출 순서: {i} / {i}',f'원래 파일번호 / 원본: {raw[:2]} / 웹조사/raw/{raw}',f'업로드 파일: 26_1113/은행_재테크_국민은행 환전신청/웹조사/publish/{fn}','이미지 내부 표식 번호 / 본문 절차 번호: 빨간 표식 1 / 해당 없음',f'역할 / 화면 종류: guide / {desc}, PC 웹',f'삽입 소제목: {title} / id={sec}',f'직전 문단: p-{n}-before / {before}',f'직후 문단: p-{n}-after / {after}',f'HTML 위치: id=img-{n} / data-image-id=IMG_{n} / IMAGE_SLOT:IMG_{n} START·END',f'치환 토큰: {{{{BLOGGER_IMAGE_URL_IMG_{n}}}}}',f'권장 alt: {alt}',f'권장 캡션: {cap}',f'실제 이미지 크기 / 표시 원칙: {size} px / 최대 너비 100%, 비율 유지',f'출처 ID·출처명 / 실제 화면 URL / 확인일: S1 / KB국민은행 / {url} / 2026-11-13','가림·가독성: 개인정보 노출 없음. 빨간 테두리·화살표. 작은 글씨는 모바일 확대가 필요하여 핵심 내용을 본문에 기재.','채택 및 순서: 설명과 맞는 기존 발행본 사용. 결제 조건을 신청 단계 앞에 배치해 조사 순서와 다름. 추가 편집 없음.','업로드 상태 / Blogger 이미지 URL / 확대 링크 URL: 미업로드 / 미업로드 / 없음']
t += ['','[제외·보류 이미지]','웹조사/publish/01_search.png (원본 raw/01_search.png): 공식 링크를 본문에 제공해 검색 결과 화면은 제외.','웹조사/raw/03_eligibility.png: 대상 조건을 본문에 기재하고 유사 안내 팝업 화면이므로 제외.','약관 동의 이후 정보 입력·최종 확인 화면: 개인정보 입력이 필요해 미확인, 별도 파일 없음. 실제 신청 시 화면 확인 필요.','','[업로드 담당 에이전트 전달사항]','대상 블로그·글 식별 정보: 지정되지 않음','허용 작업: 파일만 작성. 이미지 업로드·Blogger 초안 저장·발행 및 시트 쓰기 미수행.','재개: 광고·제휴 설정 확인, 이미지 업로드 후 슬롯별 URL 치환, 실제 Blogger 테마 모바일/PC 미리보기.','spaceId / blogId / postId / editorUrl / 발행 시각: 해당 없음','G/H/L 반영·재조회 및 blogger-state.json: 미수행 / 없음','','[검수 결과]','파일·ID·토큰·alt·캡션과 이미지 크기 확인. 원고는 조사일 기준이며 약관 이후 미확인.','모바일 390px / PC 1280px 로컬 임시 미리보기: 6장 로딩, 비율 유지 및 가로 넘침 없음. 작은 화면의 캡처 내 글씨는 작아 본문으로 보완. 실제 Blogger 미리보기 및 이미지 업로드: 미수행.']
(pub / (base + '_제목메타디스크립션.txt')).write_text('\n'.join(t)+'\n',encoding='utf-8')
print('HTML lines',len(html.splitlines()),'H2',html.count('<h2 '),'images',len(rows))
