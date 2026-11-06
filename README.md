# ego-light-adsense-info-blog

애드센스 정보 블로그 프로젝트입니다. 최신 정보 수집, 콘텐츠 작성, 애드센스 광고 상태 검증을 위해 두 가지 강력한 크롬 브라우저 자동화 도구(`sderosiaux/chrome-agent` & `captivus/chrome-agent`)가 통합 적용되어 있습니다.

---

## 🛠 설치 및 구성된 브라우저 에이전트

### 1. `sderosiaux/chrome-agent` (Rust CLI)
- **실행 커맨드**: `.\bin\ca-rust.cmd` (또는 PowerShell: `.\bin\ca-rust.ps1`)
- **특징**: 초경량(~3MB) 단일 바이너리, 무종속성, 초고속 웹페이지 파싱
- **핵심 기능**:
  - `read`: Mozilla Readability 기반 순수 본문 마크다운 추출 (광고/사이드바 자동 제거)
  - `extract`: 반복 레코드(목록, 순위, 상품 등) 자동 구조화 추출
  - `goto --inspect`: 접근성 트리 기반 고유 식별자(`uid`) 추출 및 정밀 UI 인터랙션
  - `--stealth`, `--copy-cookies`: 봇 방지 우회 및 로컬 브라우저 쿠키 연동

### 2. `captivus/chrome-agent` (Python CDP Client)
- **실행 커맨드**: `.\bin\ca-py.cmd` (또는 PowerShell: `.\bin\ca-py.ps1`)
- **특징**: Python 3.11 가상환경 기반, 100% 완전한 Raw Chrome DevTools Protocol(CDP) 제어
- **핵심 기능**:
  - `launch` / `status` / `stop`: 다중 브라우저 인스턴스 라이프사이클 관리
  - `attach`: 네트워크 요청 및 콘솔 이벤트 실시간 구독
  - `save` / `restore`: 암호화된 세션 스냅샷 저장 및 복구
  - **미트백 래더(Meatbag Ladder)**: CDP `Input` 기반 `isTrusted=true` 하드웨어 신호 생성으로 Cloudflare Turnstile, reCAPTCHA v2 돌파
  - Python 코드 레벨의 비동기 `CDPClient` 완벽 지원

### 3. `citrolabs/ego-lite` (AI 전용 브라우저)
- **특징**: 사용자의 크롬 로그인 세션(쿠키, 2FA)을 상속받아 마우스 방해 없이 백그라운드 독립 Space에서 작업
- **스킬 연동**: `npx skills add citrolabs/ego-lite`
- **하이브리드 결합**: ego-lite의 디버깅 포트(9222)에 `ca-rust`(`--connect`) 또는 `ca-py`(`attach`)를 붙여 로그인된 관리자 화면을 초저비용으로 스크랩하거나 패킷 감시 수행

---

## 4. agent-desktop 1.2.0 및 ego-lite 출력 절감

공식 `vercel-labs/agent-desktop` 배포 패키지를 프로젝트 내부에 버전 고정 설치했다. Windows UI Automation으로 네이티브 앱·창을 처리하며 웹 본문 수집에는 ego SDK/ca-rust를 사용한다.

```powershell
./tools/install-agent-desktop.ps1
./bin/agent-desktop.cmd status
./bin/agent-desktop.cmd skills get desktop
./bin/agent-desktop.cmd skills get platform
```

`tools/research_observe.mjs`는 ego 웹 본문을 로컬 저장하고 기본 1,500자만 반환하며, 중복 출력 생략과 브라우저 없는 추가 구간 읽기를 제공한다. 세부 사용법과 검증 범위는 [agent-desktop 가이드](guidelines/AGENT_DESKTOP_GUIDE.md), 현재 하이브리드 조합은 [통합 가이드 3절](guidelines/CHROME_AGENTS_USAGE_GUIDE.md)을 따른다. 종전 고정 9222 포트 연결을 ego 기본 경로로 가정하지 않는다.

## 🚀 빠른 시작 (Quick Start)

### 1. 웹페이지 글감 및 목록 데이터 자동 수집
```bash
# IT 뉴스 목록 추출
.\bin\ca-rust.cmd goto https://news.ycombinator.com
.\bin\ca-rust.cmd extract --limit 5

# 기사 본문 자동 수집 및 마크다운 파일 생성
.\.venv\Scripts\python.exe tools/collect_blog_material.py https://example.com/article
```

### 2. 애드센스 광고 태그 및 네트워크 상태 진단
```bash
.\.venv\Scripts\python.exe tools/check_adsense_network.py https://my-blog-url.com
```

---

## 📂 프로젝트 구조

```
ego-light-adsense-info-blog/
├── bin/
│   ├── ca-rust.cmd / ca-rust.ps1    # sderosiaux chrome-agent 실행 래퍼
│   └── ca-py.cmd / ca-py.ps1        # captivus chrome-agent 실행 래퍼
├── guidelines/
│   └── CHROME_AGENTS_USAGE_GUIDE.md # 크롬 에이전트 상세 매뉴얼 및 비교 문서
├── 블로그작성_가이드라인/
│   └── 04_웹자료수집_크롬에이전트_활용법.md # 블로그 작성자를 위한 실전 가이드
├── tools/
│   ├── browser_agents.py            # 파이썬 통합 인터페이스 (Rust & Python 에이전트 클래스)
│   ├── collect_blog_material.py     # 글감 수집 자동화 스크립트
│   └── check_adsense_network.py     # 애드센스 네트워크 및 광고 단위 진단 도구
├── .tools/
│   └── chrome-agent-rust/           # sderosiaux Rust 바이너리 패키지
└── .venv/                           # Python 3.11 가상환경 (captivus chrome-agent 설치)
```

---

## 📖 상세 매뉴얼 문서
- [크롬 에이전트 통합 사용 가이드](guidelines/CHROME_AGENTS_USAGE_GUIDE.md)
- [블로그 웹자료 수집 및 애드센스 검증 가이드](guidelines/크롬에이전트_활용법.md)
- [키워드별 웹자료수집 표준](guidelines/웹자료수집.md)
- [agent-desktop 통합 및 출력 절감](guidelines/AGENT_DESKTOP_GUIDE.md)

