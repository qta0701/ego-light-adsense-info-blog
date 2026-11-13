from pathlib import Path
import html

base = Path('26_1113/노하우2_배민클럽 환불/웹조사')
publish = base / 'publish'
official = 'https://terms.baemin.com/content/BAEMINCLUB_658'
secondary = 'https://kooltip.com/baemin-club-cancel/'
images = [
 dict(id='01',file='03_01_refund.png',raw='raw/01_refund.png',size=(1100,955),section='전액 환불 조건부터 확인',sid='refund',intro='공식 약관 제11조에서 두 조건과 요청의 도달에 관한 부분을 확인할 수 있습니다.',result='혜택 사용 여부가 애매하다면 결제·혜택 내역을 확인하고 고객센터에 문의하세요.',alt='배민클럽 이용약관 제11조의 전액 환불 요건을 강조한 화면',caption='전액 환불 요건을 표시한 공식 약관 화면입니다. 2026년 11월 13일 확인.',source=official,role='reference',edit='기존 발행본의 빨간 테두리와 화살표, 표식 1; 개인정보 없음'),
 dict(id='02',file='02_06_entry.png',raw='raw/06_entry.png',size=(860,730),section='앱에서 해지와 환불 표시 확인',sid='steps',intro='다음 그림은 외부 안내 글이 정리한 해지 경로이며 실제 배민 앱 화면은 아닙니다.',result='앱 버전에 따라 메뉴 이름과 표시 순서는 달라질 수 있습니다.',alt='외부 안내 글에 정리된 마이배민부터 해지 예약까지의 경로',caption='외부 안내의 절차 요약입니다. 실제 앱 화면이 아니며 2026년 11월 13일 확인했습니다.',source=secondary,role='guide',edit='기존 발행본의 빨간 테두리와 화살표, 표식 1; 광고 영역 제외, 개인정보 없음'),
 dict(id='03',file='blogger-images/02_cancel_detail.png',raw='raw/02_cancel.png',size=(1080,345),section='환불과 정기결제 해지의 차이',sid='cancel',intro='공식 약관 제11조 3항은 전액 환불 요건에 해당하지 않는 일반 이용권의 해지 시점을 설명합니다.',result='즉, 해지 예약과 전액 환불은 같은 결과가 아니므로 화면에 나타난 종료일을 확인해야 합니다.',alt='배민클럽 약관에서 정기결제 해지와 이용기간 종료 조항을 강조한 화면',caption='정기결제 해지 후 이용기간에 관한 공식 약관 발췌입니다. 2026년 11월 13일 확인.',source=official,role='reference',edit='원본에서 제11조 부분을 자르고 3항에 빨간 테두리 추가; 개인정보 없음'),
 dict(id='04',file='04_03_long.png',raw='raw/03_long.png',size=(1100,955),section='장기 구독과 프로모션 예외',sid='exceptions',intro='장기 구독상품에 관한 별도 공제 규정은 아래 공식 약관의 강조 부분에서 확인할 수 있습니다.',result='본인이 어떤 이용권을 결제했는지와 앱에 안내된 적용 조건을 먼저 확인하세요.',alt='배민클럽 약관 제11조의 장기 구독상품 공제 규정을 강조한 화면',caption='장기 구독상품의 별도 규정을 표시한 공식 약관 화면입니다. 2026년 11월 13일 확인.',source=official,role='reference',edit='기존 발행본의 빨간 테두리와 화살표, 표식 1; 개인정보 없음'),
]
def block(im):
 n=im['id']; w,h=im['size']; s=im['sid']
 return f'''<p id="{s}-intro" class="seo-text">{im['intro']}</p>
<!-- IMAGE_SLOT:IMG_{n} START -->
<div id="img-{n}" data-image-id="IMG_{n}" class="seo-image-container" style="margin: 24px 0; background: transparent;">
  <img src="{{{{BLOGGER_IMAGE_URL_IMG_{n}}}}}" alt="{im['alt']}" class="seo-image" width="{w}" height="{h}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
  <p class="seo-image-caption" style="font-size: 16px; line-height: 1.6;">{im['caption']}</p>
</div>
<!-- IMAGE_SLOT:IMG_{n} END -->
<p id="{s}-result" class="seo-text">{im['result']}</p>'''

body=f'''<p class="seo-text">배민클럽을 결제한 뒤 이용하지 않았다면 환불이 가능한지 먼저 확인해 보세요.</p>
<p class="seo-text">2026년 10월 1일 시행 약관 기준으로 <strong>결제일 다음 날부터 7일 이내</strong>이고 <strong>배민클럽 혜택을 전혀 사용하지 않은 경우</strong>, 청약철회 또는 해지 요청이 회사에 도달하면 전액 환불됩니다. <a href="#source-s1">공식 약관 확인</a></p>
<p class="seo-text">두 조건을 충족하지 않는 일반 이용권은 정기결제가 해지되고 이미 결제한 이용기간이 끝난 직후 계약이 종료됩니다. 장기 구독과 프로모션에는 별도 조건이 있습니다.</p>
<div class="box info" data-title="핵심 요약">
  <ul>
    <li>전액 환불: 결제일 익일부터 7일 이내, 혜택 미사용, 요청 의사의 회사 도달을 함께 확인합니다.</li>
    <li>일반 이용권: 위 요건을 충족하지 않으면 정기결제 해지 후 기존 이용기간을 확인합니다.</li>
    <li>장기 구독상품과 프로모션은 별도 공제 또는 안내 조건이 적용될 수 있습니다.</li>
    <li>앱의 최종 해지·환불 안내와 처리 결과를 확인하고 불명확하면 고객센터에 문의합니다.</li>
  </ul>
</div>
<div class="button-container"><a class="button3" href="{official}" style="color: #ffffff;">배민클럽 공식 이용약관 확인</a></div>

<h2 id="refund"><a href="{official}">전액 환불 조건부터 확인</a></h2>
<p class="seo-text">약관 제11조의 기준은 결제일의 다음 날부터 7일 이내인지, 그리고 배민클럽 혜택을 전혀 사용하지 않았는지입니다. 두 요건을 모두 충족한 회원의 요청 의사가 회사에 도달하면 청약철회 및 이용계약이 종료되고 전액 환불됩니다.</p>
<p class="seo-text">예를 들어 결제일이 1일이라면 기간은 그 다음 날인 2일부터 세어 봅니다. 경계 날짜에 해당하거나 이용 내역이 불분명하다면 기다리지 말고 앱 안내와 고객센터에서 본인의 적용 여부를 확인하세요.</p>
{block(images[0])}
<p class="seo-text">결제일, 상품명과 혜택 사용 내역을 함께 살펴보면 문의할 때도 도움이 됩니다. 실제 환불 가능 여부와 금액은 본인의 이용권 및 적용 조건을 기준으로 확인해야 합니다.</p>
<div class="box info" data-title="출처 및 확인 자료"><ul><li id="source-s1"><a href="{official}">배달의민족 배민클럽 이용약관 제11조</a> · 2026-11-13 확인</li></ul></div>

<h2 id="steps"><a href="{secondary}">앱에서 해지와 환불 표시 확인</a></h2>
<p class="seo-text">배달의민족 앱에서 마이배민을 열고 마이배민클럽으로 들어가 이용권과 결제일을 확인합니다. 외부 안내에 따르면 화면 아래의 해지하기를 찾아 안내와 해지 사유를 거쳐 마지막 해지 또는 해지 예약 화면까지 진행하는 경로입니다. <a href="#source-s2">외부 안내 확인</a></p>
{block(images[1])}
<p class="seo-text">중간에 해지하기를 한 번 선택한 것만으로 처리가 끝났다고 판단하지 말고, 마지막 안내에서 해지 또는 예약 여부와 이용 종료일을 살펴보세요. 환불 금액이나 처리 결과가 표시되면 함께 확인합니다.</p>
<p class="seo-text">이 글은 공개 약관과 외부 안내를 바탕으로 작성했으며 개인 계정의 실제 결제·해지 화면은 확인하지 않았습니다. 메뉴가 다르거나 결과가 명확하지 않으면 앱 고객센터에 결제일과 이용권 종류를 알려 문의하세요.</p>
<div class="box info" data-title="출처 및 확인 자료"><ul><li id="source-s2"><a href="{secondary}">KOOLTIP 배민클럽 해지 안내</a> · 2026-11-13 확인</li><li><a href="{official}">배민클럽 이용약관</a> · 2026-11-13 확인</li></ul></div>

<h2 id="cancel"><a href="{official}">환불과 정기결제 해지의 차이</a></h2>
<p class="seo-text">일반 이용권에서 전액 환불 요건을 충족하지 않고 해지를 통지하면 정기결제가 중단되고, 마지막으로 결제한 이용기간이 끝난 직후 계약 해지의 효력이 발생합니다. 그 기간에는 서비스를 이용할 수 있으며 다음 결제일부터 이용료가 결제되지 않습니다. <a href="#source-s1">약관 제11조</a></p>
{block(images[2])}
<p class="seo-text">같은 조항은 이 방식으로 정기결제를 해지한 회원이 현재 이용기간 종료일 전일까지 해지를 취소할 수 있다고 정합니다. 실제 앱의 예약 상태와 종료일은 개인별 화면에서 확인하세요.</p>
<div class="box info" data-title="출처 및 확인 자료"><ul><li><a href="{official}">배민클럽 이용약관 제11조 3~4항</a> · 2026-11-13 확인</li></ul></div>

<h2 id="exceptions"><a href="{official}">장기 구독과 프로모션 예외</a></h2>
<p class="seo-text">장기 구독상품은 전액 환불 요건을 충족하지 않더라도 요청 의사가 회사에 도달하면 계약이 종료되고 별도 공제 후 환불하는 규정이 있습니다. 약관상 공제 항목은 실제 결제금액 기준으로 이미 이용한 일수의 일할 이용료와 정상가의 10%입니다. <a href="#source-s1">약관 제11조</a></p>
{block(images[3])}
<p class="seo-text">프로모션 등 비정기 혜택의 철회·해지·환불은 앱 화면 등에 별도로 안내되는 조건을 따릅니다. 장기 상품의 공제 규정을 모든 일반 이용권에 일괄 적용하거나, 행사 조건이 같다고 단정하지 마세요.</p>
<div class="box info" data-title="출처 및 확인 자료"><ul><li><a href="{official}">배민클럽 이용약관 제11조 5~6항</a> · 2026-11-13 확인</li></ul></div>

<h2 id="faq"><a href="{official}">자주 묻는 질문</a></h2>
<div class="faq-container">
  <div class="faq-item"><div class="faq-question"><strong>Q. 혜택을 썼다면 무조건 모든 환불이 불가능한가요?</strong></div><div class="faq-answer">A. 혜택 미사용은 약관의 전액 환불 요건 중 하나입니다. 장기 상품이나 프로모션은 별도 조건이 있으므로 이용권과 적용 안내를 확인하세요.</div></div>
  <div class="faq-item"><div class="faq-question"><strong>Q. 해지 예약 후 바로 이용할 수 없나요?</strong></div><div class="faq-answer">A. 일반 이용권의 약관상 정기결제 해지는 마지막 결제에 해당하는 이용기간이 끝난 직후 효력이 생깁니다. 앱에 표시된 상태와 종료일을 확인하세요.</div></div>
  <div class="faq-item"><div class="faq-question"><strong>Q. 환불 완료까지 며칠이 걸리나요?</strong></div><div class="faq-answer">A. 확인한 약관에서 일률적인 처리 기간은 확인하지 못했습니다. 결제수단과 처리 상태를 고객센터에서 확인하세요.</div></div>
</div>
<div class="box info" data-title="출처 및 확인 자료"><ul><li><a href="{official}">배민클럽 이용약관</a> · 2026-11-13 확인</li></ul></div>
'''
(publish/'노하우2_배민클럽 환불_html콘텐츠.html').write_text(body,encoding='utf-8')

titles=['배민클럽 환불 조건과 해지 방법, 전액 환불 기준 확인','배민클럽 환불 7일 기준과 혜택 사용 여부 확인하기','배민클럽 환불 신청 전 결제일과 이용권 확인하는 법','배민클럽 환불과 해지 예약 차이, 앱에서 확인할 것','배민클럽 환불 가능할까? 전액 환불과 장기 구독 예외','배민클럽 환불 조건 정리: 미사용·결제일·해지 절차','배민클럽 환불 방법과 정기결제 해지 시 유의사항']
hooks=['결제일 다음 날부터 기간을 확인하세요','혜택을 사용했는지 먼저 살펴보세요','해지 예약과 환불 결과를 구분하세요','마지막 확인 화면까지 진행하세요','장기 구독은 별도 공제를 확인하세요','프로모션은 앱의 안내 조건을 확인하세요','처리 결과가 불명확하면 고객센터에 문의하세요']
metas=['배민클럽 환불의 전액 환불 요건과 앱 해지 경로, 장기 구독 및 프로모션 예외를 확인하세요.','배민클럽 결제일과 혜택 사용 여부에 따른 환불 조건과 정기결제 해지 차이를 안내합니다.','배민클럽 해지 전 7일 기준, 미사용 조건과 이용권별 환불 안내를 확인해 보세요.']
txt=f'''[작업 정보]
메인 키워드: 배민클럽 환불
탭 / 대상 폴더: 노하우2 / 26_1113/노하우2_배민클럽 환불
spreadsheetId / sheetId / 실제 행: 1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s / 962861723 / 36
runId / threadId: 20261113-content-1401 / 01a1d349-d3c7-7661-8607-f1b25c7534a9
시트 확인: 조정자 dispatch 기준 2026-11-13, D 공란 / D열 반영 상태: 조정자 대기
조사·약관 재확인일 / 작성일: 2026-11-13 / 2026-11-13

[제목 후보 7개]
최종 추천 제목: {titles[0]}
'''+''.join(f'{i}. {x}\n' for i,x in enumerate(titles,1))+'''
[후킹 문구 후보 7개]
최종 추천 후킹: 결제일 다음 날부터 기간을 확인하세요
'''+''.join(f'{i}. {x}\n' for i,x in enumerate(hooks,1))+f'''
[메타디스크립션 후보 3개]
최종 추천 메타디스크립션: {metas[0]}
'''+''.join(f'{i}. {x} (공백 포함 {len(x)}자)\n' for i,x in enumerate(metas,1))+'''
[영문 퍼머링크 후보 3개]
최종 추천 슬러그: baemin-club-refund
1. baemin-club-refund
2. baemin-club-cancellation-refund
3. baemin-club-refund-conditions
한글 참고 문구: 배민클럽 환불 조건과 해지 방법
라벨 제안: 배민클럽, 환불, 구독 해지

[Blogger 이미지 업로드 추천 순서와 삽입 위치]
채택 이미지 4개 / 제외·보류 이미지 5개
대표 이미지 추천: IMG_01 / 03_01_refund.png / 핵심 전액 환불 요건을 설명하는 공식 약관
'''
for i,im in enumerate(images,1):
 n=im['id']; s=im['sid']; w,h=im['size']; marker='해당 없음' if n=='03' else '빨간 표식 1'; src='S2 외부 안내' if n=='02' else 'S1 배민클럽 공식 약관'
 txt+=f'''
삽입 ID: IMG_{n}
추천 업로드 순서 / 본문 노출 순서: {i} / {i}
원래 파일번호 / 파일명: {im['raw']} → {im['file']}
원본 경로: {base.as_posix()}/{im['raw']}
업로드 파일 경로: {publish.as_posix()}/{im['file']}
이미지 내부 표식 번호 / 본문 절차 번호: {marker} / 해당 없음
역할: {im['role']} / 화면 종류: {'외부 웹 안내 도식, 실제 앱 화면 아님' if n=='02' else '공식 약관 PC 웹'}
삽입 소제목: {im['section']} / id={s}
직전 문단: id={s}-intro / {im['intro']}
직후 문단: id={s}-result / {im['result']}
HTML 위치: id=img-{n} / data-image-id=IMG_{n} / IMAGE_SLOT:IMG_{n}
치환 토큰: {{{{BLOGGER_IMAGE_URL_IMG_{n}}}}}
권장 alt: {im['alt']}
권장 캡션: {im['caption']}
크기 / 표시: {w}×{h}px / 가로 100% 이내, 비율 유지
출처 / 실제 화면 URL / 확인일: {src} / {im['source']} / 2026-11-13
가림·편집·가독성: {im['edit']}; 모바일의 작은 글씨는 본문으로 보완
순서 변경 사유: 환불 조건을 먼저 답하고 앱 경로, 일반 해지, 장기 예외 순으로 배치
업로드 상태 / Blogger 이미지 URL / 확대 링크: 미업로드 / 미업로드 / 없음
'''
txt+=f'''
[제외·보류 이미지]
{publish.as_posix()}/01_05_search.png: 공식 홈페이지 검색 결과로 환불 절차 직접 설명이 부족해 제외.
{base.as_posix()}/raw/04_promo.png: 다른 약관 캡처와 내용이 겹쳐 제외.
{base.as_posix()}/raw/07_confirm.png: 외부 안내 화면이 06과 중복되어 제외.
{base.as_posix()}/raw/05_search.png: 검색 화면 원본, 발행본과 중복 및 계정 영역 포함으로 제외.
{base.as_posix()}/raw/08_terms_recheck.png: 재확인용 약관 첫 화면이며 실제 앱의 해지·환불 단계가 아니어서 제외.
보완 시도: raw와 기존 4개 발행본 직접 검토, Google 검색 및 공식 약관 재방문. 실제 계정의 해지·환불 확인 화면은 확보하지 못함. 필요하면 후속 담당자가 본인 계정에서 개인정보를 가린 실제 화면을 확인하여 보완.

[업로드 담당 에이전트 전달사항]
허용 작업: 파일만 작성. 이미지 미업로드, Blogger 초안·발행 미수행.
이미지 업로드 후 ID별 실제 URL로 토큰을 치환하고 대상 테마에서 다시 미리보기. 광고 설정 및 대표 이미지 바인딩은 대상 블로그에서 확인.
G/H/L 반영: 미수행. D열은 조정자 전담.

[검수 결과]
파일·이미지 실물, 본문 사실과 이미지 순서, ID/토큰·alt·캡션 대응 검수.
모바일/PC 로컬 미리보기: 확인 예정. 실제 Blogger 테마 미리보기는 미수행.
미해결 사항: 실제 앱의 개인별 화면과 환불 처리 기간 미확인. 작은 캡처 글자는 본문으로 보완.
'''
(publish/'노하우2_배민클럽 환불_제목메타디스크립션.txt').write_text(txt,encoding='utf-8')
