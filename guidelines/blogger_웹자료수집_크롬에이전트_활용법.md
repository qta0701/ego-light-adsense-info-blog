# [블로그 작성 가이드] 크롬 에이전트를 활용한 고품질 웹자료 수집 및 애드센스 검증

본 문서는 애드센스 정보 블로그(`ego-light-adsense-info-blog`)를 운영할 때, 최신 정보성 포스팅을 신속하고 정확하게 작성하기 위해 크롬 에이전트 도구를 활용하는 실전 가이드입니다.

---

## 1. 정보성 블로그 작성 시 문제점과 해결책

- **문제점**:
  1. 기사나 레퍼런스 페이지를 복사할 때 광고, 불필요한 배너, 내비게이션 요소가 섞여 원문 정리가 번거로움.
  2. 순위표, 스펙 비교표, 통계 자료를 수작업으로 마크다운 표로 옮기기 어려움.
  3. 로그인이나 봇 방지(Cloudflare 등)가 걸려있는 최신 트렌드 사이트 크롤링 제한.
  4. 내 블로그에 애드센스 광고가 실제로 정상 송출되고 있는지 확인이 어려움.

- **해결책**:
  - `sderosiaux/chrome-agent` (`ca-rust`): **Mozilla Readability** 엔진으로 순수 본문만 0.5초 만에 추출 + **MDR 구조화 추출**로 통계/순위 목록 자동 추출 (토큰 90% 절약).
  - `captivus/chrome-agent` (`ca-py`): **CDP Network 모니터링**으로 애드센스 광고 요청 상태 및 코드 삽입 검증, **미트백 래더(Meatbag Ladder)**로 캡차·안티봇 돌파.
  - `citrolabs/ego-lite`: **로그인 세션(쿠키, 2FA) 상속** 및 마우스 커서를 빼앗기지 않는 **격리된 전용 Task Space** 제공.

---

## 2. 블로그 글감 수집 3단계 워크플로우

### Step 1. 트렌드 키워드 및 목록 추출 (`extract`)
IT 트렌드, 새로운 기술 발표, 인기 앱/제품 순위 목록을 즉시 추출합니다.

```bash
# IT 최신 뉴스 목록 상위 10개 추출
.\bin\ca-rust.cmd goto https://news.ycombinator.com
.\bin\ca-rust.cmd extract --limit 10
```

### Step 2. 핵심 원문 본문 정밀 추출 (`read` / 자동 수집 도구)
선정한 글감의 공식 문서나 원본 기사 본문을 클린 텍스트로 추출하여 블로그 자료로 저장합니다.

```bash
# 단일 명령어로 원문 자료를 26_1106 폴더에 자동 마크다운 정리
.\.venv\Scripts\python.exe tools/collect_blog_material.py https://target-news-site.com/article-123
```

생성된 파일은 다음과 같이 정리되어 저장됩니다:
- **메타데이터**: 기사 제목, 출처 URL, 수집 일시
- **본문 요약**: 광고/메뉴가 완전히 제거된 순수 본문 마크다운
- **구조화 데이터**: 표 또는 리스트 형태의 수치 데이터

### Step 3. 봇 방지 사이트 및 SNS 자료 수집 (`--stealth`, `--copy-cookies`)
X(트위터), 티스토리, 네이버 블로그 등 로그인이 필요하거나 봇 차단이 있는 사이트 자료를 수집할 때:

```bash
# 내 PC의 크롬 쿠키를 그대로 활용하여 로그인된 상태로 안전하게 접근
.\bin\ca-rust.cmd --copy-cookies --stealth goto https://x.com/home --inspect
```

---

## 3. 발행 후 애드센스 광고 상태 점검 (`check_adsense_network.py`)

글을 발행한 후, 내 블로그 포스팅에 애드센스 광고가 문제없이 게재되고 있는지 검사합니다.

```bash
.\.venv\Scripts\python.exe tools/check_adsense_network.py https://myblog.com/posts/adsense-guide
```

### 점검 항목:
1. `adsbygoogle.js` 공식 스크립트 정상 호출 여부
2. 내 퍼블리셔 ID (`ca-pub-XXXXXXXXXXXXXXXX`) 정확도
3. 광고 단위(`<ins class="adsbygoogle">`)의 렌더링 상태 (`filled` vs `unfilled`)
4. 광고 차단기(AdBlock)나 네트워크 정책으로 인한 구글 광고 도메인 차단 여부

---

## 4. ego-lite 브라우저와 연계한 하이브리드 블로그 워크플로우

블로그 관리자(티스토리, 네이버, 워드프레스, 구글 Search Console)는 2단계 인증(2FA)이나 로그인 세션이 필수적입니다. 이때 **citrolabs/ego-lite**를 결합하면 완벽한 자동화가 가능합니다.

### 1) ego-lite 기반 로그인 세션 공유
- 사용자가 `ego-lite` 브라우저에서 티스토리나 네이버 블로그에 로그인합니다.
- `ego-lite`는 기존 크롬의 쿠키와 세션을 상속받아 독립된 `Space`에 유지하므로, AI 에이전트가 백그라운드에서 작업하는 동안 사용자의 마우스나 활성 화면을 전혀 방해하지 않습니다.

### 2) 외부 에이전트 결합 (`ca-rust` + `ca-py`)
- **초저비용 데이터 조회**: `ego-lite`가 띄워놓은 디버깅 포트(9222)에 `ca-rust --connect http://127.0.0.1:9222 goto https://admin.blog.com --inspect`로 붙어, 관리자 페이지의 복잡한 DOM을 200토큰 내외의 A11y 트리로 압축해 빠르게 조회합니다.
- **안티봇·캡차 대응**: 티스토리나 네이버에서 보안 캡차가 뜰 경우 `ca-py`의 `Input.dispatchMouseEvent`를 통해 실제 하드웨어 입력(`isTrusted=true`) 신호를 전송하여 통과합니다.


