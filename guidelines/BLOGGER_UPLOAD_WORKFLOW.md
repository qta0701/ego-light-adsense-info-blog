# Blogger 업로드 및 발행 운영 가이드 (Blogger Upload Workflow)

2026-11-08 운영 최적화. 이 문서는 작성된 결과물(HTML/TXT/이미지)을 Blogger에 업로드하고 초안 저장 또는 공개 발행을 수행하는 **B 프로세스 전용 가이드라인**이다. (HTML 콘텐츠 및 메타 TXT 작성 단계는 [BLOGGER_CONTENT_WORKFLOW.md](BLOGGER_CONTENT_WORKFLOW.md)를 참조한다.)
Blogger 업로드는 **ego-browser '순분' 프로필 세션을 기반으로 Space 최대 3개 병렬**로 실행된다.

- 복사용 프롬프트: [blogger-upload-request-prompt.md](../블로그작성_가이드라인/blogger-upload-request-prompt.md)
- 이미지 계약 및 슬롯 규칙: [html-content-guide.md](../블로그작성_가이드라인/html-content-guide.md) 0절, [html-style-guide.md](../블로그작성_가이드라인/html-style-guide.md)
- 브라우저 지침: [.antigravity/rules.md](../.antigravity/rules.md), [Chrome 통합 가이드](CHROME_AGENTS_USAGE_GUIDE.md), [크롬 활용법](크롬에이전트_활용법.md), [데스크톱 가이드](AGENT_DESKTOP_GUIDE.md)

---

## 0. 기본 실행 모드 — 최소 왕복 (2026-11-08 사용자 확인 반영)

사용자가 앱사용 49행의 공개 글과 H열 실제 URL을 정상 완료로 확인했다. 다음 실행은 이 절의 간소화 기준을 기본 적용한다. 아래 과거 기록이나 관련 가이드에 일률적인 PC·모바일 미리보기 요구가 있더라도 **이 업로드 작업에서는 현재 절의 조건부 검수 기준을 우선**한다.

**기본 흐름:** 대상·파일·중복 확인 → stage B 예약 → 같은 글에 이미지 순차 업로드 → 완성 본문·메타 입력 → 저장 및 통합 확인 1회 → G 반영 → 공개 발행 → 실제 공개 페이지 확인 1회 → H/L 반영·재조회 → 종료.

| 기본으로 수행 | 기본으로 생략 |
|---|---|
| 실제 행·키워드·헤더, G/H/L, 로컬 상태·Blogger 중복 대조 | 이미 작성·검수된 원고를 다시 조사하거나 전면 재작성 |
| 이미지 파일↔IMG ID↔업로드 URL 매핑, 본문 구조·토큰 검사 1회 | 이미지마다 snapshot·screenshot·별도 검사 스크립트 작성 |
| 저장 후 같은 편집기 재진입 1회로 본문·메타 묶음 확인 | 필드마다 저장·재진입, 같은 저장본 반복 비교 |
| 실제 공개 URL·제목·게시 상태·발행 시각·이미지 로딩 묶음 확인 | PC/모바일 미리보기 탭, iframe 분리 탭, 뷰포트 변경, 전체 화면 캡처 |
| 생성/발행/시트 쓰기 직전 live 확인, 쓰기 후 재조회 | 동일 시점의 같은 셀 중복 요청, 전체 시트 조회 |
| 실패·불일치가 있는 부분만 추가 확인 | 테마 SEO·광고·사이트 전체 품질까지 검사 범위 확대 |

**미리보기·시각 검수는 조건부:** 사용자가 별도로 요청하거나, 새 CSS/레이아웃·이미지 편집을 했거나, 가독성/잘림/로딩 문제가 관찰될 때만 해당 부분을 확인한다. 필요한 화면 한 곳부터 확인하고, 반응형 문제이면 해당 뷰포트만 추가한다. 초안만 요청한 경우 저장본 확인으로 종료한다. 생략한 검수를 실시했다고 기록하지 않는다.

구조 검사는 완성 HTML의 이미지 개수·순서·alt/캡션·실제 URL, 남은 토큰·빈 src·로컬 경로·예시 URL을 한 번에 확인한다. 공개 확인 때 lazy-load 이미지는 순차 스크롤하여 로딩을 확인하되 이미지마다 캡처하지 않는다. 중복·누락·저장 실패는 해결 후 진행한다.

## 1. 대상과 인계 자료

1. **대상 구글시트**:
   - [애드센스 콘텐츠표](https://docs.google.com/spreadsheets/d/1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s/edit)
   - 작업 식별자: `spreadsheetId + sheetId + 탭 + 실제 행 번호 + 메인 키워드 + 키워드 폴더`
   - `No.` 열의 번호를 실제 시트 행 번호로 대체하지 않는다. 사용자가 지정한 시트 탭과 실제 행 번호를 정확히 조회한다.
2. **로컬 작업 경로 탐색 규칙 (구글시트 A열 '블로그 업로드 날짜' 기반 동적 탐색)**:
   - 사용자 요청(예: `blogger-upload-request-prompt.md`)에서 `[구글시트 탭 이름: {탭}]`, `[{행 번호}행: {메인 키워드}]` 형태로 대상이 주어졌을 때 로컬 원고 및 이미지 경로를 다음과 같이 동적으로 탐색한다:
     1) **시트 A열 조회**: 지정된 탭의 해당 행 번호에서 **A열 (`블로그 업로드 날짜` 헤더열)** 값을 확인한다.
     2) **날짜 폴더명(`YY_MMDD`) 도출**: A열의 날짜 데이터(예: `2026-11-06`, `2026. 11. 6` 등)에서 연도 끝 2자리와 월/일을 추출하여 `YY_MMDD` 형식(예: `26_1106`)으로 변환한다.
     3) **키워드 폴더 탐색**: 프로젝트 루트에서 해당 날짜 경로(`26_1106\`)를 찾고, 그 하위에서 `{탭}_{메인 키워드}` 형식의 폴더(예: `26_1106\앱사용_당근마켓 채팅 걸기\`)를 찾는다.
     4) **결과물 파일 확보**: 해당 키워드 폴더의 `웹조사\publish\` 하위에서 `{탭}_{키워드}_html콘텐츠.html`, `{탭}_{키워드}_제목메타디스크립션.txt`, `{탭}_{키워드}_웹조사결과.md` 및 업로드 대상 이미지 파일들을 인계 자료로 사용한다.
     5) **예외 처리**: 만약 A열이 공란이거나 날짜 형식이 아니어서 폴더를 특정할 수 없는 경우, 프로젝트 내의 날짜 폴더들을 탐색하되 불명확하거나 여러 개가 존재하면 임의 선택하지 않고 사용자에게 확인을 요청한다.
3. **입력 자료**:
   - 상기 탐색 규칙으로 확보된 `YY_MMDD/{탭}_{키워드}/웹조사/publish/`의 `{탭}_{키워드}_html콘텐츠.html` 및 `{탭}_{키워드}_제목메타디스크립션.txt`
   - 발행 대상 이미지 파일들 (TXT의 `[Blogger 이미지 업로드 추천 순서와 삽입 위치]` 섹션 매핑 준수)
   - UTF-8 인코딩 확인 및 원본 조사 Markdown·이미지·수집 기록 보존
4. **업로드 인계 기준**:
   - 키워드에 대응하는 HTML/TXT 쌍이 없으면 빈 글을 만들지 않는다. 동일 키워드의 날짜 폴더가 여러 개면 사용자 지정 경로·상태의 글 ID 등으로 유일하게 식별하고, 불명확하면 임의 선택하지 않는다.
   - 이미지별 원래 파일명, 슬롯 ID(`IMG_01`, `IMG_02` 등), 본문 순서, 치환 토큰(`{{BLOGGER_IMAGE_URL_IMG_01}}`), 권장 alt·캡션을 확인한다.
   - 단일 글 내의 업로드는 순차 처리하며, 업로드된 실제 URL로 HTML 토큰을 치환한다.

---

## 2. 카테고리(탭)와 Blogger URL 매핑 및 접속 기준

사용자가 요청사항으로 **구글시트 키워드(탭 이름 + 행 번호/키워드)** 혹은 **특정 Blogger URL**을 제공하는 경우, 각 대상에 맞춰 해당 Blogger 관리 페이지에 접속해 콘텐츠 작성 및 발행을 진행한다.

1. **기준 사이트맵 시트**:
   - 스프레드시트: [2번블로그 사이트맵 시트](https://docs.google.com/spreadsheets/d/1YVfd6VIEEZCbAjNw-n3Cre6UrcrIIo28XQlZd1Sv3yI/edit?usp=sharing)
   - 기준 탭: `2번블로그 사이트맵`
   - C열 (`카테고리`): 콘텐츠 시트의 탭 이름
   - L열 (`blogger url 주소`): 해당 탭에 속한 키워드의 글을 작성 및 발행할 Blogger 관리자 페이지 URL (`https://www.blogger.com/blog/posts/<blogId>?hl=ko`)
   - G열 (`URL`): 해당 카테고리의 공개 블로그 도메인 (참고용)

2. **요청 대응 로직**:
   - **구글시트 키워드/탭 요청 시**: 요청된 탭 이름(카테고리)을 아래 매핑표에서 조회하여 대응하는 Blogger URL(L열)로 접속한 뒤 글을 작성하고 발행한다.
   - **Blogger URL 또는 Blog ID 직접 제공 시**: 사용자가 명시한 Blogger 관리 URL 또는 Blog ID로 직접 접속하여 작업을 수행한다.
   - **매핑표에 없는 신규 탭**: [2번블로그 사이트맵 시트](https://docs.google.com/spreadsheets/d/1YVfd6VIEEZCbAjNw-n3Cre6UrcrIIo28XQlZd1Sv3yI/edit?usp=sharing)를 live 조회하여 C열(카테고리)과 L열(Blogger URL)을 확인 후 진행하며, 확인 불가능할 경우 임의 블로그에 작성하지 않고 사용자에게 확인을 요청한다.

### 2번블로그 사이트맵 카테고리 - Blogger 관리 URL 매핑표

| No. | 카테고리 (탭 이름, C열) | Blogger 관리 URL 주소 (L열) | 블로그 도메인 (참고, G열) | Blog ID |
|:---:|:---|:---|:---|:---|
| 1 | 이슈 | https://www.blogger.com/blog/posts/694192108971227039?hl=ko | https://io.supportimes.com | 694192108971227039 |
| 2 | 노하우 | https://www.blogger.com/blog/posts/1872124715220437079?hl=ko | https://how.supportimes.com | 1872124715220437079 |
| 3 | 노하우2 | https://www.blogger.com/blog/posts/3087664879020853782?hl=ko | https://how2.supportimes.com | 3087664879020853782 |
| 4 | 예능 | https://www.blogger.com/blog/posts/8771375128236205391?hl=ko | https://tv.supportimes.com | 8771375128236205391 |
| 5 | 예능2 | https://www.blogger.com/blog/posts/4624864009844767433?hl=ko | https://enter.supportimes.com | 4624864009844767433 |
| 6 | 지원금 | https://www.blogger.com/blog/posts/4895490273273930104?hl=ko | https://www.supportimes.com | 4895490273273930104 |
| 7 | 여행 | https://www.blogger.com/blog/posts/7867877142975675157?hl=ko | https://travel.supportimes.com | 7867877142975675157 |
| 8 | 스포츠 | https://www.blogger.com/blog/posts/48150355760179840?hl=ko | https://sports.supportimes.com | 48150355760179840 |
| 9 | 자동차 | https://www.blogger.com/blog/posts/880788919946837544?hl=ko | https://car.supportimes.com | 880788919946837544 |
| 10 | 은행_재테크 | https://www.blogger.com/blog/posts/3013546958093270596?hl=ko | https://bank.supportimes.com | 3013546958093270596 |
| 11 | 부동산 | https://www.blogger.com/blog/posts/2802046422813539347?hl=ko | https://house.supportimes.com | 2802046422813539347 |
| 12 | 카드 | https://www.blogger.com/blog/posts/4424451598371824231?hl=ko | https://card.supportimes.com | 4424451598371824231 |
| 13 | 핸드폰 | https://www.blogger.com/blog/posts/1991300074533666630?hl=ko | https://phone.supportimes.com | 1991300074533666630 |
| 14 | 가전 | https://www.blogger.com/blog/posts/1475057915895703355?hl=ko | https://homes.supportimes.com | 1475057915895703355 |
| 15 | 다운로드 | https://www.blogger.com/blog/posts/1772508319925672786?hl=ko | https://download.supportimes.com | 1772508319925672786 |
| 16 | 앱사용 | https://www.blogger.com/blog/posts/7162964317827704236?hl=ko | https://app.supportimes.com | 7162964317827704236 |
| 17 | 생생정보통 | https://www.blogger.com/blog/posts/1125746682731424849?hl=ko | https://sengseng.supportimes.com | 1125746682731424849 |
| 18 | 보험1 | https://www.blogger.com/blog/posts/8989281887505699127?hl=ko | https://ins.supportimes.com | 8989281887505699127 |
| 19 | 주식정보 | https://www.blogger.com/blog/posts/2107861591367962445?hl=ko | https://stock.supportimes.com | 2107861591367962445 |
| 20 | 공공기관 | https://www.blogger.com/blog/posts/503646340159442144?hl=ko | https://minwon.supportimes.com | 503646340159442144 |
| 21 | 공공기관2 | https://www.blogger.com/blog/posts/7857063519244918355?hl=ko | https://minwon24.supportimes.com | 7857063519244918355 |
| 22 | 일반브랜드 | https://www.blogger.com/blog/posts/8949746991809317914?hl=ko | https://life.supportimes.com | 8949746991809317914 |
| 23 | 일반브랜드2 | https://www.blogger.com/blog/posts/7219003604542379800?hl=ko | https://cop.supportimes.com | 7219003604542379800 |
| 24 | 서류양식 | https://www.blogger.com/blog/posts/6769083810345132657?hl=ko | https://doc.supportimes.com | 6769083810345132657 |
| 25 | 상품권 | https://www.blogger.com/blog/posts/3769700338762702347?hl=ko | https://gift.supportimes.com | 3769700338762702347 |
| 26 | 체육센터 | https://www.blogger.com/blog/posts/5126961575680067438?hl=ko | https://ymca.supportimes.com | 5126961575680067438 |
| 27 | 체육센터2 | https://www.blogger.com/blog/posts/8249882685481117838?hl=ko | https://sports1.supportimes.com | 8249882685481117838 |
| 28 | 주차장 | https://www.blogger.com/blog/posts/5103126888490588258?hl=ko | https://parking.supportimes.com | 5103126888490588258 |
| 29 | 게임 | https://www.blogger.com/blog/posts/4329786289863998514?hl=ko | https://game.supportimes.com | 4329786289863998514 |

---

## 3. 시트 열과 기록 원칙 (B 업로드 관련)

B 단계는 **'애드센스 임시저장 여부'(G), '애드센스 포스팅 링크'(H), '애드센스 포스팅 작성일'(L)**을 다룬다.

| 목적 | 실제 헤더명 | 현재 참고 열 | 쓰는 시점과 값 |
|---|---|---|---|
| 로컬 경로 탐색(날짜) | 블로그 업로드 날짜 | A | 해당 행의 업로드 날짜(예: 2026-11-06)를 읽어 로컬 날짜 폴더(`YY_MMDD`, 예: `26_1106`) 및 키워드 경로(`{탭}_{키워드}`) 탐색에 사용; 읽기만 수행 |
| 초안 저장 확인 | 애드센스 임시저장 여부 | G | Blogger에 실제 초안 저장이 완료됐음을 확인한 직후 `ㅇ` 기록; 발행 후에도 유지 |
| 공개 글 주소 | 애드센스 포스팅 링크 | H | 실제 공개 발행을 확인한 게시글 URL (`https://...`) |
| 행 식별 | 메인 키워드 | I | 대상 행 대조 및 읽기만 수행 |
| 발행 시각 | 애드센스 포스팅 작성일 | L | H를 기록할 때 함께 실제 발행 시각을 날짜·시간 값으로 기록 |

1. **셀 기록 기준**:
   - `ㅇ`는 한글 자음이다. 영문 `o`, 숫자 `0`, 불리언 등으로 바꾸지 않는다. 수식 결과 공란, 공백 문자, FALSE, 0은 빈 셀로 취급하지 않는다.
   - 쓰기 직전에 대상 행의 키워드와 셀 값을 다시 읽는다. 일치하는 완료값은 보존하고, 다른 값이나 수식이 있으면 덮어쓰지 않는다.
   - 시트 쓰기는 한 조정자가 담당한다. Space 작업자는 완료 근거를 전달하고 조정자가 반영한다.
2. **발행 링크(H)와 발행 시각(L) 동시 쓰기**:
   - H와 L은 같은 `batchUpdate` 요청 묶음에 포함한다. G가 비어 있으면 확인된 저장 근거로 함께 보완한다.
   - 이미 같은 H가 있으면 재발행하지 않고 기존 글 확인 후 누락된 G/L만 복구한다.
   - **날짜 형식**: 문자열 그대로 쓰지 않고 **한국 시각의 날짜 일련값 + DATE_TIME 표시 형식**(`yyyy. m. d AM/PM h:mm:ss`)으로 쓴다. KST 벽시각으로 변환한 일련값을 넣고 `formattedValue`로 오전/오후 표시를 확인한다.
   - 발행 시각은 Blogger에서 확인한 실제 발행 시간 또는 이번 실행에서 실제 발행 완료를 관찰한 시각을 사용한다. 재시도 시 현재 시각으로 바꾸지 않는다.
3. **오류 격리**:
   - 시트 업데이트 실패는 글 저장/발행 실패와 구분한다. 로컬 파일, 실제 글 ID, URL, 원래 발행 시각을 보존하고 시트 반영만 재시도한다.

---

## 4. B — ego-browser Space 3개 병렬 업로드

### 4.1 입력과 신규 발행 차단

시트 탭과 실제 행 번호, 대상 Blogger 블로그, 초안 저장/공개 발행 범위를 확인한다.
- **로컬 경로 자동 도출**: 시트 해당 행의 A열(`블로그 업로드 날짜`) 값을 조회하여 `YY_MMDD` 날짜 폴더(예: `2026-11-06` → `26_1106\`)를 특정하고, 그 하위의 `{탭}_{메인 키워드}`(예: `앱사용_당근마켓 채팅 걸기\웹조사\publish\`) 경로에서 업로드 대상 파일(.md/.html/.txt 및 이미지)을 확보한다. (상세는 1절 2항 참조)

| live 시트 상태 | 신규 작업 처리 |
|---|---|
| G 공란, H 공란, L 공란 | 신규 업로드 후보. 로컬 기록과 Blogger 기존 글도 조회 |
| G 값 있음, H 공란 | 이미 초안이 있을 수 있으므로 신규 생성 금지. 기존 글 ID 확인 후 명시적 재개 요청일 때만 진행 |
| H 값 있음 (G와 무관) | 신규 생성·재발행 건너뛰기. 필요한 경우 URL의 실제 글 확인 후 누락 시트 정보만 복구 |
| G/H 공란인데 L 값 있음 | 상태 불일치 검토. 확인 전 신규 생성 금지 |

> **주의**: G/H 공란만으로 기존 글이 없다고 단정하지 않는다. 직전 실행이 Blogger 저장 후 시트 쓰기에 실패했을 수 있으므로 `blogger-state.json`의 blogId/postId/editorUrl/게시 URL과 해당 블로그의 기존 글을 대조한다.

### 4.2 Space 실행과 저장/발행

1. **ego-browser 프로필 전환 ('순분' 프로필 사용)**:
   - Blogger 업로드 및 발행 작업 시 기본 브라우저 프로필이 아닌 **'순분' 프로필(`name: "순분"`, `profileId: "Profile 2"`, 계정 `soonboon3265@gmail.com`)** 세션을 사용하도록 TaskSpace를 생성한다.
   - ego-browser SDK 실행 시 `await profiles()` 목록에서 `name === "순분"`인 프로필 ID를 동적으로 탐색하고, 신규 TaskSpace 생성 시 `{ profileId: targetProfile.id }` 옵션을 전달한다:
     ```javascript
     const profileList = await profiles();
     const soonboonProfile = profileList.find(p => p.name === '순분' && p.id === 'Profile 2');
     if (!soonboonProfile) throw new Error('요청한 순분 / Profile 2 프로필을 확인하지 못함');
     const task = await taskSpace(spaceName, { profileId: soonboonProfile.id });
     ```
   - '순분' 프로필에 유지된 Google/Blogger 로그인 세션을 사용한다. 미등록·로그아웃·추가 인증이면 사용자 확인을 요청하고 기존 Space를 보존한다. 이름/ID 불일치를 기본 프로필이나 임의 임포트로 우회하지 않는다.
2. **대상 Blogger 관리자 페이지 접속 및 Space 배정**:
   - 조정자가 작업 행 잠금을 확보하고 `키워드/행 → blogId/postId → spaceId → 폴더`를 기록한다.
   - **접속 Blogger URL 식별**: 시트 탭 이름(카테고리)에 대응하여 [2절 카테고리 매핑표]의 URL(`https://www.blogger.com/blog/posts/<blogId>?hl=ko`)로 이동(`await page.goto(bloggerUrl)`)한다. 사용자가 특정 URL/ID를 직접 지정한 경우 해당 주소를 우선한다.
   - **동시 활성 Space는 최대 3개**: 키워드 하나당 고유 Space 1개. 3개 이상이면 3개씩 병렬 진행하고 슬롯이 비면 다음 대상을 시작한다. 대기 중인 Space도 활성 슬롯에 포함하며 4번째 Space를 만들지 않는다.
3. **단일 글 순차 처리와 공유 자원 직렬화**:
   - 글 안의 이미지 업로드 → URL 매핑 → 본문 적용 → 저장/발행은 순차 처리한다.
   - 뷰포트 변경, 스크린샷 캡처, 네이티브 파일창 등 공유 자원 구간은 직렬화한다.
4. **새 글 생성 및 ID 확보**:
   - 새 글 만들기 직전 G/H와 키워드를 재확인한다.
   - 새 글 생성 후 글 ID가 생기면 이미지 업로드 전에 `blogger-state.json`에 즉시 기록한다. 생성 응답이 불명확하면 목록을 먼저 조회하고 새 글 버튼을 연타하지 않는다.
5. **이미지 업로드와 토큰 치환**:
   - TXT의 이미지 순서·파일명·경로·IMG ID를 대조해 업로드한다.
   - 실제 URL을 HTML의 `{{BLOGGER_IMAGE_URL_IMG_01}}` 토큰에 치환하고 TXT에 반영한다. 기존 업로드 URL과 원격 이미지는 재사용한다.
6. **초안 저장 및 G열 반영**:
   - 본문과 4.3절의 최종 메타데이터를 한 번에 적용한다. 실제 저장 표시 후 같은 편집기에 한 번 재진입하여 본문·제목·검색 설명·라벨·적용 가능한 주소를 묶어서 확인한다.
   - 로컬 `blogger-state.json`에 `draft_saved`, blogId/postId/editorUrl, 저장 확인 시각을 먼저 기록한다.
   - 조정자가 G를 `ㅇ`로 갱신하고 재조회한다. (초안 저장 요청은 여기서 완료, H/L은 비워 둠)
7. **공개 발행**:
   - 0절의 구조 검사와 저장본 확인을 마치면 같은 글을 발행한다. 미리보기는 0절의 조건에 해당할 때만 사용한다.
   - 발행 직전 H가 여전히 공란인지 재확인한다.
8. **공개 글 URL 및 H/L열 반영**:
   - 목록의 동일 postId 행에서 게시됨과 보기 링크를 확인하고, 그 공개 페이지에서 제목·canonical·이미지 로딩·메타·발행 시각을 한 번에 읽는다. 편집기/미리보기/예약 URL을 완료 주소로 쓰지 않는다.
   - 로컬 상태를 `published`로 기록하고 원래 발행 시각을 고정한다.
   - 조정자가 H에 URL, L에 날짜·시간 일련값을 함께 쓰고, G가 누락되었으면 보완한 뒤 재조회한다.
9. **종료 및 상태 기록**:
   - 요청된 브라우저 작업·검수·근거 저장을 마쳤으면 해당 Space를 종료한다.
   - `blogger-state.json` 경로: `YY_MMDD/{탭}_{키워드}/웹조사/evidence/blogger-state.json`

---

### 4.3 메타데이터 자율 완성 및 주소 처리

- 제목·검색 설명·사용 가능한 맞춤 퍼머링크·라벨은 **TXT의 최종 추천값 우선**이다. 최종값이 없거나 해당 항목이 비어 있으면 본문·메인 키워드·탭을 근거로 에이전트가 그 항목만 직접 작성해 입력한다. 사용자에게 후보 선택이나 작성 허락을 다시 묻지 않는다.
- 제목은 본문 범위를 정확히 요약하고, 검색 설명은 실제 입력란 길이 제한 안에서 핵심 내용을 간결하게 작성한다. 본문에 없는 사실·효과·최신 날짜를 만들어 넣지 않는다. slug는 간결한 영문 소문자·숫자·하이픈, 라벨은 주제와 일치하는 3~5개를 기본으로 한다. 후보 목록 7개 등을 새로 만들 필요는 없다.
- 입력란이 제한하는 길이·문법에 맞춰 자율 조정하고, 채택한 최종값과 `source: txt | generated | adjusted`를 TXT 및 상태에 남긴다. **TXT 파일 자체나 HTML 본문이 없는 경우**까지 새 원고 작성으로 확장하는 규칙은 아니다.
- 라벨은 현재 입력란에 값을 넣고 끝에 실제 키보드 쉼표 입력→Tab으로 확정한다. 저장 전 활성화된 버튼, 저장 후 실제 유지값을 확인한다.
- 맞춤 주소가 사용 가능하면 추천값/자율 작성값으로 설정하되 **한 번의 입력·저장과 통합 재진입 확인**으로 끝낸다. DOM fill만으로 유지되지 않았던 경로를 반복하지 않는다. 현재 UI의 입력 확정 방식을 사용하고, 저장 유지가 확인되지 않거나 기능이 없으면 Blogger 자동 주소로 진행하여 결과에 기록한다. 확인되지 않은 방법을 성공한 방식이라고 문서화하지 않는다.
- 자동 주소가 정상 공개되면 발행 성공으로 처리하고 추천값과의 차이만 비고로 남긴다. 이미 공개된 주소를 바꾸려고 초안으로 되돌리거나 재발행하지 않는다. 사용자 지정 주소가 절대 조건으로 명시된 경우에는 발행 전에 그 조건 충족 여부를 확인한다.
- 요청한 글 설명이 공개 head에 있으면 완료한다. 테마 공통 설명 중복·미리보기 가젯 오류 등 글과 무관한 현상은 작업을 확장하거나 재발행할 이유가 아니다.

## 5. 코드로 처리하는 범위 (`tools/blogger_workflow.py`)

[tools/blogger_workflow.py](../tools/blogger_workflow.py)는 파일 검사, 로컬 동시 실행 잠금, 헤더 기반 열 찾기, 신규 업로드 사전 검사(`preflight`), KST 날짜 변환 및 batchUpdate 계획 작성을 지원한다.

```powershell
# 1. B 단계 작업 잠금 확보
python3.14-64.exe tools/blogger_workflow.py --no-notify claim 'YY_MMDD/_blogger_runs/RUN_ID/job.json'
# 반환된 JSON을 UTF-8 파일 도구로 claim.json에 저장한다. PowerShell 5.1의 >는 사용하지 않는다.

# 2. 시트 snapshot 사전 점검 (G/H/L 상태 판정)
python3.14-64.exe tools/blogger_workflow.py --no-notify preflight 'snapshot.json'

# 3. 초안 저장 또는 발행 이벤트 계획 생성
python3.14-64.exe tools/blogger_workflow.py --no-notify sheet-plan 'snapshot.json' 'event.json'
# 계획은 연결 Sheets 도구로 적용한다. 필요할 때만 반환 JSON을 UTF-8로 저장한다.

# 4. 작업 완료 후 잠금 해제
python3.14-64.exe tools/blogger_workflow.py --no-notify release 'YY_MMDD/_blogger_runs/RUN_ID/claim.json'
```

- `job.json` 예시 (`stage: B`):
  ```json
  {"spreadsheetId":"1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s","tab":"앱사용","row":50,"folder":"26_1107/앱사용_당근마켓 전국검색","stage":"B","owner":"실제-실행-ID"}
  ```
- `event.json` 예시:
  - 초안 저장 완료 시:
    ```json
    {"type":"draft","verified":true,"blogId":"실제ID","postId":"실제ID","savedAt":"2026-11-08T20:00:00+09:00"}
    ```
  - 공개 발행 완료 시:
    ```json
    {"type":"published","verified":true,"blogId":"실제ID","postId":"실제ID","url":"https://app.supportimes.com/entry/실제글.html","publishedAt":"2026-11-08T20:00:00+09:00"}
    ```

---

### 5.1 새 코드 작성 최소화

- 파일 검사·잠금·열 매핑·공란 판정·KST 변환·시트 계획은 기존 `tools/blogger_workflow.py`의 `scan/claim/preflight/sheet-plan/release`를 우선 재사용한다. 같은 로직의 임시 Python 프로그램을 매번 만들지 않는다. 실제 시트 쓰기는 연결 도구로만 수행한다.
- 브라우저는 7절의 검증된 조작을 사용한다. 업로드 반복은 파일별 스크립트 대신 하나의 순차 루프로 묶고 각 이미지 완료마다 상태를 저장한다. 코드가 길다는 이유로 안전한 중간 상태 기록을 없애지 않는다.
- 설치된 ego 스킬이 요구하는 **라운드별 UTF-8 `.mjs`**는 유지하되 한 파일에는 의미 있는 단계와 그 결과 대기를 묶는다. 단계 예: 접속·중복 확인 / 생성·ID 기록 / 이미지 업로드 루프 / 본문·메타·저장 / 재진입 통합 확인 / 발행 / 공개 확인·종료. 고정 호출 횟수를 맞추려고 중간 오류를 무시하지 않는다.
- `.session`의 과거 mutation 스크립트를 다시 실행하거나 옛 postId/Space/ref를 복사하지 않는다. 현재 상태와 새 입력으로 최소 실행 코드를 구성하고, 이미 존재하는 일반 함수만 가져다 쓴다. 이 문서는 모든 단계를 무인 실행하는 새 프로그램이 설치됐다는 뜻이 아니다.
- 일반 업로드 중에 새로운 프레임워크·래퍼·테스트·진단 스크립트를 만들지 않는다. 기존 도구의 실제 결함이 있을 때만 해당 부분을 수정한다. 단순 로컬 치환·상태 기록은 기존 실행 단계에 포함한다.

## 6. 코드 변경 시에만 수행하는 검증

일반 업로드나 문서 변경 때 아래 테스트를 매번 실행하지 않는다. `tools/blogger_workflow.py`의 동작을 수정한 경우에 실행한다.

```powershell
python3.14-64.exe -m unittest discover -s tools -p test_blogger_workflow.py -v
```

## 7. 검증된 ego-browser 조작 경로

현재 페이지에서 관찰한 요소만 사용한다. 아래 이름과 selector는 2026-11-08 성공 기록이며 UI가 다르면 해당 패널만 다시 관찰한다. 저장된 숫자 ref는 재사용하지 않는다.

| 작업 | 성공 경로·결과 조건 |
|---|---|
| 검색·대상 확인 | `input[aria-label="검색"]` 입력→Enter. URL의 q 및 갱신된 목록을 확인하고 같은 blogId/postId 대조. |
| 생성 | `새 글 작성`→편집 URL과 제목 입력란 대기→postId 로컬 기록. |
| 이미지 | `이미지 삽입`→`컴퓨터에서 업로드`→`찾아보기` 표시 대기→`setInputFiles('input[type=file]',[절대경로])`→`레이아웃 선택` 대기→`원본 크기`→`확인`. CodeMirror의 해당 파일명/실제 URL 확인, 상태 저장 후 다음 파일. |
| HTML | 가시적인 `.CodeMirror`의 `CodeMirror.getValue()` / `setValue(html); save()`. 임시 업로드 이미지 목록은 완성 HTML로 교체하여 중복 방지. |
| 제목·설명 | `input[aria-label="제목"]`, 펼친 `검색 설명 입력` 필드. 현재 입력란 제한 준수. |
| 라벨 | 펼친 `쉼표로 라벨을 구분하세요.` textbox의 현재 ref로 입력→끝에 `keyboard.type(',')`→Tab. 문자열 표시만으로 완료 판정 금지. |
| 저장 | `옵션 더보기`→`저장`→가시적인 `변경사항이 저장되었습니다.` 확인. `goto(editorUrl,{waitUntil:'domcontentloaded',timeout:30000})` 재진입 1회 후 본문·메타 통합 비교. 본문은 CRLF/LF만 정규화. |
| 발행 | H 공란 live 확인→`게시`→게시 확인 대화상자의 `확인`→같은 postId 목록 행의 `게시됨` 대기. |
| 실제 URL | 해당 목록 행의 편집 링크 hover→`보기` href를 읽어 공개 페이지 이동. slug로 URL을 추정하지 않음. |
| 완료 | 공개 제목·canonical·이미지/메타·발행 시각 묶음 확인→로컬→시트→재조회. claim 해제와 `finish({keep:[]})` 각 1회. |

퍼머링크는 4.3절의 조건부 처리이며 성공이 검증되지 않은 입력 방법을 표에 넣지 않는다. 이미지 확대 링크가 필요한 경우 실제 업로드 href를 사용한다. 기존 원고의 이미지·캡션을 이유 없이 다시 편집하지 않는다.

## 8. 재시도 금지 경로와 조건부 참고

| 이전 실패·낭비 | 다음 실행 기준 |
|---|---|
| 네이티브 파일창 이벤트 시간초과 | 같은 시도 반복 금지. 준비된 업로드 UI의 `input[type=file]` 사용. |
| 메뉴 전환 직후 입력 탐색, URL 변경 직후 오래된 DOM | 고정 sleep 대신 메뉴/대화상자/대상 UI 조건 대기. 숨겨진 이전 필드 대신 현재 패널 ref 사용. |
| 빈 `textarea.Fdco1c`로 HTML 판정 | 가시적인 CodeMirror의 실제 값 사용. |
| 라벨 fill+Tab만으로 미저장 | 7절의 실제 키보드 확정 경로. 저장 후 한 번 확인. |
| 맞춤 slug 입력값만 보고 성공 판정 | 4.3절 통합 저장 확인. 실패 반복·미리보기 주소 조합 금지, 가능한 경우 자동 주소 사용. |
| 기존 preview의 popup 대기·오래된 본문·iframe 추가 탭 | 기본 미리보기 생략. 조건부 검수가 필요한 경우에만 아래 과거 기록 참고. |
| 이미지마다 화면·전체 코드 출력 | 한 순차 루프, 결과는 IMG ID·개수·실패만 반환. |
| 공개 src의 s1600→s1600-rw 변환 | 동일 리소스/파일명·로딩 확인. URL 문자열 차이만으로 재업로드 금지. |
| 성공한 글을 시트 오류 때문에 다시 생성·발행 | 동일 postId/URL/원래 시각 보존, 시트만 복구. |

첫 실행의 상세 증거·미리보기 복구·중단 사례는 [과거 실측 기록](archive/BLOGGER_UPLOAD_20261108.md)에 보관한다. 일반 실행에서는 읽지 않고 해당 오류가 생겼을 때 필요한 항목만 읽는다. 앱사용 49행의 실제 자동 주소와 H 기록은 사용자가 정상 완료로 확인했으므로 다시 수정하지 않는다.

## 9. 토큰·코드·브라우저 왕복 절감

1. **읽기 범위:** 현재 운영은 0~5절·7~9절, 관련 가이드의 필요한 절과 설치된 ego 스킬을 읽는다. 스킬은 끝까지 읽는다. 같은 실행에서 읽은 문서·헤더 매핑은 변경이 없으면 재사용하고 archive·과거 라운드 전체를 기본 입력으로 넣지 않는다.
2. **상태 중심 재개:** tab/실제 행/keyword/폴더/헤더 매핑/Space/글 ID/이미지 URL/완료 단계/다음 단계는 `blogger-state.json` 한 곳에서 찾는다. 완료된 업로드·본문 적용은 되풀이하지 않는다. 저장 기록을 live 상태의 대체물로 쓰지는 않는다.
3. **출력 제한:** HTML·URL 전체는 파일에 보존한다. 기본 반환은 단계·ID·본문 hash/길이·이미지/alt/캡션 개수·저장 여부·불일치 목록으로 제한한다. snapshot은 새로운 UI 판단이나 오류 때만 해당 패널을 읽고, screenshot은 0절의 조건일 때만 사용한다.
4. **한 번에 확인:** 본문/메타 저장 확인은 한 번의 재진입에서, 공개 확인은 한 번 연 공개 탭에서, 시트 확인은 대상 행의 좁은 범위 한 요청에서 처리한다. 기본 미리보기·뷰포트 변경·필드별 재로드·같은 화면 반복 확인은 없다.
5. **최신성 유지:** 생성 직전, 발행 직전, 시트 쓰기 직전, 쓰기 후의 필요한 live 검사는 유지한다. 같은 시점에 쓰는 대상 셀과 키워드·수식·유효성 정보는 한 요청으로 묶는다. 이전 단계의 조회를 나중 쓰기의 직전 조회로 간주하지 않는다.
6. **실패 시 국소 복구:** 실패한 단계의 현재 상태를 한 번 관찰하고 검증된 대안으로 진행한다. 성공한 mutation을 맹목적으로 재실행하지 않는다. 인증/사용자 제어 대기는 같은 Space·글을 유지한다.
7. **기록·보고:** 성공 결과는 기존 상태를 갱신하고 새로운 발견이 있을 때만 가이드를 수정한다. 매번 같은 성공 로그를 문서에 추가하지 않는다. 표와 실제 URL·이미지 수·G/H/L 결과·미해결만 보고한다. 미리보기 생략은 검수 실패가 아니며 실시 여부를 사실대로 기록한다.

이 최적화는 불필요한 작업을 생략하는 운영 기준이다. 실행 시간·토큰 절감률은 측정 전 수치로 단정하지 않는다. 다음 실행용 요청문은 [blogger-upload-request-prompt.md](../블로그작성_가이드라인/blogger-upload-request-prompt.md) 한 개만 사용한다.

