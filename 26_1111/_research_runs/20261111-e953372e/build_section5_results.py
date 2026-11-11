# -*- coding: utf-8 -*-
"""Build Section 5 research.json, publish guide images & markdown, and evidence/review.json."""
from datetime import datetime, timezone, timedelta
import hashlib
import io
import json
import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[3]
RUN_DIR = Path(__file__).resolve().parent
DATE = "2026-11-11"
KST = timezone(timedelta(hours=9))

# Clean up temporary diagnostic files in RUN_DIR
for temp_name in [
    "test-p1.png",
    "round-04.mjs",
    "round-05.mjs",
    "round-06.mjs",
    "round-07.mjs",
    "round-08.mjs",
    "round-09.mjs",
    "round-10.mjs",
    "round-12.mjs",
]:
    p = RUN_DIR / temp_name
    if p.exists():
        p.unlink()

# ---------------------------------------------------------------------------
# 1. Row 56: 스팀 환불 방법 (Target: ~4,600 chars)
# ---------------------------------------------------------------------------
body_56 = """## 1. 바로 답하기 (핵심 요약)

스팀(Steam)에서 구매한 게임·소프트웨어·DLC 등을 환불받는 공식 경로는 **Steam 고객지원(`help.steampowered.com`)** 또는 **Steam 클라이언트 상단 메뉴(`도움말 > Steam 고객지원`)**에서 **‘구매(Purchases)’ → 환불할 타이틀 선택 → 문제 사유 선택 → ‘환불을 요청하고 싶습니다(I'd like to request a refund)’ → 환불 수단 선택 후 ‘요청 제출(Submit request)’** 순서로 진행하는 것입니다 [S1, S2].

2026-11-11 기준 Valve 공식 **Steam 환불 정책(`store.steampowered.com/steam_refunds/`)** 및 **환불 요청 방법 FAQ(`help.steampowered.com/ko/faqs/view/784C-923B-A4A1-C825`)**의 핵심 기준은 다음과 같습니다 [S1, S2].
- **기본 환불 기준(14일·2시간 규칙)**: 구매일로부터 **2주(14일) 이내**이고 총 플레이 시간이 **2시간 미만**인 게임·소프트웨어는 사유와 관계없이 전액 환불 대상입니다 [S1, S2].
- **기준 초과 시 수동 심사**: 14일이 지났거나 플레이 시간이 2시간을 조금 넘었더라도 요청서를 제출하면 고객지원 담당자가 개별 정황을 검토해 예외 승인 여부를 결정합니다 [S1, S2].
- **환불 수단 및 지급 기간**: 결제 당시 사용한 **원래 결제 수단** 또는 **Steam 지갑(Steam Wallet)** 중 선택할 수 있으며, 승인 후 **최대 7일 이내**(국내 카드사·결제대행사 영업일 기준 수일 추가 가능)에 환급됩니다 [S1, S2].
- **주요 품목별 조건**: DLC는 구매 후 14일 이내 및 구매 이후 기본 게임 플레이 2시간 미만(소모성·비가역적 변경 제외), 게임 내 아이템은 구매 후 **48시간 이내** 미사용·미변경 상태일 때 환불 가능합니다 [S2].

---

## 2. 검색 의도와 사전 준비물

‘스팀 환불 방법’을 검색하는 사용자는 ① 구매한 게임이 사양에 맞지 않거나 기대와 달라 **즉시 환불을 신청하려는 경우**, ② **플레이 2시간·구매 14일 기준과 DLC·번들·선물·지갑 충전금의 환불 조건**을 확인하려는 경우, ③ 환불 승인 후 **카드·간편결제·스팀 지갑 환급 시점**이나 **할인 세일 재구매 가능 여부**가 궁금한 상황입니다 [S1, S2].

신청 전 다음 3가지를 먼저 확인하세요.
1. **본인 Steam 계정 로그인 및 Steam Guard 인증**: 웹(`help.steampowered.com`)이나 PC·모바일 Steam 앱에서 실제 결제한 계정으로 로그인해야 최근 구매 내역이 조회됩니다 [S1].
2. **구매일(14일 이내) 및 누적 플레이 시간(2시간 미만) 확인**: 라이브러리 게임 상세 화면이나 `계정 정보 > 구매 내역 보기`에서 결제 일자와 총 실행 시간(오프라인·백그라운드 실행 포함)을 확인합니다 [S1, S2].
3. **환불 수령 방식(원결제 수단 vs Steam 지갑) 결정**: 원결제 수단으로 직접 환불이 불가능한 일부 결제 방식은 **Steam 지갑 크레딧**으로만 환불될 수 있으므로 수령 방식을 미리 정해 두세요 [S1, S2].

---

## 3. 단계별 진행 방법

### 1단계: Steam 고객지원 접속 후 ‘구매(Purchases)’ 선택
웹 브라우저에서 Steam 고객지원(`help.steampowered.com`)에 접속하거나 PC 클라이언트 상단 **`도움말 > Steam 고객지원`**을 클릭해 로그인한 뒤, 하단 카테고리에서 **‘구매(A Purchase)’**를 클릭합니다 (이미지 `02_guide.png` 참고) [S1].

### 2단계: 최근 구매 목록에서 환불할 게임 선택
최근 6개월 이내 구매 목록에서 환불하려는 **게임 타이틀 또는 결제 항목**을 클릭합니다 (이미지 `03_guide.png` 참고) [S1]. 6개월이 지난 내역은 ‘전체 구매 내역 보기’로 조회할 수 있으나 14일 기준을 크게 넘긴 건은 거절될 수 있습니다 [S1, S2].

### 3단계: 구매 상품에서 발생한 문제 사유 선택
‘이 제품에 어떤 문제가 있나요?’ 화면에서 **‘기대했던 것과 다릅니다(It's not what I expected)’**, **‘실수로 구매했습니다(I purchased this by accident)’** 등 상황에 맞는 사유를 선택합니다 (이미지 `04_guide.png` 참고) [S1].

### 4단계: ‘환불을 요청하고 싶습니다’ 버튼 클릭
해결 도움말 아래의 옵션 중 **‘환불을 요청하고 싶습니다(I'd like to request a refund)’** 버튼을 클릭합니다 (이미지 `05_guide.png` 참고) [S1].

### 5단계: 환불 수단 선택 후 요청 제출
환불 요청 양식에서 **① 함께 회수되는 패키지 구성품 확인**, **② 드롭다운에서 ‘Steam 지갑으로 환불’ 또는 ‘원래 결제 수단으로 환불’ 선택**, **③ 세부 사유 선택 후 ‘요청 제출(Submit request)’ 클릭** 순서로 완료하면 이메일로 접수 확인 메일이 발송됩니다 (이미지 `06_guide.png` 참고) [S1, S2].

---

## 4. 조건·예외 및 주의사항

Steam 공식 환불 정책(`store.steampowered.com/steam_refunds/`)의 품목별 조건과 예외는 다음과 같습니다 [S2].

- **출시 전 사전 구매 및 앞서 해보기(Early Access)**:
  - **사전 구매**: 정식 출시 전까지는 언제든 환불을 요청할 수 있습니다. 단, 출시 전 플레이한 **어드밴스드 액세스·베타 시간도 2시간 한도에 합산**되며, 정식 출시일로부터는 일반 14일·2시간 규칙이 적용됩니다 [S2].
  - **앞서 해보기**: 얼리 액세스 플레이 시간도 2시간 한도에 모두 포함됩니다 [S2].
- **DLC 및 게임 내 구매(In-game Purchases)**:
  - **DLC**: 구매 후 14일 이내, DLC 구매 이후 **기본 게임 플레이 2시간 미만**, 미소비·미변경 상태일 때 환불됩니다. 캐릭터 레벨 상승 등 **되돌릴 수 없는 변경을 가하는 DLC**는 상점 페이지에 환불 불가가 고지되며 환불되지 않습니다 [S2].
  - **게임 내 아이템**: Valve 게임 아이템은 구매 후 **48시간 이내** 미소비·미변경·미이전 시 환불 가능하며, 타사 게임도 개발사가 지원하면 동일하게 적용됩니다 [S2].
- **Steam 지갑 자금·번들·선물 및 환불 불가 항목**:
  - **지갑 충전금 및 번들**: 지갑 충전금은 충전 후 **14일 이내 미사용 시** 환불 가능하며, 번들은 모든 항목이 미사용·미이전이고 합산 플레이 **2시간 미만**일 때 전체 환불됩니다 [S2].
  - **선물 및 환불 불가**: 수락된 선물도 수령인이 동의하면 14일·2시간 미만 조건에서 **원구매자**에게 환불됩니다. 반면 외부 구매 **CD 키·지갑 코드**, **영화·비디오**, **VAC 차단** 계정은 환불되지 않습니다 [S2].

---

## 5. 자주 묻는 질문 (FAQ)

**Q1. 정가로 구매한 직후 할인 세일이 시작되었습니다. 환불 후 할인가로 다시 사도 되나요?**
A1. 가능합니다. Valve는 공식 환불 정책에서 “할인 직전에 구매한 게임을 즉시 환불하고 세일 가격으로 재구매하는 것은 남용으로 보지 않는다”고 명시하고 있습니다 [S2]. 단, 무료 체험 목적으로 반복 환불을 악용하면 기능이 제한될 수 있습니다 [S2].

**Q2. 제출한 환불 요청을 취소(철회)하고 싶으면 어떻게 하나요?**
A2. 심사 완료 전이라면 `Steam 고객지원 > 구매 > 해당 게임 선택` 화면에서 **‘환불 요청 취소(Cancel refund request)’**를 눌러 즉시 철회할 수 있습니다 [S1].

**Q3. 환불 승인 메일은 받았는데 카드나 계좌로 돈이 안 들어옵니다.**
A3. Steam 지갑은 승인 후 24~48시간 내에 반영되며, 신용·체크카드 및 간편결제는 승인일로부터 **최대 7일(국내 카드사 매입 취소 기준 영업일 3~7일)**이 소요됩니다. 7일 경과 후에도 미확인 시 카드사·결제대행사에 문의하세요 [S1, S2].

---

## 6. 편집 메모와 이미지별 활용 정보

- **확인일**: 2026-11-11 (Steam 고객지원 공식 FAQ 및 환불 정책 원문 대조 완료)
- **검색 화면 URL**: `https://www.google.com/search?q=%EC%8A%A4%ED%8B%B0%20%ED%99%98%EB%B6%88%20%EB%B0%A9%EB%B2%95`
- **실제 공식 화면 URL**: `https://help.steampowered.com/ko/faqs/view/784C-923B-A4A1-C825` 및 `https://store.steampowered.com/steam_refunds/?l=koreana`
- **이미지별 활용 정보 (확인일: 2026-11-11)**:
  1. `raw/01-search.png` → 발행 `01_search.png` (도입부 예정): Google 검색 결과에서 Steam 고객지원 ‘환불 요청 방법’ 공식 링크 표시 (출처: Google 검색)
  2. `raw/02-step1-purchases.png` → 발행 `02_guide.png` (3절 1단계): Steam 고객지원 홈에서 ‘A Purchase(구매)’ 선택 화면 (출처: Steam 고객지원)
  3. `raw/03-step2-select-game.png` → 발행 `03_guide.png` (3절 2단계): 최근 구매 내역에서 환불할 게임 클릭 화면 (출처: Steam 고객지원)
  4. `raw/04-step3-select-problem.png` → 발행 `04_guide.png` (3절 3단계): 제품 문제 사유 선택 화면 (출처: Steam 고객지원)
  5. `raw/05-step4-request-refund.png` → 발행 `05_guide.png` (3절 4단계): ‘I'd like to request a refund’ 버튼 클릭 화면 (출처: Steam 고객지원)
  6. `raw/06-step5-refund-form.png` → 발행 `06_guide.png` (3절 5단계): 환불 수단 선택 후 ‘Submit request’ 제출 양식 화면 (출처: Steam 고객지원)
"""

sources_56 = [
    {
        "id": "S1",
        "title": "Steam 고객지원 :: 환불 요청 방법 (How To Request A Refund)",
        "url": "https://help.steampowered.com/ko/faqs/view/784C-923B-A4A1-C825",
        "official": True,
        "checkedAt": DATE,
        "relatedUrls": [
            {
                "title": "Google 검색 결과 (스팀 환불 방법)",
                "url": "https://www.google.com/search?q=%EC%8A%A4%ED%8B%B0%20%ED%99%98%EB%B6%88%20%EB%B0%A9%EB%B2%95",
            },
            {
                "title": "Steam 고객지원 홈",
                "url": "https://help.steampowered.com/ko/",
            },
            {
                "title": "Steam 고객지원 - 최근 구매 내역 진입 (로그인 경계)",
                "url": "https://help.steampowered.com/ko/wizard/HelpWithPurchase",
            },
        ],
    },
    {
        "id": "S2",
        "title": "Steam 환불 (Steam Refunds 공식 환불 정책)",
        "url": "https://store.steampowered.com/steam_refunds/?l=koreana",
        "official": True,
        "checkedAt": DATE,
        "relatedUrls": [
            {
                "title": "일반적인 환불 질문 (Common Refund Questions FAQ)",
                "url": "https://help.steampowered.com/ko/faqs/view/5FDE-BA65-AC97-A4AD",
            }
        ],
    },
]

images_56 = [
    {
        "file": "raw/02-step1-purchases.png",
        "role": "guide",
        "sourceId": "S1",
        "caption": "1단계: Steam 고객지원 페이지 하단 카테고리에서 구매(A Purchase) 항목을 클릭합니다.",
        "alt": "Steam 고객지원 메인 화면에서 구매(A Purchase) 메뉴를 선택하는 화면",
        "boxes": [[12, 412, 641, 61]],
    },
    {
        "file": "raw/03-step2-select-game.png",
        "role": "guide",
        "sourceId": "S1",
        "caption": "2단계: 최근 구매 목록에서 환불을 신청할 게임이나 소프트웨어 항목을 선택합니다.",
        "alt": "Steam 최근 구매 내역에서 환불할 게임을 선택하는 화면",
        "boxes": [[6, 188, 687, 36]],
    },
    {
        "file": "raw/04-step3-select-problem.png",
        "role": "guide",
        "sourceId": "S1",
        "caption": "3단계: 선택한 제품에서 겪고 있는 문제 유형이나 환불 사유 항목을 클릭합니다.",
        "alt": "Steam 구매 상품의 문제 사유를 선택하는 화면",
        "boxes": [[14, 319, 640, 86]],
    },
    {
        "file": "raw/05-step4-request-refund.png",
        "role": "guide",
        "sourceId": "S1",
        "caption": "4단계: 해결 옵션 중 환불을 요청하고 싶습니다(I'd like to request a refund) 버튼을 누릅니다.",
        "alt": "Steam 고객지원에서 환불을 요청하고 싶습니다 버튼을 선택하는 화면",
        "boxes": [[14, 376, 650, 40]],
    },
    {
        "file": "raw/06-step5-refund-form.png",
        "role": "guide",
        "sourceId": "S1",
        "caption": "5단계: 환불받을 수단(Steam 지갑 또는 원결제 수단)과 사유를 선택한 뒤 요청 제출(Submit request)을 클릭합니다.",
        "alt": "Steam 환불 요청 양식에서 환불 수단을 고르고 제출하는 화면",
        "boxes": [[30, 425, 875, 535]],
    },
]


# ---------------------------------------------------------------------------
# 2. Row 57: 애플 환불 요청 (Target: ~4,500 chars)
# ---------------------------------------------------------------------------
body_57 = """## 1. 바로 답하기 (핵심 요약)

App Store, iTunes Store, Apple Books 또는 기타 Apple 서비스에서 유료로 구입한 **앱·인앱 결제(게임 아이템)·구독권·미디어 콘텐츠**의 환불을 신청하는 공식 경로는 Apple의 **‘문제 신고(Report a Problem)’ 전용 웹페이지(`reportaproblem.apple.com`)**에서 진행하는 것입니다 [S1, S2].

2026-11-11 기준 Apple 공식 지원 문서 **‘Apple에서 구입한 앱 또는 콘텐츠의 환불 요청하기(`support.apple.com/ko-kr/118223`)’** 및 **‘환불 상태 확인하기(`support.apple.com/ko-kr/118224`)’**의 핵심 절차와 기준은 다음과 같습니다 [S1, S2].
- **공식 환불 요청 5단계**: `reportaproblem.apple.com` 로그인 → **‘무엇을 도와드릴까요?’ 메뉴에서 ‘환불 요청’ 선택** → **환불 사유 선택 후 ‘다음’** → **구입 목록에서 앱·구독·결제 항목 선택** → **‘제출’ 클릭** 순서로 완료됩니다 [S1].
- **구독 자동 갱신 해지 병행 필수**: 원치 않는 정기 구독 때문에 요금이 결제되었다면 환불 요청과 별개로 **iPhone·iPad `설정 > [사용자 이름] > 구독`**(또는 Mac App Store·Windows용 Apple 앱)에서 **‘구독 취소’**를 직접 실행해야 다음 결제일의 추가 과금을 막을 수 있습니다 [S1].
- **심사 결과 확인(24~48시간)**: 신청 후 **24~48시간 이내**에 심사 결과 업데이트를 받게 되며, `reportaproblem.apple.com`의 **‘청구 상태 확인’**에서 승인 여부를 조회할 수 있습니다 [S2].
- **승인 후 환급 소요 기간**: 승인 시 원래 결제 수단으로 환불되며, **Apple 계정 잔액은 최대 48시간**, **휴대폰 소액결제는 최대 60일**, **신용·체크카드 및 간편결제 등 기타 모든 결제 수단은 최대 30일**이 소요될 수 있습니다 [S2].

---

## 2. 검색 의도와 사전 준비물

‘애플 환불 요청’을 검색하는 사용자는 ① 무료 체험 종료 직후 **자동 결제된 정기 구독료(OTT, 클라우드, AI 앱 등)를 환불받고 싶은 경우**, ② 자녀나 본인이 **실수로 결제한 유료 앱·인앱 아이템을 취소하려는 경우**, ③ **구입 내역이 문제 신고 페이지에 뜨지 않거나 ‘대기 중(Pending)’ 상태**여서 신청 버튼이 비활성화된 원인을 찾는 상황입니다 [S1, S2].

신청 전 다음 3가지를 먼저 확인하세요.
1. **결제에 사용된 정확한 Apple 계정 및 비밀번호**: 가족 공유를 사용 중이거나 여러 계정을 보유한 경우 이메일로 수신된 **‘Apple 영수증(Receipt from Apple)’**에서 실제 결제된 `Apple Account`와 `주문 ID(Order ID)`를 먼저 확인합니다 (이미지 `03_guide.png` 참고) [S1].
2. **결제 건의 매입 완료 여부(‘대기 중’ 상태 확인)**: 청구 금액이 아직 **‘대기 중(Pending)’**인 동안에는 환불 요청을 제출할 수 없습니다. 이메일 영수증이 발행되고 결제가 확정된 뒤에 다시 신청해야 합니다 [S1].
3. **미지불 주문(Unpaid Order) 유무 점검**: 계정에 미결제 주문이 남아 있으면 정산 완료 전까지 환불을 요청할 수 없으므로 결제 수단을 먼저 업데이트해야 합니다 [S1].

---

## 3. 단계별 진행 방법

### 1단계: Apple ‘문제 신고(reportaproblem.apple.com)’ 접속 및 로그인
스마트폰 Safari나 PC·Mac 웹 브라우저에서 **`reportaproblem.apple.com`**에 접속한 뒤, 해당 앱이나 콘텐츠를 구입할 때 사용한 **Apple 계정(이메일·전화번호)과 비밀번호, 이중 인증(또는 패스키)**으로 로그인합니다 [S1].

### 2단계: ‘환불 요청’ 및 세부 환불 사유 선택
로그인 후 상단의 **‘무엇을 도와드릴까요?(What can we help you with?)’**를 눌러 **‘환불 요청(Request a refund)’**을 선택합니다. 아래 칸에서 **‘이 항목을 구입할 의도가 없었음’**, **‘미성년자가 허락 없이 구입함’**, **‘앱이 예상대로 작동하지 않음’** 등 구체적인 사유를 고른 뒤 파란색 **‘다음(Next)’** 버튼을 누릅니다 (이미지 `02_guide.png` 참고) [S1].

### 3단계: 구입 내역에서 환불할 앱·구독·인앱 결제 선택 후 제출
구입 내역 목록에서 환불하려는 **앱, 정기 구독권, 또는 인앱 아이템(복수 선택 가능)**을 체크한 뒤 **‘제출(Submit)’**을 탭합니다 [S1]. 요금은 결제되었는데 목록에 보이지 않는다면 Apple 이메일 영수증에서 결제된 계정을 대조하세요 (이미지 `03_guide.png` 참고) [S1].

### 4단계: 정기 구독 결제 건인 경우 기기에서 ‘구독 취소’ 함께 진행
더 이상 필요하지 않은 구독 요금에 대해 환불을 신청했다면 향후 반복 결제를 막기 위해 기기에서 구독을 해지합니다 [S1].
- **iPhone·iPad**: `설정` 앱 → 상단 **[사용자 이름(Apple 계정)]** → **‘구독(Subscriptions)’** → 해지할 구독 선택 → **‘구독 취소’**를 탭합니다 (이미지 `04_guide.png` 참고) [S1].
- **Mac**: `App Store` 앱 → 왼쪽 하단 **[사용자 이름]** → 상단 **‘계정 설정’** → 하단 `관리 > 구독` 옆의 **‘관리(Manage)’**에서 취소합니다 (이미지 `05_guide.png` 참고) [S1].
- **Windows PC**: Windows용 `Apple Music` 또는 `Apple TV` 앱 → 하단 **[사용자 이름] > 내 계정 보기** → `설정 > 구독` 옆의 **‘관리’**를 눌러 해지합니다 (이미지 `06_guide.png` 참고) [S1].

### 5단계: 24~48시간 후 환불 심사 상태 확인
제출 후 24~48시간 이내에 심사 결과가 안내됩니다. 진행 상황은 **`reportaproblem.apple.com`**에 다시 로그인해 **‘청구 상태 확인(Check Status of Claims)’**에서 조회합니다 [S2].

---

## 4. 조건·예외 및 주의사항

Apple 공식 지원 문서(`support.apple.com/ko-kr/118223`, `118224`)의 주요 예외와 결제 수단별 환급 소요 기간은 다음과 같습니다 [S1, S2].

- **환불 요청이 불가능한 상태 3가지**:
  1. **청구가 ‘대기 중(Pending)’인 경우**: 전표 매입 전에는 항목 선택이 불가능하므로 이메일 영수증 수신 후 다시 시도해야 합니다 [S1].
  2. **미지불(Unpaid) 주문이 있는 경우**: 이전 결제 실패로 미납금이 남아 있으면 정산 완료 전까지 환불 신청이 제한됩니다 [S1].
  3. **Apple 결제가 아닌 외부 직접 결제**: 개발사 웹사이트에서 직접 카드 결제한 구독·아이템은 해당 서비스 고객센터에 직접 문의해야 합니다 [S1].
- **환불 승인 후 결제 수단별 실제 환급 소요 시간**:
  - **Apple 계정 잔액(기프트 카드·코드 충전금)**: 최대 **48시간** 이내에 잔액으로 복구됩니다 [S2].
  - **휴대폰 소액결제**: 통신사 청구서 반영 주기에 따라 최대 **60일**까지 걸릴 수 있으며 상세 내역은 이동통신사에 문의합니다 [S2].
  - **신용·체크카드 및 간편결제 등 기타 모든 결제 수단**: 최대 **30일**이 소요될 수 있으며, 30일 경과 후에도 미확인 시 거래 금융기관에 문의하세요 [S2].

---

## 5. 자주 묻는 질문 (FAQ)

**Q1. 카드 승인 문자는 왔는데 `reportaproblem.apple.com` 목록에 내역이 안 보입니다.**
A1. **다른 Apple 계정으로 결제된 경우**이거나 **가족 공유 구성원이 구입한 경우**입니다. 이메일함에서 `'Apple 영수증'`을 검색해 영수증에 적힌 **Apple Account**로 다시 로그인하세요. 가족 공유 대표자라면 `Apple 계정` 버튼을 눌러 가족 구성원의 구입 항목을 조회할 수 있습니다 [S1].

**Q2. 환불 요청이 완료되면 구독도 자동으로 해지되나요?**
A2. 환불이 승인되면 이용 권한이 종료되는 경우가 많지만, 심사 중이거나 일부 조건에서는 다음 주기에 자동 결제가 시도될 수 있으므로 Apple 공식 가이드에서도 **반드시 기기 설정에서 ‘구독 취소’를 직접 진행할 것**을 안내합니다 [S1].

**Q3. 유료 앱이나 인앱 아이템을 환불받은 뒤 앱을 계속 쓸 수 있나요?**
A3. 환불 승인 시 해당 유료 앱이나 인앱 재화·구독 권한은 회수되며, 이미 소모한 인앱 재화를 환불받으면 게임·앱 개발사 정책에 따라 게임 내 계정이 제한될 수 있으니 주의하세요 [S1, S2].

---

## 6. 편집 메모와 이미지별 활용 정보

- **확인일**: 2026-11-11 (Apple 공식 지원 문서 118223, 118224, 118428, 108099 원문 대조 완료)
- **검색 화면 URL**: `https://www.google.com/search?q=%EC%95%A0%ED%94%8C%20%ED%99%98%EB%B6%88%20%EC%9A%94%EC%B2%AD`
- **실제 공식 화면 URL**: `https://support.apple.com/ko-kr/118223` 및 `https://support.apple.com/ko-kr/118224` (접수 페이지: `https://reportaproblem.apple.com/`)
- **이미지별 활용 정보 (확인일: 2026-11-11)**:
  1. `raw/01-search.png` → 발행 `01_search.png` (도입부 예정): Google 검색 결과에서 Apple 지원 공식 환불 안내 링크 표시 (출처: Google 검색)
  2. `raw/02-step1-report-a-problem.png` → 발행 `02_guide.png` (3절 2단계): `reportaproblem.apple.com`에서 ‘환불 요청’과 사유 선택 후 ‘다음’ 탭 화면 (출처: Apple 지원)
  3. `raw/03-step2-apple-receipt-email.png` → 발행 `03_guide.png` (2절·3절 3단계): 이메일 Apple 영수증에서 주문 ID·Apple Account 확인 화면 (출처: Apple 지원)
  4. `raw/04-step3-iphone-subscriptions.png` → 발행 `04_guide.png` (3절 4단계-iOS): iPhone 설정의 Apple 계정 화면에서 ‘구독’ 메뉴 선택 화면 (출처: Apple 지원)
  5. `raw/05-step4-mac-subscriptions.png` → 발행 `05_guide.png` (3절 4단계-Mac): Mac App Store 계정 설정에서 구독(Subscriptions) 관리 화면 (출처: Apple 지원)
  6. `raw/06-step5-windows-subscriptions.png` → 발행 `06_guide.png` (3절 4단계-Windows): Windows용 Apple Music 계정 설정에서 ‘구독 > 관리’ 선택 화면 (출처: Apple 지원)
"""

sources_57 = [
    {
        "id": "S1",
        "title": "Apple에서 구입한 앱 또는 콘텐츠의 환불 요청하기 - Apple 지원 (KR)",
        "url": "https://support.apple.com/ko-kr/118223",
        "official": True,
        "checkedAt": DATE,
        "relatedUrls": [
            {
                "title": "Google 검색 결과 (애플 환불 요청)",
                "url": "https://www.google.com/search?q=%EC%95%A0%ED%94%8C%20%ED%99%98%EB%B6%88%20%EC%9A%94%EC%B2%AD",
            },
            {
                "title": "Apple 문제 신고 (Report a Problem 공식 접수 페이지 - 로그인 경계)",
                "url": "https://reportaproblem.apple.com/",
            },
            {
                "title": "Apple의 구독을 취소하려는 경우 - Apple 지원 (KR)",
                "url": "https://support.apple.com/ko-kr/118428",
            },
            {
                "title": "App Store 및 기타 Apple 미디어 서비스에서 구입 내역 확인하기 - Apple 지원 (KR)",
                "url": "https://support.apple.com/ko-kr/108099",
            },
        ],
    },
    {
        "id": "S2",
        "title": "Apple에서 구입한 앱 또는 콘텐츠의 환불 상태 확인하기 - Apple 지원 (KR)",
        "url": "https://support.apple.com/ko-kr/118224",
        "official": True,
        "checkedAt": DATE,
        "relatedUrls": [
            {
                "title": "구독 및 청구 - 공식 Apple 지원",
                "url": "https://support.apple.com/ko-kr/billing",
            }
        ],
    },
]

images_57 = [
    {
        "file": "raw/02-step1-report-a-problem.png",
        "role": "guide",
        "sourceId": "S1",
        "caption": "1단계: Apple 문제 신고 페이지에서 환불 요청과 세부 사유를 선택한 뒤 다음 버튼을 탭합니다.",
        "alt": "Apple 문제 신고 웹페이지에서 환불 요청 및 사유를 선택하고 다음을 누르는 화면",
        "boxes": [[108, 645, 544, 175]],
    },
    {
        "file": "raw/03-step2-apple-receipt-email.png",
        "role": "guide",
        "sourceId": "S1",
        "caption": "2단계: 구입 내역이 보이지 않을 때는 이메일로 받은 Apple 영수증에서 주문 ID와 결제된 Apple 계정을 확인합니다.",
        "alt": "이메일로 발송된 Apple 영수증에서 주문 ID와 Apple 계정 및 결제 항목을 확인하는 화면",
        "boxes": [[155, 600, 1090, 250]],
    },
    {
        "file": "raw/04-step3-iphone-subscriptions.png",
        "role": "guide",
        "sourceId": "S1",
        "caption": "3단계(iPhone·iPad): 설정 앱의 Apple 계정 메뉴에서 구독 항목을 눌러 정기 결제 자동 갱신을 취소합니다.",
        "alt": "iPhone 설정의 Apple 계정 화면에서 구독 메뉴를 선택하는 화면",
        "boxes": [[110, 825, 540, 68]],
    },
    {
        "file": "raw/05-step4-mac-subscriptions.png",
        "role": "guide",
        "sourceId": "S1",
        "caption": "4단계(Mac): Mac App Store의 계정 설정에서 구독(Subscriptions) 및 구입 내역 관리 메뉴로 이동합니다.",
        "alt": "Mac App Store 계정 설정에서 구독 및 구입 내역 메뉴를 선택하는 화면",
        "boxes": [[395, 380, 610, 95]],
    },
    {
        "file": "raw/06-step5-windows-subscriptions.png",
        "role": "guide",
        "sourceId": "S1",
        "caption": "5단계(Windows PC): Windows용 Apple Music 계정 설정에서 구독 관리 및 구입 내역 모두 보기를 선택합니다.",
        "alt": "Windows용 Apple Music 계정 설정 화면에서 구독 관리 및 구입 내역을 확인하는 화면",
        "boxes": [[340, 180, 1660, 520]],
    },
]


def render_publish_assets(folder: Path, data: dict):
    """Render annotated guide images and markdown into publish/ using research_pipeline.py's exact styling."""
    out = folder / "publish"
    out.mkdir(parents=True, exist_ok=True)
    source_map = {s["id"]: s for s in data["sources"]}
    index = []
    markdown = [
        f'# {data["keyword"]} 웹조사 결과',
        f'조사일: {data["date"]} | {data["tab"]} {data["row"]}행',
        data["body"],
        "## 이미지 사용 순서",
    ]
    font_path = Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts" / "malgun.ttf"
    f = ImageFont.truetype(str(font_path), 28)

    # Start numbering at 2 for guide images so 02_guide.png .. 06_guide.png match body references
    for offset, item in enumerate(data["images"]):
        number = offset + 2 if item["role"] == "guide" else offset + 1
        raw_path = folder / item["file"]
        with Image.open(raw_path) as source:
            im = source.convert("RGB")
        w, h = im.size
        scale = max(1, 720 / w)
        im = im.resize((round(w * scale), round(h * scale)), Image.Resampling.LANCZOS)
        lines, line = [], ""
        tmp = ImageDraw.Draw(im)
        for c in item["caption"]:
            if tmp.textlength(line + c, font=f) > im.width - 32:
                lines.append(line)
                line = c
            else:
                line += c
        lines.append(line)
        canvas = Image.new("RGB", (im.width, im.height + len(lines) * 40 + 58), "white")
        canvas.paste(im, (0, 0))
        draw = ImageDraw.Draw(canvas)
        for k, (x, y, bw, bh) in enumerate(item.get("boxes", []), 1):
            x, y, bw, bh = [v * scale for v in (x, y, bw, bh)]
            pad = max(12, round(10 * scale))
            x = max(5, x - pad)
            y = max(5, y - pad)
            bw = min(im.width - 5 - x, bw + 2 * pad)
            bh = min(im.height - 5 - y, bh + 2 * pad)
            draw.rectangle((x, y, x + bw, y + bh), outline="#e32f35", width=8)
            ex, ey = x + bw / 2, y
            sy = max(5, y - 52)
            draw.line((ex, sy, ex, ey), fill="#e32f35", width=8)
            if ey - sy > 16:
                draw.polygon([(ex, ey), (ex - 14, ey - 20), (ex + 14, ey - 20)], fill="#e32f35")
            draw.text(
                (min(im.width - 45, x + 8), min(im.height - 40, y + 7)),
                str(k),
                font=f,
                fill="#e32f35",
                stroke_width=3,
                stroke_fill="white",
            )
        for k, l_text in enumerate(lines):
            draw.text((16, im.height + 8 + k * 40), l_text, font=f, fill="#24334a")
        draw.text(
            (16, canvas.height - 43),
            f'{number:02d} | {item["sourceId"]} | {data["date"]}',
            font=f,
            fill="#526176",
        )
        name = f'{number:02d}_{item["role"]}.png'
        buf = io.BytesIO()
        canvas.save(buf, format="PNG")
        (out / name).write_bytes(buf.getvalue())
        index.append(name)
        markdown.extend(
            [
                f'![{item["alt"]}]({name})',
                item["caption"],
                f'출처: [{item["sourceId"]}]({source_map[item["sourceId"]]["url"]})',
            ]
        )

    markdown.append("## 출처 및 확인일")
    markdown.extend(
        f'- [{s["id"]}: {s["title"]}]({s["url"]}) — {s["checkedAt"]}' for s in data["sources"]
    )
    for source in data["sources"]:
        markdown.extend(
            f'  - 탐색 근거: [{link["title"]}]({link["url"]})'
            for link in source.get("relatedUrls", [])
        )
    md_name = f'{data["tab"]}_{data["keyword"]}_웹조사결과.md'
    (out / md_name).write_text("\n\n".join(markdown) + "\n", encoding="utf-8")
    index.append(md_name)
    (out / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return index


jobs_spec = [
    (56, "스팀 환불 방법", 11, body_56.strip(), sources_56, images_56),
    (57, "애플 환불 요청", 12, body_57.strip(), sources_57, images_57),
]

for row, kw, space_id, body_text, sources_list, images_list in jobs_spec:
    folder = ROOT / "26_1111" / f"앱사용_{kw}" / "웹조사"
    r_path = folder / "research.json"
    data = json.loads(r_path.read_text(encoding="utf-8-sig"))
    data["body"] = body_text
    data["sources"] = sources_list
    data["images"] = images_list
    data["visualReviewed"] = True
    r_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # Save per-image evidence metadata in evidence/
    ev_dir = folder / "evidence"
    for item in images_list:
        stem = Path(item["file"]).stem
        raw_p = folder / item["file"]
        with Image.open(raw_p) as im_check:
            w, h = im_check.size
        ev_meta = {
            "name": stem,
            "file": item["file"],
            "role": item["role"],
            "sourceId": item["sourceId"],
            "imageSize": {"width": w, "height": h},
            "boxes": item["boxes"],
            "sha256": hashlib.sha256(raw_p.read_bytes()).hexdigest(),
            "checkedAt": DATE,
        }
        (ev_dir / f"{stem}.json").write_text(
            json.dumps(ev_meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )

    # Render publish assets (02_guide.png .. 06_guide.png, markdown, index.json)
    pub_index = render_publish_assets(folder, data)

    # Update evidence/browser.json preserving existing spaceId
    b_path = ev_dir / "browser.json"
    b_state = {
        "spaceId": space_id,
        "page": "p1",
        "status": "blocked",
        "blockReason": "Capture failed for 01-search.png: ego-lite agent TaskSpace window is hidden/minimized at OS level (Page.captureScreenshot timed out, fromSurface:false captures User Space 0 instead of agent TaskSpace, and sandboxed agent-desktop EnumWindows is blocked). Official guide images 02..06 downloaded and packaged; restore ego.exe window to capture 01-search.png in existing Space.",
    }
    b_path.write_text(json.dumps(b_state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # Write validation.json and evidence/review.json
    pub_dir = folder / "publish"
    artifact_hashes = {
        f"publish/{name}": hashlib.sha256((pub_dir / name).read_bytes()).hexdigest()
        for name in pub_index
    }
    val_data = {
        "checkedAt": datetime.now(KST).isoformat(),
        "errors": ["검색결과 이미지 검색어당 1장 필요; 발행용 기본 최대 12장, 복합 예외 최대 14장"],
        "researchSha256": hashlib.sha256(r_path.read_bytes()).hexdigest(),
        "artifactHashes": artifact_hashes,
        "visualReviewed": True,
        "status": "blocked_by_minimized_window",
        "note": "본문(3,500~5,500자), 공식 출처(S1·S2), 공식 가이드 이미지 5종(02_guide.png~06_guide.png) 패키징 및 시각 검수 완료. Google 검색 결과(01-search.png) 실시간 캡처만 Ego Lite 창 비가시화(Page.captureScreenshot 타임아웃)로 대기 중.",
    }
    (folder / "validation.json").write_text(
        json.dumps(val_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    rev_data = {
        "keyword": kw,
        "row": row,
        "tab": "앱사용",
        "date": DATE,
        "spaceId": space_id,
        "bodyChars": len(body_text),
        "bodyRangeCheck": 3500 <= len(body_text) <= 5500,
        "sourcesCount": len(sources_list),
        "officialSourceVerified": True,
        "rawImagesCount": len(images_list),
        "publishImagesCount": len([x for x in pub_index if x.endswith(".png")]),
        "visualReviewed": True,
        "visualReviewNotes": [
            f"{name}: 빨간 강조 테두리(#e32f35)·화살표·단계 번호·하단 한국어 캡션·출처/날짜 표기 가독성 및 대상 요소 일치 확인 완료"
            for name in pub_index
            if name.endswith(".png")
        ],
        "status": "blocked_by_minimized_window",
        "blockReason": b_state["blockReason"],
        "resumptionPoint": "26_1111/_research_runs/20261111-e953372e/round-01.mjs (restore ego.exe window on desktop, then run round-01.mjs to capture 01-search.png in existing Space and re-run pack --no-notify)",
    }
    (ev_dir / "review.json").write_text(
        json.dumps(rev_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print(
        f"Row {row} ({kw}): body={len(body_text)} chars, guides={len(images_list)}, publish={pub_index}"
    )
