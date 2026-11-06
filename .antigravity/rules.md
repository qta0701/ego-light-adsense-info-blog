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

## 3. 브라우저·데스크톱 에이전트 선택 지침 (2026-11-06 갱신)

1. **ego-browser / ego-lite**: 로그인 세션과 격리 TaskSpace가 필요한 웹 작업. 설치된 `ego-browser skill`을 끝까지 읽고 공개 SDK를 사용한다. 고정 9222 포트나 외부 브라우저 연결을 가정하지 않는다. 사용자 제어 전환·권한 프롬프트·추가 인증은 다른 도구로 우회하지 않는다.
2. **sderosiaux/chrome-agent** (`bin/ca-rust.cmd`): 독립된 공개 웹 자료의 `read`, `extract`, A11y 조회. 본문·목록·출력 길이를 제한하고 실제 토큰 절감률을 측정 전 단정하지 않는다.
3. **captivus/chrome-agent** (`bin/ca-py.cmd`): 허용된 브라우저의 Raw CDP·애드센스 Network 진단. 필요한 이벤트만 구독한다. 캡차나 2FA를 자동 돌파하는 기본 경로로 사용하지 않는다.
4. **vercel-labs/agent-desktop 1.2.0** (`bin/agent-desktop.cmd` / `.ps1`): Windows 네이티브 앱·창을 UI Automation으로 관찰·조작하는 보완 CLI. 최초 사용 전 `status`, `skills get desktop`, `skills get platform`을 확인한다. 앱/창을 지정한 skeleton→subtree 관찰을 사용하고 원시 전체 JSON을 반복 출력하지 않는다. OS 창 관찰은 ego TaskSpace와 격리되지 않으며 자동으로 해당 Space를 선택하지 않는다. `--headed`를 자동 활성화하지 않는다.

### 토큰·왕복 최소화
- 연결된 정식 API/도구로 충분한 저장소·시트 작업은 해당 도구를 우선한다.
- ego 웹조사 본문은 `tools/research_observe.mjs`의 `observePage`로 로컬 저장하고 기본 1,500자·링크 5개만 반환한다. 내용이 같으면 본문 재출력을 생략한다. 추가 읽기는 `readPageEvidence`의 offset 구간을 사용한다. 저장본을 현재 조작 상태로 간주하지 않는다.
- 한 페이지의 근거가 확보된 작업과 최종 확인을 한 라운드로 묶고, 필요한 중간 판단은 유지한다. 서로 다른 도구의 refs를 섞지 않는다. 스크린샷은 결과물과 시각 검수에 필요할 때 사용한다.
- `EgoLiteBridge`는 레거시 외부 CDP 어댑터다. 포트가 열렸다는 사실만으로 ego·로그인 세션·TaskSpace 격리를 검증했다고 처리하지 않는다.

상세 기준: `guidelines/CHROME_AGENTS_USAGE_GUIDE.md` 3절, `guidelines/AGENT_DESKTOP_GUIDE.md`, `guidelines/웹자료수집.md` 7절.

---
*이 파일의 내용은 Antigravity AI가 대화를 시작하거나 작업을 수행할 때 항상 최우선으로 고려해야 합니다.*
