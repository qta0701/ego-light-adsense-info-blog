# HTML 콘텐츠 및 메타 TXT 작성 가이드 (Blogger Content Creation Workflow)

2026-11-08 분리 갱신. 이 문서는 수집된 웹조사 결과 및 캡처 이미지를 바탕으로 Blogger 게시용 HTML 본문과 제목·메타디스크립션 TXT를 작성하고 구글시트에 작성 완료(D열)를 기록하는 **A 프로세스 전용 가이드라인**이다. (작성된 결과물의 Blogger 업로드 및 발행 인계는 [BLOGGER_UPLOAD_WORKFLOW.md](BLOGGER_UPLOAD_WORKFLOW.md)를 참조한다.)
실행 원칙은 **키워드마다 실제 독립 채팅 배정(단일 세션인 경우 고품질 순차 작성)**이다.

- 수집 기준: [웹자료수집.md](웹자료수집.md)
- 본문 구성 및 이미지 계약: [html-content-guide.md](../블로그작성_가이드라인/html-content-guide.md)
- HTML 스타일 및 컴포넌트: [html-style-guide.md](../블로그작성_가이드라인/html-style-guide.md)
- 복사용 프롬프트: [blogger-content-create-prompt.md](../블로그작성_가이드라인/blogger-content-create-prompt.md)
- 시스템 코딩 지침: [.antigravity/rules.md](../.antigravity/rules.md), [데스크톱 가이드](AGENT_DESKTOP_GUIDE.md)

---

## 1. 대상과 인계 자료

1. **시작 전 확인**:
   - 현재 프로젝트 `guidelines/`의 `.md` 파일 존재를 확인한다. 없으면 경로 오류로 중단한다.
   - [.antigravity/rules.md](../.antigravity/rules.md), [데스크톱 가이드](AGENT_DESKTOP_GUIDE.md)를 먼저 확인한다.
2. **대상 구글시트**:
   - [애드센스 콘텐츠표](https://docs.google.com/spreadsheets/d/1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s/edit)
   - 작업 식별자: `spreadsheetId + sheetId + 탭 + 실제 행 번호 + 메인 키워드 + 키워드 폴더`
   - `No.` 열의 번호를 실제 시트 행 번호로 대체하지 않는다. **사용자가 지정한 탭과 실제 행 번호**, 메인 키워드를 확인한다.
   - 행 번호가 생략된 경우 같은 폴더의 `research.json`/manifest 또는 지정 탭의 키워드 검색으로 유일한 행을 확인하며, 여러 행이 일치하면 임의 쓰기하지 않는다.
3. **입력 자료**:
   - `YY_MMDD/{탭}_{키워드}/웹조사/publish/*_웹조사결과.md`와 발행 대상 이미지.
   - 없으면 상위 `웹조사/`의 구형 Markdown 및 이미지를 확인한다. Markdown의 상대경로를 우선한다.
   - 이미지별 원본·발행 파일명, 역할, 화면 종류, 단계·표식 번호 의미, 권장 순서, 설명·alt·캡션, 출처·실제 화면 URL·확인일을 인계한다.
   - 파일번호, 이미지 내부 표식 번호, 본문 절차 번호를 엄격히 구분한다. 원래 파일명을 보존하고 `IMG_01` 같은 슬롯 ID로 HTML과 TXT를 연결한다. 수집 이미지를 모두 억지로 삽입하지 않는다.
4. **기본 출력물**:
   - `YY_MMDD/{탭}_{키워드}/웹조사/publish/{탭}_{키워드}_html콘텐츠.html`
   - `YY_MMDD/{탭}_{키워드}/웹조사/publish/{탭}_{키워드}_제목메타디스크립션.txt`
   - 반드시 **UTF-8**로 저장하며, 원본 조사 Markdown·이미지·수집 기록은 원본 그대로 보존한다.

---

## 2. 시트 열과 기록 원칙 (A 콘텐츠 작성 관련)

A 단계는 콘텐츠 생성 및 검수 완료 후 **'애드센스 블로그 작성여부'(D열)**에 완료 표식을 기록한다.

| 목적 | 실제 헤더명 | 현재 참고 열 | 쓰는 시점과 값 |
|---|---|---|---|
| 콘텐츠 작성 완료 | 애드센스 블로그 작성여부 | D | HTML/TXT 두 파일 생성 및 검수 완료 후 `ㅇ` |
| 행 식별 | 메인 키워드 | I | 대상 행 대조 및 읽기만 수행 |

1. **셀 값 및 서식 원칙**:
   - `ㅇ`는 한글 자음이다. 영문 `o`, 숫자 `0`, 불리언 등으로 바꾸지 않는다.
   - 공백 문자, 수식 결과 공란, FALSE, 0은 빈 셀로 취급하지 않는다.
   - 쓰기 직전에 **같은 행의 키워드와 대상 셀**을 다시 읽는다. 일치하는 완료값(`ㅇ`)은 보존하고, 다른 값이나 수식이 있으면 덮어쓰지 않는다.
   - 필요한 빈 셀만 정확히 수정하고 저장 후 재조회한다. 다른 열, 전체 행, 서식, 시트 시간대를 변경하지 않는다.
2. **조정자 역할**:
   - 시트 쓰기는 **한 조정자**가 전담한다. 개별 작업 채팅은 완료 근거를 조정자에게 전달하고, 조정자가 시트에 결과를 반영한다.
3. **오류 격리**:
   - 시트 업데이트 실패는 글 생성 실패와 구분한다. 로컬 파일과 작업 기록을 보존하고 **시트 반영만 재시도**한다.

---

## 3. A — 중복 검사 및 독립 채팅 배정 (순차 작성 대응)

### 3.1 생성 전 중복 판정

`YY_MMDD/{탭}_{키워드}/` **전체 하위 경로**에서 정확한 두 결과물 파일명을 찾는다. 루트, `웹조사/`, `웹조사/publish/`, 구형 `outputs/` 등을 모두 포함한다.

| 발견 상태 | 처리 방침 |
|---|---|
| 두 파일 모두 없음 | 신규 생성 후보 |
| 같은 폴더에 정상 크기의 두 파일 각 1개 | 생성 건너뛰기; 경로와 상태 보고 |
| 한 파일만 있음, 빈 파일, 서로 다른 위치의 쌍 | 부분 결과 검토; 자동 재생성·덮어쓰기 금지 |
| 동일 파일명이 여러 곳에 존재 | 중복본 검토; 임의 선택·삭제·새 생성 금지 |

- 파일 존재만으로 내용 검수가 완료됐다고 판단하지 않는다. 기존 두 파일이 있으나 D가 누락됐다면 재생성 없이 실제 내용을 검수한 후 시트 기록을 복구한다.
- D가 이미 `ㅇ`인데 파일이 없다면 유실/다른 경로 여부를 확인하고 즉시 재생성하지 않는다.
- 2026-11-08 앱사용 46행 사전 점검 사례: D=`ㅇ`지만 해당 HTML/TXT 쌍이 프로젝트에 없고 조사 자료만 있었다. B 업로드에서도 이 불일치를 확인해야 한다. 경로 확인 또는 명시적 재작성 의사 확인 전에는 새 Blogger 글을 생성하지 않는다. 확인한 범위·시트 값·재개 지점을 로컬 상태에 남긴다.

### 3.2 독립 채팅 배정 및 실행 장벽

1. **신규 생성 대상 확정**:
   - 조정자가 대상 목록, 실제 행, 파일 상태와 시트 헤더를 확인해 **실제 신규 생성할 n개 키워드**를 확정한다.
2. **독립 채팅 배정 (Codex/다중 에이전트 환경)**:
   - 키워드별 **실제 독립 채팅 n개**를 생성하여 병렬 처리한다. 단일 키워드도 생성 대상이면 독립 채팅 1개를 배정한다.
   - 생성 전 `YY_MMDD/_blogger_runs/{runId}/dispatch.json`을 `pending`으로 저장한다. 모든 최초 프롬프트에 배정 키워드·폴더·시트 행, 원래 조건, 가이드라인, dispatch 경로를 전달하고 **ready 전에는 사전 점검만** 수행한다.
   - 모든 채팅이 준비되면 `ready`, 실패 시 `blocked`로 남긴다.
3. **Antigravity 단일 세션 환경 대응**:
   - 만약 독립 채팅 자동 생성이 지원되지 않는 Antigravity 환경이라면, **"순차 작성 금지" 제약을 해제하고 현재 조정자 세션에서 키워드의 HTML/TXT를 차례대로 고품질 작성 및 검수**한다. (해당 섹션에서 일괄 순차 진행)
4. **작업 수행 및 검수**:
   - 각 작업은 지정된 한 키워드의 자료만 사용한다.
   - 이미지별 HTML 슬롯(`IMG_01`), TXT 위치 매핑, 파일 존재, 사실 관계, 시각 검수를 완료한 후 결과물 경로를 보고한다. 원본 이미지나 조사 내용을 덮어쓰지 않는다.
5. **D열 시트 반영 및 TXT 작업 정보 기록**:
   - 조정자가 두 결과물과 행 키워드를 재확인하고 **'애드센스 블로그 작성여부'(D열)의 빈 셀에 `ㅇ`**를 기록한 뒤 재조회한다.
   - TXT 메타데이터에 `spreadsheetId, sheetId, 탭, 실제 행 번호, 메인 키워드, runId/threadId, D 반영 상태`를 포함한다.

---

## 4. 코드로 처리하는 범위 (`tools/blogger_workflow.py`)

[tools/blogger_workflow.py](../tools/blogger_workflow.py)는 Python 3.14 표준 라이브러리만 사용한다. **파일 중복 검사, 로컬 동시 실행 잠금, 헤더 기반 열 찾기, 시트 batchUpdate 요청 생성**을 지원한다.

```powershell
# 1. 대상 폴더 파일 스캔 (create / skip_existing / review_partial / review_duplicates 반환)
python3.14-64.exe tools/blogger_workflow.py --no-notify scan 'YY_MMDD/{탭}_{키워드}'

# 2. A 단계 잠금 확보 (폴더·행 배타 잠금)
python3.14-64.exe tools/blogger_workflow.py --no-notify claim 'YY_MMDD/_blogger_runs/RUN_ID/job.json' > 'YY_MMDD/_blogger_runs/RUN_ID/claim.json'

# 3. 작성 검수 완료 후 시트 D열 업데이트 계획 생성
python3.14-64.exe tools/blogger_workflow.py --no-notify sheet-plan 'snapshot.json' 'event.json' > 'sheet-plan.json'

# 4. 작업 완료 후 잠금 해제
python3.14-64.exe tools/blogger_workflow.py --no-notify release 'YY_MMDD/_blogger_runs/RUN_ID/claim.json'
```

- `job.json` 형식 예시 (`stage: A`):
  ```json
  {"spreadsheetId":"1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s","tab":"앱사용","row":50,"folder":"26_1107/앱사용_당근마켓 전국검색","stage":"A","owner":"실제-채팅-또는-실행-ID"}
  ```
- `event.json` 형식 예시 (`type: content`):
  ```json
  {"type":"content","verified":true,"folder":"26_1107/앱사용_당근마켓 전국검색"}
  ```

---

## 5. 검증 명령

```powershell
python3.14-64.exe -m unittest discover -s tools -p test_blogger_workflow.py -v
```
