---
description: 애드센스 블로그스팟 HTML 스타일 및 CSS 클래스 가이드라인
---

# 📄 애드센스 블로그스팟 HTML 포스팅 작성 가이드라인

> HTML 구조, CSS 클래스, 색상/디자인 규칙을 다룹니다.
> 콘텐츠 작성 지침은 `/html-content-guide`를 참고하세요.

---

## 개요

이 가이드라인은 **서민금융 도우미 블로그**의 모든 포스팅이 일관된 디자인과 가독성을 유지하도록 작성되었습니다.

- **목표 독자**: 중년층 (40~60대)
- **최적화 기준**: 모바일 가독성 최우선
- **디자인 철학**: 명료하고 신뢰감 있는 정보 전달

---

## CSS 클래스 및 태그 사용 규칙

이 가이드는 `예능.html` 및 최신 테마에서 사용되는 HTML 스타일 규칙을 정의합니다. **가능한 별도의 클래스 사용을 줄이고, 기본 HTML 태그와 정의된 전용 클래스만 사용**하여 스타일을 적용합니다.

### ✅ 1. 제목 (Headings)

**규칙**: 본문 내 소제목은 반드시 `<h2>` 태그를 사용합니다. 하위 구조는 `<h3>` 태그를 순차적으로 사용합니다. 별도의 클래스나 인라인 스타일 없이 태그만 사용하면 자동으로 스타일이 적용됩니다.

- **스타일**: 왼쪽 블루(#3c40ff) 세로 라인 포인트 및 하단 연한 회색 구분선.
- **주의**: 이는 `.post-body` 내부에서만 적용됩니다. 메인 페이지 헤더에는 영향이 없습니다.
- **🚨 중복 H1 금지**: 블로그스팟 테마가 포스트 제목을 화면에 렌더링할 때 이미 `<h1>` 태그를 생성하므로, **본문 내에서는 절대 `<h1>` 태그를 사용하지 않습니다.** 본문 최상위 제목은 `<h2>`로 시작해야 합니다.
- **구조 준수**: 제목 구조는 반드시 논리적인 순서(`<h2>` -> `<h3>` 순)를 준수해야 하며, `<h2>` 없이 `<h3>`로 바로 시작할 수 없습니다.


<h2>1. 여기에 대주제(소제목 H2)를 입력하세요</h2>
<h3>1.1 여기에 세부주제(소제목 H3)를 입력하세요</h3>


---

### ✅ 2. 버튼 (Buttons)

**규칙**: 링크 버튼은 `<a>` 태그에 `button` (기본), `button2` (오렌지), `button3` (블루) 클래스를 사용하여 생성하며, **반드시 텍스트 색상을 흰색(`color: #ffffff`)으로 명시**해야 합니다.
별도의 컨테이너(`div`) 없이 `<a>` 태그만으로 사용하며, 자동으로 **가로 100%** 크기 및 **텍스트 줄바꿈**이 적용됩니다.

- **스타일**: 상시 **스케일 펄스(Scale Pulse)** 애니메이션.
- **호버 효과**: 마우스 오버 시 **1.1배 확대** 및 **밝기 증가**.
- **색상 지정**: `style="color: #ffffff"` 속성을 필수 포함하여 링크 색상 오버라이드 방지.
- **링크 이동**: `target` 속성 생략 (현재 창에서 열기).

- **버튼 색상 옵션 (Button Variants)**:
원하는 색상의 클래스를 단독으로 사용하여 버튼을 생성할 수 있습니다. 메인 CTA와 섹션별 하단 CTA로 활용합니다.

- **기본 (Blue)**: `.button3` (또는 `.button`)
- **오렌지 (Orange)**: `.button2`

```html
<!-- 블루 (기본) - 인트로 CTA 등 -->
<a class="button3" href="#" style="color: #ffffff;">기본 블루 버튼</a>

<!-- 오렌지 - 섹션 중간/하단 -->
<a class="button2" href="#" style="color: #ffffff;">오렌지 버튼</a>

<!-- 블루 - 섹션 하단/마무리 -->
<a class="button" href="#" style="color: #ffffff;">블루 버튼</a>
```

---

### ✅ 3. 테이블 (Tables)

**규칙**: 모든 테이블은 `<div class="table-responsive">`로 감싸야 모바일에서 가로 스크롤이 가능합니다. 3개의 테이블을 본문 내 적절한 위치에 삽입하며, 각 컬럼과 항목명에 직관적인 이모지를 적극 활용하세요.

- **스타일**: 깔끔한 가로선 디자인, 헤더 연한 회색 배경.
- **구조**:
```html
<div class="table-responsive">
    <table>
        <thead>
            <tr>
                <th>헤더 1</th>
                <th>헤더 2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>내용 1</td>
                <td>내용 2</td>
            </tr>
        </tbody>
    </table>
</div>
```

---

### ✅ 4. 인용구 (Blockquotes)

**규칙**: 강조할 텍스트나 요약 정보는 `<blockquote>` 태그를 사용합니다.

- **스타일**: 연한 회색 배경, 좌측 블루 라인 포인트.
```html
<blockquote>
    <p>여기에 강조할 내용이나 인용구를 작성하세요.</p>
</blockquote>
```

---

### ✅ 5. 리스트 (Lists)

**규칙**: 순서가 없는 목록은 `<ul>`, 순서가 있는 목록은 `<ol>`을 사용합니다. 모바일 가독성을 위해 줄 간격이 조정되어 있습니다.

```html
<ul>
    <li>리스트 항목 1</li>
    <li>리스트 항목 2</li>
</ul>
```

---

### ✅ 6. 소셜 공유 버튼 관련
- **참고**: `vtrick-pro-share-links` 클래스 내부의 버튼은 자동으로 **흰색 배경**의 깔끔한 스타일로 오버라이드됩니다. 별도의 수정이 필요 없습니다.

---

### ✅ 7. 카드형 스텝 디자인 (프로세스 설명용)

단계별 정보를 시각적으로 보여줄 때 사용합니다.

```html
<div class="viz-card-container">
    <h2 class="viz-card-main-title">진행 절차</h2>

    <!-- Step 1 -->
    <div class="viz-card-step">
        <div class="viz-card-number">1</div>
        <h3 class="viz-card-step-title">신청서 접수</h3>
        <div class="viz-card-content">
            <p class="seo-text">누리집 접속 후 신청서를 작성합니다.</p>
        </div>
    </div>

    <!-- Step 2 -->
    <div class="viz-card-step">
        <div class="viz-card-number">2</div>
        <h3 class="viz-card-step-title">심사 및 승인</h3>
        <div class="viz-card-content">
            <p class="seo-text">담당자가 자격 요건을 확인합니다.</p>
        </div>
    </div>
</div>
```

---

### ✅ 8. 이미지 (Images)

**규칙**: 본문 내에 삽입되는 첫 번째 이미지는 블로그 테마에서 자동으로 **대표 이미지(Featured Image)**로 인식되어, `BlogPosting` 스키마 및 SNS 공유용 Open Graph 이미지(`og:image`, `twitter:image`)에 바인딩됩니다. 따라서 다음 규칙을 반드시 준수해야 합니다.

- **대표 이미지 필수 배치**: 본문 최상단(서론 직후 또는 첫 번째 H2 이전)에 반드시 첫 번째 이미지를 고화질로 배치합니다.
- **ALT 속성 필수 작성**: 이미지의 `alt` 속성은 검색엔진 봇에게 이미지를 설명하는 메타데이터입니다. 메인 키워드를 자연스럽게 포함하여 작성하세요. (예: `alt="청년 버팀목 전세자금대출 신청 자격 요건 안내"`).
- **Core Web Vitals 속도 최적화**: 페이지 로딩 속도를 위해 가급적 압축률이 우수한 **WebP 포맷**을 사용하고, 해상도 대비 파일 용량을 최소화합니다.
- **이미지 래퍼 (separator) 배경 규칙**: 블로거가 기본으로 삽입하는 `.separator` 클래스 영역에는 어떠한 파란색 배경(#F0F3FF)이나 추가 테두리(border), 그림자(box-shadow)를 부여하지 않고, **완전한 투명(transparent) 배경**으로 렌더링되게 리셋되어 있습니다. 이미지가 여백 공간으로 인해 가려지거나 답답하게 렌더링되지 않도록 보장합니다.
- **스타일 규격**: 본문 개별 삽입 시 아래 캡션 컨테이너를 함께 제공합니다.

```html
<div class="seo-image-container">
    <img src="image.webp" alt="메인 키워드가 들어간 이미지 설명" class="seo-image">
    <p class="seo-image-caption">여기에 이미지 캡션(설명)을 입력하세요</p>
</div>
```

---

### ✅ 9. 하이퍼링크 및 앵커 텍스트 (Hyperlinks)

**규칙**: 구글 SEO의 표준 링크 분석 방식을 준수하기 위해 외부 및 내부 링크는 다음 요건을 엄격히 따릅니다.

- **새 창 이동 금지 (`target="_blank"` 절대 금지)**: 크롤링 봇이 페이지 흐름을 차단 없이 추적할 수 있도록, 외부 사이트로 이동하는 하이퍼링크에 `target="_blank"` 속성을 절대 부여하지 않고 현재 창에서 열리도록 설계합니다.
- **앵커 텍스트 구체화**: "여기", "홈페이지", "링크" 같은 단순하고 무의미한 텍스트에 하이퍼링크를 걸지 않습니다. 반드시 키워드와 맥락이 포함된 명확한 문구로 링크를 구성합니다.
  - ❌ **나쁜 예**: 공식 사이트는 [여기](URL)를 참고하세요.
  - ✅ **좋은 예**: [정부 복지로 청년 버팀목 전세자금대출 신청 공식 누리집](https://www.bokjiro.go.kr)에서...
- **앵커 텍스트 내 URL 표기 금지**: 앵커 텍스트를 작성할 때 괄호 안에 URL 주소를 병기하지 말고, 순수 텍스트로만 앵커를 작성합니다.
  - ❌ **나쁜 예**: [복지로 공식 홈페이지(https://www.bokjiro.go.kr)](https://www.bokjiro.go.kr)
  - ✅ **좋은 예**: [복지로 공식 홈페이지](https://www.bokjiro.go.kr)
- **스타일 지정**: 하이퍼링크 스타일은 볼드(`<strong>`), 폰트 컬러 `#3c40ff`, 폰트 크기 `+2px`를 부분적으로 적용하여 눈에 잘 띄게 합니다.
  - 템플릿 코드 예시: `<a href="https://www.bokjiro.go.kr" style="color: #3c40ff; font-weight: 700; font-size: 20px;"><strong>복지로 공식 누리집</strong></a>`

---

## HTML 구조 템플릿

### 인트로 직후 CTA 버튼 그룹 (필수)

인트로(서론) 마무리 직후에 배치하는 CTA 버튼 그룹입니다. 독자의 즉각적인 행동을 유도합니다.

```html
<!-- 인트로 직후 CTA 버튼 그룹 -->
<div style="background-color: #f7fafc; padding: 24px 20px; border-radius: 12px; margin-bottom: 24px; border: 2px solid #e2e8f0;">
    <p class="seo-text" style="font-size: 18px; line-height: 1.6; color: #000000; margin: 0 0 20px 0; text-align: center; font-weight: 500;">
        아래 버튼에서 <a href="URL입력" style="text-decoration: underline; color: #4663EB;"><strong>[주요 혜택]</strong></a> 및 <a href="URL입력" style="text-decoration: underline; color: #4663EB;"><strong>[주요 혜택2]</strong></span>를 확인하실 수 있어요.
    </p>
    
    <!-- 3개 연속 배치: 블루 -> 오렌지 -> 블루 순서 추천 -->
    <div class="button-container"><a href="URL입력" class="button3" style="color: #ffffff;">👉💸 [짧은 행동 유도 문구 1]</a></div>
    <div class="button-container"><a href="URL입력" class="button2" style="color: #ffffff;">👉📝 [짧은 행동 유도 문구 2]</a></div>
    <div class="button-container"><a href="URL입력" class="button3" style="color: #ffffff;">👉🔍 [짧은 행동 유도 문구 3]</a></div>
</div>
```

**주제별 CTA 문구 예시:**

| 주제 | CTA 문구 예시 |
|------|--------------|
| 금융/연금 | 👉💸 숨은보험금 찾기, 👉📝 못받은지원금 신청, 👉🔍 휴면환급금 조회 |
| 대출/전환 | 👉💸 긴급생계비 소액대출, 👉💳 연체자대출 가능한곳, 👉🔍 신불자대출 살펴보기 |
| 자동차 | 👉🚗 자동차 리콜조회, 👉🔍 현대차 연봉확인, 👉📅 출고일정 조회 |
| 중계/스포츠 | 👉⚽ 오늘축구 중계보기, 👉📺 실시간tv 무료방송, 👉📅 일정조회 |
| 배드민턴 | 👉🏸 실시간 중계보기, 👉📝 대진표 확인하기, 👉📅 경기일정 조회 |

---

### 기본 포스팅 구조

```html
<!-- 메인 타이틀 -->
<div class="seo-container" style="padding: 24px 16px;">
    <!-- H1에는 seo-heading 유지 가능하나, H2부터는 태그만 사용 -->
    <h1 class="seo-heading" style="text-align: center; margin-bottom: 20px; color: #000000; font-weight: 700;">
        포스팅 메인 제목
    </h1>
    <p class="seo-text" style="text-align: center; color: #000000; margin-bottom: 32px;">
        부제목 또는 요약 설명
    </p>
</div>

<!-- 섹션 1: 개요 -->
<div class="viz-card-container" style="background-color: #f7fafc; padding: 28px 20px; margin-bottom: 40px;">
    <!-- H2 태그 사용 -->
    <h2>1. 섹션 제목</h2>

    <div style="background-color: #F0F3FF; border: 2px solid #3c40ff; padding: 24px; border-radius: 10px; margin-bottom: 20px;">
        <p class="seo-text" style="font-size: 18px; line-height: 1.8; color: #000000; margin: 0;">
            중요한 정보를 강조하는 박스
        </p>
    </div>

    <!-- CTA 버튼 -->
    <a href="#" class="button3" style="color: #ffffff;">
        버튼 텍스트
    </a>
</div>

<!-- 섹션 2: 단계별 정보 (카드 스타일) -->
<div class="seo-container" style="padding: 0 16px; margin-bottom: 40px;">
    <h2>2. 섹션 제목</h2>

    <!-- 개별 카드 -->
    <div style="background-color: #ffffff; border: 2px solid #F0F3FF; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(60, 64, 255, 0.15);">
        <h3 style="font-size: 22px; font-weight: 700; color: #000000; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 3px solid #3c40ff;">
            2.1 소제목
        </h3>

        <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background-color: #f7fafc; border-radius: 8px;">
                <span style="font-weight: 700; color: #000000; font-size: 17px;">항목명</span>
                <span style="color: #3c40ff; font-weight: 700; font-size: 17px;">값</span>
            </div>
        </div>

        <a href="#" class="button3" style="color: #ffffff;">
            버튼 텍스트
        </a>
    </div>
</div>

<!-- 주의사항 박스 -->
<div style="background-color: #ffffff; border: 2px solid #3c40ff; padding: 24px; border-radius: 10px; margin: 0 16px 40px 16px;">
    <h3 style="font-size: 20px; font-weight: 700; color: #000000; margin-bottom: 20px; text-align: center;">
        ⚠️ 주의사항 제목
    </h3>
    <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="padding: 16px; background-color: #F0F3FF; border-radius: 8px; border-left: 4px solid #3c40ff;">
            <p style="font-size: 18px; color: #000000; margin: 0; line-height: 1.6;">
                <span style="display: inline-block; background-color: #3c40ff; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-weight: 700; margin-right: 8px; font-size: 14px;">1</span>
                주의사항 내용
            </p>
        </div>
    </div>
</div>

<!-- CTA 섹션 -->
<div style="padding: 0 16px; margin-bottom: 40px;">
    <a href="#" class="button3" style="color: #ffffff;">
        메인 CTA 버튼
    </a>
    <p class="seo-text" style="margin-top: 16px; font-size: 16px; color: #718096; text-align: center;">
        추가 안내 문구
    </p>
</div>

<!-- 관련 링크 -->
<div style="background-color: #f7fafc; padding: 28px 20px; margin: 40px 16px 0 16px; border-radius: 12px; border: 2px solid #e2e8f0;">
    <h3 style="font-size: 20px; font-weight: 700; color: #000000; margin-bottom: 20px; text-align: center;">
        🔗 관련 정보
    </h3>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <a href="#" style="display: block; width: 100%; padding: 16px; background-color: #ffffff; color: #3c40ff; font-weight: 700; font-size: 18px; text-align: center; border-radius: 8px; text-decoration: none; border: 2px solid #F0F3FF; line-height: 1.4; box-sizing: border-box; white-space: normal;">
            관련 링크 1
        </a>
    </div>
</div>

<div style="height: 40px;"></div>
```

---

## 스타일 컴포넌트별 사용법

### 1. 정보 강조 박스

```html
<!-- 블루 강조 박스 -->
<div style="background-color: #F0F3FF; border: 2px solid #3c40ff; padding: 24px; border-radius: 10px; margin-bottom: 20px;">
    <p class="seo-text" style="font-size: 18px; line-height: 1.8; color: #000000; margin: 0;">
        <strong style="color: #000000; font-weight: 700;">제목:</strong> 설명 내용
    </p>
</div>
```

### 2. 번호 매긴 리스트

```html
<div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; align-items: flex-start; padding: 16px; background-color: #f7fafc; border-radius: 8px; border: 2px solid #F0F3FF;">
        <span style="color: #ffffff; background-color: #3c40ff; font-weight: 700; margin-right: 12px; font-size: 16px; min-width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">1</span>
        <span class="seo-text" style="font-size: 18px; color: #000000; line-height: 1.6;">
            <strong style="color: #000000;">항목명:</strong> 설명
        </span>
    </div>
</div>
```

### 3. 비교 카드 (은행/금융상품 비교)

```html
<div style="background-color: #ffffff; border: 2px solid #F0F3FF; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(60, 64, 255, 0.15);">
    <h3 style="font-size: 22px; font-weight: 700; color: #000000; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 3px solid #3c40ff;">
        상품명
    </h3>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background-color: #f7fafc; border-radius: 8px;">
            <span style="font-weight: 700; color: #000000; font-size: 17px;">금리 범위</span>
            <span style="color: #3c40ff; font-weight: 700; font-size: 17px;">10.5% ~ 12.0%</span>
        </div>
        <div style="padding: 16px; background-color: #F0F3FF; border-radius: 8px; border: 2px solid #cce0ff;">
            <p style="font-size: 17px; color: #000000; margin: 0; line-height: 1.6;">
                <strong style="color: #000000;">특징:</strong> 설명
            </p>
        </div>
    </div>
    <a href="#" class="button3" style="margin-top: 16px; color: #ffffff;">
        자세히 보기
    </a>
</div>
```

### 4. 프로세스 플로우 (화살표 포함)

```html
<!-- Step 1 -->
<div style="background-color: #ffffff; border: 2px solid #3c40ff; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
    <div style="background-color: #3c40ff; color: #ffffff; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 22px; margin: 0 auto 16px auto;">1</div>
    <h3 style="font-size: 22px; font-weight: 700; color: #000000; text-align: center; margin-bottom: 20px;">
        단계 제목
    </h3>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="padding: 16px; background-color: #f7fafc; border-radius: 8px; border-left: 4px solid #3c40ff;">
            <p style="font-size: 18px; color: #000000; margin: 0; line-height: 1.6;">
                설명 내용
            </p>
        </div>
    </div>
</div>

<!-- 연결 화살표 -->
<div style="text-align: center; margin: 16px 0;">
    <div style="width: 4px; height: 32px; background-color: #3c40ff; margin: 0 auto; border-radius: 2px;"></div>
    <div style="margin: -10px auto 0 auto; width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #3c40ff;"></div>
</div>

<!-- Step 2 -->
<!-- 동일한 구조 반복 -->
```

---

## 색상 및 디자인 규칙

### 색상 팔레트 (고정)

| 용도 | 색상 코드 | 사용 예시 |
|------|-----------|-----------|
| **주요 브랜드 컬러 (블루)** | `#3c40ff` | 버튼, 강조, 테두리, 제목 라인 |
| **본문 텍스트** | `#000000` | 모든 텍스트 (블랙) |
| **보조 텍스트** | `#718096` | 캡션, 부가 정보 |
| **배경색 (밝음)** | `#f7fafc` | 섹션 배경 |
| **배경색 (강조)** | `#F0F3FF` | 하이라이트 박스 (연한 블루) |
| **성공/완료** | `#48bb78` | 완료 상태 표시 |
| **경고/주의** | `#dc3545` | 주의사항, 경고 |
| **테두리** | `#F0F3FF`, `#ffeaea` | 카드 테두리 |

### 폰트 규칙

```css
/* 폰트 패밀리 (고정) */
font-family: "Noto Sans KR", "Apple SD Gothic Neo", sans-serif;

/* 폰트 크기 (모바일 기준) */
- 메인 제목 (h1): 24px
- 섹션 제목 (h2): 22-24px
- 소제목 (h3): 20-22px
- 본문: 17px
- 버튼: 18-19px
- 캡션: 16px

/* 폰트 굵기 */
- 제목: 700 (bold)
- 강조: 700 (bold)
- 본문: 400 (normal)
- 버튼: 700 (bold)

/* 줄간격 */
- 제목: 1.5-1.6
- 본문: 1.8-1.9
- 버튼: 1.4-1.5

/* 자간 */
- 제목: -0.4px
- 본문: -0.3px
```

### 간격 규칙 (모바일)

```css
/* 패딩 */
- 컨테이너: 20-28px
- 카드: 24px
- 버튼: 18-20px (상하), 20-28px (좌우)

/* 마진 */
- 섹션 간: 40px
- 카드 간: 20px
- 요소 간: 14-16px

/* 라운드 */
- 버튼: 10px
- 카드: 12px
- 작은 요소: 8px
```

---

## 금지 사항

### ❌ 절대 사용 금지

1. **인라인 스타일 과도 사용 금지**
   - 정의된 CSS 클래스를 최대한 활용
   - 인라인 스타일은 레이아웃 조정에만 최소한 사용

2. **색상 임의 변경 금지**
   - 정의된 색상 팔레트만 사용
   - 새로운 색상 추가 금지

3. **폰트 변경 금지**
   - Noto Sans KR, Apple SD Gothic Neo 외 사용 금지
   - 폰트 크기는 정의된 범위 내에서만 사용

4. **미정의 CSS 클래스 사용 금지**
   - 가이드라인에 없는 클래스 생성 금지
   - 기존 정의된 클래스만 사용

5. **복잡한 레이아웃 금지**
   - 2단 이상의 그리드 레이아웃 금지
   - 복잡한 플렉스박스 구조 금지
   - 단순하고 명료한 세로형 레이아웃 유지

6. **작은 텍스트 사용 금지**
   - 16px 미만 폰트 크기 사용 금지
   - 중년층 가독성 고려

7. **사용하지 않는 시각화 금지**
   - 타임라인 스타일 사용 금지 (제거됨)
   - 플로우차트 스타일 사용 금지 (제거됨)
   - 아이콘 기반 가이드 사용 금지 (제거됨)
   - **카드형 스텝 디자인**과 **CTA 버튼**만 사용

### 🚫 HTML 금지사항

- `<html>`, `<head>` 태그 사용 금지 (바로 p태그로 본문 시작)
- 인트로 소제목 금지 (바로 본문 시작)
- 15px 이하 폰트 사용 금지
- **본문 내부 H1 (`<h1>`) 태그 사용 금지** (제목 중복 방지)
- **외부/내부 링크에 `target="_blank"` 사용 금지** (검색 봇 크롤링 흐름 차단 방지)
- **무의미한 앵커 텍스트 사용 금지** ("클릭", "홈페이지" 등 금지)
- **무압축 대용량 이미지 삽입 금지** (WebP 형식 권장, 속도 저하 방지)
- **본문 및 테이블 내부 마크다운 볼드 문법(`**텍스트**`) 사용 절대 금지** (HTML 문서 내에 직접 적으면 텍스트로 그대로 노출되어 렌더링이 깨집니다. 텍스트 강조 시 반드시 HTML 문법인 `<strong>강조할 텍스트</strong>` 태그를 사용하십시오.)


### 📋 HTML 레이아웃 작성 가이드라인

**1️⃣ 전체 컨테이너에 패딩 클래스 적용 금지**

```html
❌ <div class="main-container pc-padding mobile-padding">
✅ <div class="main-container">
```

**2️⃣ 중복 패딩 적용 금지**

```html
❌ 전체 컨테이너 패딩 + 카드 내부 패딩 = 이중 손실
✅ 카드 자체 패딩만 사용
```

---

## 체크리스트

### 포스팅 작성 전 확인사항

- [ ] 타겟 독자: 중년층 (40~60대)
- [ ] 최적화 기준: 모바일 가독성
- [ ] 색상 팔레트: 정의된 색상만 사용
- [ ] 폰트: Noto Sans KR, Apple SD Gothic Neo

### 포스팅 작성 중 확인사항

- [ ] 모든 본문 텍스트는 `class="seo-text"` 유지
- [ ] 소제목은 `h2` 태그만 사용 (클래스 없음)
- [ ] 버튼은 `class="button"`, `button2`, `button3` 단독 사용 (컨테이너 없음, `color: #ffffff` 명시)
- [ ] 이미지는 `seo-image` 클래스 및 `alt` 속성 포함
- [ ] 테이블은 `table-responsive`로 감싸기

### 포스팅 작성 후 확인사항

- [ ] 모바일에서 가독성 테스트
- [ ] 버튼 터치 영역 충분한지 확인 (최소 48px)
- [ ] 텍스트 대비 충분한지 확인
- [ ] 간격과 여백이 적절한지 확인
- [ ] 모든 링크가 작동하는지 확인
- [ ] 이미지 로딩 속도 확인
- [ ] 전체적인 톤 앤 매너 일관성 확인

---

## 추가 팁

### 1. 섹션 구성 순서

1. 메인 타이틀 + 요약
2. 개요/정의
3. 주요 정보 (비교표 등)
4. 단계별 가이드 (프로세스)
5. 주의사항
6. CTA (행동 유도)
7. 관련 링크

### 2. 가독성 향상 팁

- 문단은 3-5줄 이내로 짧게
- 강조할 내용은 `<strong>` 태그 사용
- 복잡한 내용은 리스트로 정리
- 시각적 구분을 위해 배경색 활용
- 중요한 정보는 박스로 강조

### 3. SEO 최적화

- `<title>` 태그: 50자 이내
- `<meta description>`: 150자 이내
- 제목에 키워드 포함
- 이미지 `alt` 속성에 설명 포함
- 내부 링크 적극 활용

### 4. 줄바꿈 규칙

- **각 문장 단위 줄바꿈**: 본문 텍스트 작성 시, 독자의 가독성과 모바일 스캔 편의성을 극대화하기 위해 **모든 개별 문장(마침표 `.`, 물음표 `?`, 느낌표 `!` 등) 끝마다 `<br />` 또는 `<p>` 태그 분할을 사용하여 강제 줄바꿈**을 적용합니다. 2~4문장씩 뭉쳐 쓰지 않습니다.

### 5. 강조 표시

- `**굵게**` → `<strong>굵게</strong>` (HTML 문법으로)

### 6. TIPSID 정보 박스 및 다중 버튼 레이아웃

**규칙**: 본문 내에 출처 정보, 공식 사이트 바로가기, 혹은 함께 보면 좋은 글 목록을 구성할 때 TIPSID 스타일의 컴포넌트를 사용합니다. 기존 `.button` 스타일은 유지하며, 블루 톤의 깔끔한 박스와 버튼 디자인을 활용해 신뢰도를 더욱 높일 수 있습니다.

#### ① 정보 강조/라벨 박스
- **구조**: `box` 클래스와 `info` 클래스를 조합하며, `data-title` 속성에 박스 제목을 명시하면 좌측 상단에 라벨이 자동으로 생성됩니다. (모바일 가시성 극대화를 위해 `data-title` 라벨의 폰트 크기가 `0.92rem`으로 확대 적용되었습니다.)
```html
<div class="box info" data-title="함께 보면 좋은 글">
    <ul>
        <li><a href="URL" style="color: #3c40ff; text-decoration: underline;">이그제큐티브 멤버십 업그레이드 혜택 총정리</a></li>
    </ul>
</div>
```

#### ② 공식 바로가기 다중 버튼 (tipsid-actionbox)
- **구조**: `box info tipsid-actionbox` 클래스 구조로 감싸고, 내부에 `wp-block-buttons` 및 `wp-block-button` 구조를 배치하여 모바일 반응형 다중 버튼 그리드를 제공합니다. (글자 크기를 키운 `1.05rem` 스타일이 스킨 CSS를 통해 적용됩니다.)
```html
<div class="box info tipsid-actionbox" data-title="공식 바로가기">
    <div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex tipsid-button-row">
        <!-- 기본 블루 솔리드 버튼 -->
        <div class="wp-block-button">
            <a class="wp-block-button__link wp-element-button" href="https://info.nec.go.kr/">선거통계시스템 확인</a>
        </div>
        <!-- 블루 아웃라인 버튼 -->
        <div class="wp-block-button is-style-outline">
            <a class="wp-block-button__link wp-element-button" href="https://www.nec.go.kr/site/nec/main.do">중앙선거관리위원회</a>
        </div>
    </div>
</div>
```

#### ③ 링크 리스트 내 블루 폰트와 밑줄 적용 (관련링크 스타일)
- **규칙**: 하단 관련 정보 등 리스트 형태의 링크를 배치할 때, 기존의 빨간색 폰트 대신 신뢰감을 주는 블루 계열 폰트(#3c40ff)와 밑줄을 필수적으로 적용합니다.
```html
<div style="background-color: #f7fafc; padding: 28px 20px; margin: 40px 16px 0 16px; border-radius: 12px; border: 2px solid #e2e8f0;">
    <h3 style="font-size: 20px; font-weight: 700; color: #000000; margin-bottom: 20px; text-align: center;">
        🔗 관련 정보 더보기
    </h3>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <a href="https://www.costco.co.kr/store-finder"
            style="display: block; width: 100%; padding: 16px; background-color: #ffffff; color: #3c40ff; font-weight: 700; font-size: 18px; text-align: center; border-radius: 8px; text-decoration: underline; border: 2px solid #fff5f5; line-height: 1.4; box-sizing: border-box; white-space: normal;">
            ✅ 우리 동네 코스트코 지점별 휴무일 확인하기
        </a>
    </div>
</div>
```

#### ④ 앵커텍스트 밑줄 규칙
- **규칙**: 본문 내 일반 텍스트 하이퍼링크(`<a>` 태그)는 모바일 및 데스크톱 환경에서 하이퍼링크임을 즉시 알아볼 수 있도록 기본적으로 밑줄(`text-decoration: underline;`)과 블루 칼라(`#3c40ff`)가 강제 적용됩니다.
- **예외 대상**: 
  - 각 `h2` 대제목 내부에 삽입된 하이퍼링크
  - 특수 디자인된 버튼 클래스들 (`.button`, `.button2`, `.button3`, `.wp-block-button__link` 등)
  이러한 예외 대상은 터치 영역이 이미 명확하거나 구조적 제목이므로 밑줄이 상쇄(`text-decoration: none !important;`)되며 원래 텍스트 컬러를 유지합니다.

#### ⑤ 자주 묻는 질문 FAQ 가독성 개선
- **규칙**: 포스팅 마지막 단락 등에 자주 묻는 질문(FAQ) 섹션을 배치할 때, 질문과 답변에 시각적인 구분이 없으면 가독성이 떨어집니다. 따라서 각 질문과 답변마다 명확한 경계가 제공되는 전용 카드 구조를 활용해야 합니다.
- **구조**: `faq-container` 내부에 개별 질문/답변 쌍을 감싸는 `faq-item` 블록을 배치하고, 질문은 `faq-question`, 답변은 `faq-answer`로 명확히 분리하여 구현합니다. (답변 왼쪽 포인트 세로선 색상은 `#3c40ff`가 적용됩니다.)
- **마크업 예시**:
```html
<div class="faq-container">
    <!-- Q1 -->
    <div class="faq-item">
        <div class="faq-question">
            <strong>Q1. 이번 주 할인 품목을 미리 알 수 있는 방법이 있나요?</strong>
        </div>
        <div class="faq-answer">
            A. 코스트코 공식 앱을 설치하거나 홈페이지의 'On Sale' 페이지를 확인하는 것이 가장 정확합니다. 또한 매주 월요일 오전에 업데이트되는 블로그 후기들을 참고하면 실시간 현장 할인 정보를 알 수 있어요.
        </div>
    </div>
    
    <!-- Q2 -->
    <div class="faq-item">
        <div class="faq-question">
            <strong>Q2. 현대카드가 없는데 결제가 불가능한가요?</strong>
        </div>
        <div class="faq-answer">
            A. 카드 결제는 현대카드만 가능하지만, <strong>현금 결제는 언제나 가능</strong>합니다. 또한 현대카드가 없다면 매장에서 상품권을 구매해 입장 및 결제에 활용할 수도 있어요.
        </div>
    </div>
</div>
```

#### ⑥ 목차 (TOC) 스타일 규칙
- **규칙**: 본문 상단 등에 자동 생성되는 목차(`.tocify-inner`, `#toc`, `.toc`, `.table-of-contents` 등)의 배경은 `#F0F3FF` 컬러가 적용되어 가독성을 높입니다.
- **예외 적용**: 목차 내부의 링크 텍스트에는 일반 본문 앵커 텍스트 스타일(밑줄 및 블루 컬러 강제 적용)이 들어가지 않도록 해제하며, 회색 톤(`color: #334155`) 및 밑줄 제거가 적용됩니다. 마우스 오버 시에만 블루 컬러와 밑줄이 표시됩니다.

#### ⑦ 인트로 본문 직후 핵심 요약 박스
- **규칙**: 인트로 본문(서론) 텍스트가 끝나는 바로 직후(인트로 광고 및 CTA 버튼 3개보다 더 앞선 지점)에 핵심 요약을 한눈에 짚어주는 파란색 박스(`box info` 컴포넌트)를 반드시 배치합니다.
- **구조**: `box info` 클래스로 감싸고 `data-title="핵심 요약"` 속성을 지정하며, 내부에 `<ul>` 및 `<li>` 태그를 활용해 4~5가지의 요약 문장을 작성합니다.
```html
<div class="box info" data-title="핵심 요약">
    <ul>
        <li>여기에 첫 번째 핵심 요약 문장을 작성하세요.</li>
        <li>여기에 두 번째 핵심 요약 문장을 작성하세요.</li>
    </ul>
</div>
```

#### ⑧ 출처 및 확인 자료 박스
- **규칙**: 포스팅의 전문성 및 신뢰도(EEAT)를 확보하기 위해 각 H2(또는 주요 대주제) 본문 텍스트 내용이 끝나는 **바로 직후**에 공식 출처 및 관련 자료 링크 목록을 담는 파란색 박스(`box info` 컴포넌트)를 배치합니다. (기타 다른 요소나 다음 H2가 오기 전에 위치시킴)
- **구조**: `box info` 클래스로 감싸고 `data-title="출처(공식)"` 또는 `data-title="출처 및 확인 자료"` 속성을 지정하며, 내부에 `<ul>` 및 `<li>` 태그와 `<a>` 링크들을 3~4개 리스트로 나열합니다. (외부 링크 이동 시 `target="_blank"`는 사용하지 않습니다.)
```html
<div class="box info" data-title="출처 및 확인 자료">
    <ul>
        <li><a href="공식URL">기관명 또는 공식 서비스명</a></li>
        <li><a href="공식URL">관련 공식 보도자료 바로가기</a></li>
    </ul>
</div>
```

#### ⑨ 범용 정보 개요 기재 양식
- **규칙**: 금융 상품, 정책 지원금, 기업 공모주 청약, 주요 이벤트 등 다양한 주제의 요약 정보를 다룰 때, 독자가 주요 요소를 한눈에 파악할 수 있도록 콜론(`:`)과 쉼표(`,`)를 활용하여 다음과 같이 한 문장씩 줄바꿈하여 간결하게 구성합니다.
```markdown
지원 대상: 만 19세 ~ 34세 이하 청년 무주택자
지원 혜택: 전세자금 대출 최대 2억 원 한도, 연 1.8% ~ 2.7% 금리
신청 기간: 2026년 상시 접수 (예산 소진 시 조기 마감)
```


---

**이 가이드라인을 따라 모든 주제에 유연하게 적용하되, 주제별 특성을 고려하여 톤과 구조를 조정하세요!**