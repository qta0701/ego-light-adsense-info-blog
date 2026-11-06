# Antigravity AI 코딩 지침 (Coding Rules)

이 파일은 Antigravity AI가 본 프로젝트에서 코드를 수정하거나 새로운 기능을 추가할 때 반드시 준수해야 하는 행동 지침을 담고 있습니다.

## 1. 코드 수정 원칙 (Partial Update First)

- **정밀 수정 우선**: 코드 수정 시 `write_to_file`을 통한 파일 전체 덮어쓰기보다 `multi_replace_file_content` 또는 `replace_file_content` 도구를 우선적으로 사용하여 변경이 필요한 부분만 정밀하게 수정한다.
- **기능 누락 방지**: 수정을 수행하기 전, 기존 파일의 주요 함수와 로직을 스캔하여 의도치 않게 기존 기능이 삭제되거나 누락되지 않도록 철저히 검증한다.
- **가독성 유지**: 수정 후에도 코드의 일관된 들여쓰기와 스타일을 유지하며, 기존 주석을 함부로 삭제하지 않는다.
- **문서화 유지**:  주요 기능 수정 시, `guideline/` 폴더 내의 기존 가이드 파일에 관련 역할과 로직을 즉시 반영한다. 새로운 분야의 기능이 추가될 경우 새로운 `.md` 파일을 생성하여 상세 가이드라인을 문서화한다.

-**알림 및 팝업 정책**: 기존 기능,새로 추가하는 기능들에서 작업완료나,에러 발생으로 인한 중단시, 사용자에게 윈도우 알림음(각 pc사용자명의 기본 윈도우 미디어 경로에 있는 Speech Off.wav에 대응)이 발생하도록 해야함. 또한 윈도우 알림 메세지를 통해 사용자에게 알림 기능을 구현


## 2. 개발 및 런타임 환경 표준 (Runtime Environment Standards)

- **파이썬 3.14 표준 및 동적 경로 준수**: 본 프로젝트는 파이썬 3.14 버전(`python3.14-64.exe`)을 기본 실행 환경으로 삼는다. 다양한 PC 환경에 유연하게 대응하기 위해 절대 경로를 직접 하드코딩하지 않고, 사용자 환경 변수 `PATH`에 등록된 `C:\Users\<유저명>\AppData\Local\Python\bin` 경로 또는 `%USERPROFILE%\AppData\Local\Python\bin` 아래의 `python3.14-64.exe`를 동적으로 탐색하여 실행한다. 향후 신규 프로젝트 생성, 배치 스크립트 작성, 라이브러리 추가 등 모든 작업 시 이 파이썬 3.14 버전의 호환성과 문법을 엄격히 준수한다.
- **다른 PC 환경의 절대 경로 호환성 확보**: 작업 결과물 및 메타데이터(`.json`, `map_path`, `save_dir` 등)에 기록된 타 PC의 절대 경로를 읽거나 쓸 때, 현재 PC 환경의 프로젝트 루트 경로와 결합하여 정상 동작할 수 있도록 반드시 `utils.system_utils.resolve_meta_path` 유틸리티를 적용해 동적으로 경로를 치환 및 정규화하여 사용한다.

## 3. 브라우저 자동화 및 웹 에이전트 도구 선택 지침 (Browser Agent Decision Rules)

본 프로젝트는 AI 에이전트가 브라우저 제어, 웹 리서치, 애드센스 검증을 수행할 수 있도록 3가지 특화 도구를 제공합니다. 에이전트는 사용자의 요청 성격에 따라 다음 판단 기준을 엄격히 준수하여 적절한 도구와 명령어를 선택해야 합니다.

1. **`sderosiaux/chrome-agent` (`.\bin\ca-rust.cmd` / `ca-rust.ps1`)**:
   - **적용 상황**: 웹 검색, 기사/기술 문서 본문 수집(`read`), 뉴스/상품 목록 추출(`extract`), 폼 입력 및 페이지 변경 검증.
   - **핵심 이유**: A11y 접근성 트리를 통한 50~500 토큰 극단 압축으로 LLM API 비용을 90% 이상 절감.
   - **주요 명령어**: `goto --inspect`, `read`, `extract`, `click <uid>`, `fill --uid <uid>`
   - **자동화 스크립트**: `tools/collect_blog_material.py <URL>`

2. **`captivus/chrome-agent` (`.\bin\ca-py.cmd` / `ca-py.ps1`)**:
   - **적용 상황**: Cloudflare Turnstile, reCAPTCHA v2, 슬라이더 퍼즐 등 고도화된 봇 차단 돌파, 애드센스 광고 태그 및 네트워크 패킷/헤더 실시간 감시, 다중 에이전트 동시 관찰.
   - **핵심 이유**: CDP 100% 원시 개방, 미트백 래더(Meatbag Ladder) 기반 하드웨어 수준 `isTrusted=true` 신뢰 이벤트 모사, 격리된 이벤트 스트림(`attach`).
   - **주요 명령어**: `launch --headless`, `attach <인스턴스> +Network.*`, `Page.navigate`, `Input.dispatchMouseEvent`
   - **자동화 스크립트**: `tools/check_adsense_network.py <URL>`

3. **`citrolabs/ego-lite` (Ego-Browser)**:
   - **적용 상황**: 네이버 블로그, 티스토리, 구글 애드센스/Search Console, 인트라넷 등 사용자의 기존 로그인/2FA 세션이 반드시 필요한 웹 콘솔 작업, 사용자가 PC를 사용하는 중에 마우스 방해 없이 백그라운드로 병렬 작업할 때.
   - **핵심 이유**: 사용자의 실제 크롬 프로필/쿠키 상속, 격리된 독립 Task Space 제공.
   - **하이브리드 연동**: ego-lite 디버깅 포트(9222)에 `ca-rust --connect http://127.0.0.1:9222` 또는 `ca-py attach`로 연결하여 로그인된 상태에서 초저비용 추출이나 패킷 감시를 수행.

*상세 기술 가이드 및 하이브리드 조합 패턴은 `guidelines/CHROME_AGENTS_USAGE_GUIDE.md`를 필독하고 참고한다.*

---
*이 파일의 내용은 Antigravity AI가 대화를 시작하거나 작업을 수행할 때 항상 최우선으로 고려해야 합니다.*
