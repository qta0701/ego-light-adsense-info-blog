# agent-desktop 통합 및 저출력 웹조사 가이드

2026-11-06에 공식 저장소와 npm 패키지를 확인하고 **1.2.0**을 프로젝트 내부에 설치했다. OS 접근성 트리(UIA)를 읽고 조작하는 CLI이며 자체 LLM은 없다. 브라우저 본문 수집에는 ego-browser 공개 API 또는 ca-rust를 사용하고, 네이티브 앱·브라우저 밖 창에는 agent-desktop을 보완적으로 사용한다.

## 설치와 재현

- 설치 위치: `.tools/agent-desktop/`. 전역 npm·Codex 설정은 변경하지 않는다.
- `tools/agent-desktop/package.json`, `npm-lock.json`으로 버전과 npm SRI를 고정한다. lock 파일은 설치 시 `package-lock.json`으로 복사한다.
- 출처·검토한 main 커밋·라이선스는 `tools/agent-desktop/provenance.json`에 기록했다. 검토한 main 커밋과 배포 태그는 구분한다. 전체 소스 clone이나 git submodule 대신 공식 배포 패키지를 통합했다.
- Node.js 18 이상과 npm, Windows x64/ARM64가 필요하다. 설치 스크립트는 바이너리 SHA-256도 동봉 sidecar와 비교한다.

```powershell
.\tools\install-agent-desktop.ps1
.\bin\agent-desktop.cmd version
.\bin\agent-desktop.cmd status
.\bin\agent-desktop.cmd skills get desktop
.\bin\agent-desktop.cmd skills get platform
```

설치 완료·오류 중단 시 Windows `Speech Off.wav`와 알림 풍선을 사용한다. 비대화형 검증에서는 `-NoNotify`를 쓸 수 있다. 원시 CLI 호출마다 알림을 띄우지는 않는다. 상태와 refs는 기본적으로 git에서 제외된 `.session/agent-desktop/`에 저장한다. 명시한 `AGENT_DESKTOP_HOME`은 존중한다. 래퍼는 cwd와 무관하게 프로젝트 루트에서 경로를 계산하고 종료 코드·JSON을 그대로 반환한다.

서로 다른 사용자·권한 토큰(샌드박스/사용자 세션 포함)은 같은 private state 파일을 공유할 수 없다. `PERM_DENIED`와 foreign principal 오류가 나면 권한을 낮추거나 파일을 삭제하지 말고, 해당 실행 컨텍스트 전용의 새 경로를 `AGENT_DESKTOP_HOME`으로 지정한다. 예: `$env:AGENT_DESKTOP_HOME = Join-Path (Get-Location) '.session/agent-desktop-sandbox'`. refs도 컨텍스트 간 공유하지 않는다.

## 선택과 하이브리드 실행

| 작업 | 우선 도구 | agent-desktop의 역할 |
|---|---|---|
| 로그인된 웹 콘솔·공식 사이트 탐색 | ego-browser | 네이티브 창이 꼭 필요한 때만 별도 조회 |
| 공개 기사 본문·반복 목록 | ca-rust `read` / `extract` | 추가 호출 불필요 |
| 웹조사 텍스트의 반복 읽기 | ego-browser + `research_observe.mjs` | OS 전체 트리 재조회 불필요 |
| 애드센스 네트워크 진단 | ca-py 또는 ego SDK의 문서화된 CDP | 네트워크 분석 기능을 대체하지 않음 |
| 네이티브 파일창·Windows 앱 | agent-desktop | 앱/창을 한정한 UIA snapshot·ref 조작 |

1. ego-browser의 기존 TaskSpace에서 웹 작업을 진행한다. 네이티브 창이 필요한지 먼저 판단한다. 파일 선택은 지원되는 `setInputFiles`/`waitForFileChooser`를 우선한다.
2. 네이티브 경로가 필요한 경우 `list-apps`, 필요 시 `list-windows --help`로 대상을 확인한다. 여러 창이면 실제 반환된 `--window-id`를 지정한다. 사용자 제어 전환·브라우저 권한 프롬프트·2FA를 다른 도구로 우회하지 않는다.
3. 아래처럼 skeleton으로 범위를 좁히고 실제 반환된 qualified ref로 subtree를 읽는다. `-i`는 정적 본문을 누락하므로 조건·행 이름을 확인하는 subtree에서는 뺀다.
4. 조작이 필요하면 관찰한 유일한 ref만 사용한다. `error.disposition.retry == safe`인 경우에만 재시도한다. 전달됐을 수 있는 동작은 상태를 읽고 판단한다. 이후 같은 ego Space로 돌아와 결과를 한 번 확인한다.

OS 접근성 트리는 ego TaskSpace와 격리되지 않는다. `--app ego.exe`만으로 조사 중인 Space가 선택되는 것은 아니며 사용자가 보고 있는 다른 창·문서를 읽을 수 있다. 꼭 필요한 앱·창에 범위를 한정하고, 저장된 원시 JSON은 모델에 통째로 반복 출력하지 않는다.

```powershell
.\bin\agent-desktop.cmd list-apps
.\bin\agent-desktop.cmd snapshot --app ego.exe --skeleton -i --compact --timeout-ms 30000
# 실제 직전 snapshot의 ref로 치환. 예제 ref를 그대로 실행하지 않는다.
.\bin\agent-desktop.cmd snapshot --root '@SNAPSHOT:e3' --compact
```

agent-desktop의 ref, ca-rust의 `n12`, ego의 `@12`는 서로 호환되지 않는다. Windows에서는 같은 역할·이름·native id를 가진 반복 버튼이 창 전체에서 중복되면 subtree를 좁혀도 조작이 거절될 수 있다. UI 변경 후 새 관찰이 필요하다. 마우스·키보드를 쓰는 `--headed`로 자동 전환하지 않는다. `type`도 Windows에서 headed 입력이므로 의미 기반 `set-value` 지원을 먼저 확인한다. 최소화·잠긴 데스크톱·UAC 보안 화면은 일반 백그라운드 창과 다르다.

## ego-lite 텍스트 출력 절감

`tools/research_observe.mjs`는 **읽기 전용 보조 모듈**이다. 설치된 ego-browser 스킬을 읽고 그 SDK 런타임에서 호출한다. 페이지 이동·선택자 판단·조작을 자동 수행하지 않는다.

```javascript
// ego-browser nodejs에서 실행하는 .mjs 안에 작성.
// 도구 모듈은 실행 파일 위치를 기준으로 올바르게 import한다.
import {observePage,readPageEvidence} from './tools/research_observe.mjs';
const task=await taskSpace(EXISTING_SPACE_ID);
const page=task.page('p1');
const folder='YY_MMDD/탭_키워드/웹조사';
// selector는 현재 DOM/스냅샷에서 확인한 유일한 영역을 사용한다.
console.log(await observePage(page,folder,'official-guide',{
  selector:'main',maxChars:1500,linksLimit:5
}));
// 다음 라운드에 더 필요할 때: 브라우저를 다시 읽지 않고 저장본의 구간만 반환.
console.log(await readPageEvidence(folder,'official-guide',{offset:1500,maxChars:1000}));
```

- 선택한 영역의 렌더링 텍스트와 최대 링크 10개를 `evidence/NAME.page.json`에 저장한다. 숨은 내부 API·쿠키·인증정보를 읽지 않는다. 로그인 페이지에는 보이는 개인정보가 있을 수 있으므로 필요한 좁은 영역만 선택한다.
- 기본 본문 출력은 1,500자, 링크 5개다. `maxChars`는 1~6,000자, `linksLimit`은 0~10개. offset을 늘려 필요한 절만 추가한다. 제목·URL·메타데이터는 본문 문자 예산과 별도다.
- 같은 evidence 이름에서 URL·제목·선택자·본문·저장 링크의 해시가 같으면 `unchanged: true`, `text: ''`를 반환한다. 다시 필요한 경우 `readPageEvidence` 또는 `repeat: true`를 쓴다. 같은 이름은 동일 조사 대상에 사용하고 동시 쓰기하지 않는다.
- `observePage`는 매번 실제 DOM을 읽는다. 절감 대상은 모델에 출력되는 내용이다. `readPageEvidence`만 브라우저 호출을 생략하며 `savedEvidence: true`로 과거 자료임을 표시한다.
- 저장본에는 조작용 refs가 없다. `hasMore`는 본문 일부가 아직 반환되지 않았다는 뜻이다. 자료 부족을 확인한 뒤 추가 구간을 읽고, 버튼 조작에는 새 snapshot을 사용한다. 내용 불변 판정으로 UI 전체가 불변이라고 가정하지 않는다.
- 한 번의 스크립트에서 근거가 확보된 이동→조건 대기→최종 관찰을 묶는다. 중간 상태가 다음 행동을 바꾸면 중간 관찰을 유지한다. 스크린샷은 이미지 결과물·시각 검수에 필요한 때 촬영한다.

## 검증 결과와 한계

2026-11-06 실행 결과:

- Windows 1.2.0 `version`, `status`, 사용자 세션의 `list-apps`, `ego.exe`의 UIA skeleton snapshot을 통과했다. 제한된 샌드박스에서는 `EnumWindows`가 실패해 실행 환경의 승인을 거쳐 같은 읽기 명령을 사용자 세션에서 검증했다. skeleton도 큰 결과를 반환했으므로 웹 본문 기본 수집 경로로 사용하지 않는다.
- ego-lite에서 GitHub 저장소를 직접 열어 README `article` 7,256자를 저장했다. 첫 본문 출력 1,500자, 동일 내용 두 번째 출력 0자, 추가 500자는 로컬 저장본에서 읽었다. 첫 JSON envelope는 링크·출처 포함 2,289자였다. 본문 문자 감소와 전체 호출·토큰 감소는 동일하지 않으며 실제 과금 절감률은 측정하지 않았다.
- 모의 DOM 18,000자에서 500자 반환, 내용 중복 생략, URL 변경 감지, 브라우저 없는 구간 읽기, 숨은 링크 제외, 선택자 모호성·경로 이탈·예산 오류를 검사했다.
- 기존 Node 브라우저 파이프라인 검사와 Python 6개 검사를 통과했다. 실제 파일 선택·게시·설정 변경은 이번 검증에 포함하지 않는다.

```powershell
node tools/test_research_observe.mjs
node tools/test_research_browser.mjs
python3.14-64.exe -m unittest discover -s tools -p test_research_pipeline.py -v
```

MCP가 꼭 필요한 실행 환경에서는 `bin/agent-desktop.cmd mcp`로 stdio 서버를 실행할 수 있다. 이번 작업은 CLI 통합만 적용했으며 전역 MCP 서버 등록은 하지 않았다. 매번 60개 도구를 추가하기보다 필요한 명령을 CLI로 선택한다.

## 공식 근거

- [공식 저장소 README](https://github.com/vercel-labs/agent-desktop)
- [고정 배포 v1.2.0](https://github.com/vercel-labs/agent-desktop/releases/tag/v1.2.0)
- [검토한 Windows 스킬](https://github.com/vercel-labs/agent-desktop/blob/b43ac4f6e892ef608f8851428613c4009f0e84c7/skills/agent-desktop-windows/SKILL.md)
- [공식 Windows 문서](https://agent-browser.dev/desktop/platforms/windows)
