import json, hashlib
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root=Path(__file__).resolve().parents[2]
date='2026-11-13'
font=ImageFont.truetype('C:/Windows/Fonts/malgun.ttf',25)
jobs=[
 dict(key='부산은행 환전', row=14, sources=[('S1','부산은행 ONE환전 이용안내','https://www.busanbank.co.kr/ib20/mnu/FPMFRX189002011')],
 body='''## 바로 답하기
부산은행 ONE환전은 외화를 신청한 뒤 영업점 수령, 현찰배달 또는 금고보관을 선택하는 서비스다. 2026년 11월 13일 공식 안내 기준으로 개인 대상은 국민인 거주자 개인이다. 이용할 수 있는 수령 방식과 한도는 로그인 여부에 따라 다르다. 최종 적용환율, 우대율, 보유 지점과 수령 가능일은 신청 직전에 은행 화면에서 확인한다. [S1]

## 이용 전 확인
공식 안내는 15개 통화를 제시한다. USD·JPY·EUR·CNY 외에 THB, SGD, HKD, AUD, GBP, NZD, CAD, CHF, IDR, VND, PHP가 포함된다. 환전 가능한 통화와 실제 지점 보유 권종은 같은 뜻이 아니므로 필요한 현찰이 있는지 미리 문의한다. [S1]

이용시간은 24시간·365일로 안내하지만 금고보관은 주말과 공휴일에 거래할 수 없다. 비로그인 환전의 가상계좌 입금은 23:30~24:30에 불가하다. 로그인 환전 한도는 미화 100~1만 달러 이하이며 부산은행 비대면 환전 신청액과 미수령 잔액을 합산한다. 비로그인은 원화 100만원 이하다. 정확한 적용 범위는 신청 화면에서 다시 확인한다. [S1]

## 신청과 수령 경로
1. 부산은행 공식 사이트에서 금융상품 → 외환 → 환전 → 환전서비스안내 → ONE환전으로 이동해 이용안내를 읽는다. 이미지 2는 해당 서비스의 개요다. [S1]
2. 이용 대상과 시간, 통화 및 한도를 비교한다. 이미지 3과 4는 공식 안내의 서로 다른 항목이다. 로그인 및 비로그인 조건을 혼동하지 않는다. [S1]
3. 환전수령·현찰배달·금고보관 중 가능한 방식을 확인하고, 앱 또는 은행의 신청 화면에서 안내하는 통화·금액·수령 방법을 선택한다. 실제 신청 화면의 세부 순서와 입력 항목은 확인하지 못했으므로 이용 시 화면 지시를 따른다. 이미지 5는 수령 방식별 비교표의 시작 부분이다. [S1]
4. 영업점 수령은 신청 시점에 해당 외화를 보유한 영업점이 대상이다. 안내에는 신청일로부터 30일 이내 인수와 인수예정일 포함 7영업일의 유효기간이 기재되어 있다. 실제 신청 내역의 날짜를 반드시 확인한다. [S1]

## 차이와 유의사항
개인 로그인 고객의 환전수령은 본인 및 대리인 수령이 가능하고 비로그인 고객은 본인만 가능하다. 대리 수령의 구체 서류는 안내에서 확인하지 못했으므로 방문 전 지점에 문의한다. 비로그인 고객은 안내 표에서 현찰배달과 금고보관을 이용할 수 없다. [S1]

로그인 고객의 현찰배달은 미화 100달러 이상이면서 원화 150만원 이하, 안내된 11개 통화에 한하며 건당 배송비 1만원이 표시된다. 배달 불가 지역과 일정이 있을 수 있다. 외화 ATM은 당일 인수가 불가하고 지점별 통화가 다르다. 예를 들어 안내에는 김해공항 USD·JPY, 국제여객터미널 JPY가 기재되어 있다. [S1]

유효기간이 지나면 로그인 환전수령 외화는 금고에 자동 보관되고, 비로그인 거래는 안내된 조건의 자동환매가 적용될 수 있다. 환매 시 환율이 달라 원화 금액이 바뀔 수 있으므로 신청 시 안내를 확인한다. 일반 은행의 우대율을 고정 수치로 가정하지 않는다. [S1]

## 조사 범위와 검색 참고
첫 Google 검색의 부산은행 모바일 공식 결과를 실제로 열었으나 페이지가 존재하지 않는 오류가 나왔다. 이후 부산은행의 금융상품·외환 메뉴에서 ONE환전 안내에 직접 도달했다. 이미지 1은 오류가 난 원래 검색 결과이며, 공식 서비스 본문 근거로 사용하지 않는다. 앱 로그인이나 실제 금융거래는 진행하지 않았다. 조건과 화면은 바뀔 수 있다.''',
 images=[('01_search','검색 결과: 첫 공식 링크는 방문 시 오류', 'search',(0,560,1280,900)),('02_intro','공식 ONE환전 서비스 개요','guide',None),('03_target','이용대상과 이용시간 확인','guide',None),('04_limits','로그인별 환전 가능 한도','guide',None),('05_pickup','수령 방법별 비교표','guide',None)]),
 dict(key='국민은행 환전신청',row=15,sources=[('S1','KB국민은행 환전신청 및 지점 수령 이용안내','https://obank.kbstar.com/quics?page=C101339')],
 body='''## 바로 답하기
KB국민은행 개인뱅킹의 외환 → 환전 → 환전신청에서 지점 수령, 외화배달, 외화 선물 중 서비스를 선택할 수 있다. 이 자료는 지점에서 받기 기준이다. 신청하기를 누르면 로그인 후 환전신청과 비로그인 환전신청을 선택하는 화면이 나타난다. 조사일은 2026년 11월 13일이며, 환율과 조건은 신청 직전 공식 화면에서 다시 확인한다. [S1]

## 신청 순서
1. Google 검색의 국민은행 공식 환전신청 결과를 열거나 개인뱅킹의 외환 → 환전 → 환전신청으로 이동한다. 검색 결과와 실제 신청 화면은 이미지 1과 2를 참고한다. [S1]
2. 지점에서 받기의 이용안내를 먼저 열어 대상, 통화, 결제 방식, 한도와 수령일을 확인한다. 공식 안내에는 17개 현찰 통화가 표시된다. 화면의 최대 90%는 모든 통화·고객에 동일하게 적용되는 확정 우대율이 아니다. 최종 적용율을 확인한다. [S1]
3. 신청하기를 누르고 로그인 또는 비로그인을 선택한다. 비로그인 경로는 약관동의 → 정보입력 → 입력정보확인으로 표시되었다. 본 조사에서는 약관 확인 화면까지만 열고 동의나 정보 입력을 하지 않았다. 신청자는 본인이 내용을 읽고 필요한 사항에 동의한 후 실제 화면의 지시를 따른다. [S1]
4. 신청 과정에서 통화와 금액, 수령 희망점 및 날짜, 결제와 최종 원화 금액을 확인한다. 세부 입력 화면은 본 조사에서 확인하지 못했다. 거래를 확정하기 전 수령 가능 여부와 환율을 재확인한다. [S1]

## 대상·결제와 한도
공식 지점 수령 안내의 대상은 국민인 거주자 개인과 국내 법인(개인사업자 포함)이며 외국인·재외동포는 거래 불가로 표시된다. 비로그인 서비스는 국민인 거주자 개인만 가능하다. 인증서 로그인 고객은 본인 명의 계좌에서 출금하고, 인증서 비로그인 고객은 신청 완료 후 30분 이내 가상계좌로 입금한다. 송금 은행의 입금 수수료가 발생할 수 있다. [S1]

비로그인 고객은 원화 100만원 상당액 이하이며 최소 미화 50달러 상당액 이상으로 안내된다. 로그인 고객의 일별 한도는 은행 영업일 09:00~16:00에는 미화 1만 달러 상당액 미만, 이후 시간대에는 5천 또는 2천 달러 상당액 이하로 구분된다. 다른 비대면 채널 거래와 미수령 금액도 제한에 영향을 준다. 월간·연간 한도와 정확한 시각 구분은 공식 이용안내에서 확인한다. [S1]

## 수령일·서류·취소
일반 영업점의 USD·JPY·EUR·CNY는 신청일 포함 1개월 범위에서, 기타 통화는 신청일부터 2영업일 이후부터 1개월 범위에서 수령일을 지정하도록 안내한다. 지점의 재고와 영업시간에 따라 선택 가능 여부가 달라질 수 있으니 방문 전 해당 지점에 확인한다. 성인 본인 수령은 신청번호가 포함된 문자와 본인 신분증을 준비한다. 미성년자와 법정대리인의 서류는 별도 조건을 확인한다. [S1]

완료된 환전은 취소할 수 없으며 되팔기 시 거래 시점의 환율에 따라 원래 낸 원화와 차이가 날 수 있다. 수령희망일을 포함해 7영업일까지 찾지 않으면 8영업일 자동 되팔기가 적용되는 경우가 있으며 예외가 있다. 은행의 최신 안내와 본인 신청 내역을 함께 확인한다. [S1]

여행자보험은 미화 300달러 이상 환전 시 가입 가능하다는 안내와 함께 통화별 우대율 15%p 차감 조건이 표시된다. 마일리지는 별도 기준과 우대율 조건이 있다. 보험·마일리지 혜택을 선택하기 전 전체 비용을 비교한다. [S1]''',
 images=[('01_search','국민은행 공식 환전신청 검색 결과','search',(0,140,1000,300)),('02_options','지점에서 받기와 이용안내','guide',None),('07_login_choice','로그인 또는 비로그인 선택','guide',None),('08_nonlogin','비로그인 약관 확인 단계','guide',None),('04_payment','로그인별 결제 방식','guide',None),('05_pickup','통화별 수령희망일','guide',None),('06_caution','완료 후 취소와 되팔기 유의사항','guide',None)]),
 dict(key='국민은행 통장사본 출력',row=16,sources=[('S1','KB국민은행 뱅킹관리와 통장사본','https://obank.kbstar.com/quics?page=C016535'),('S2','dobiho 모바일·PC 출력 안내, 2026-04-30','https://dobiho.com/57893/')],
 body='''## 바로 답하기
KB국민은행 PC 개인뱅킹에서 뱅킹관리 → 제증명발급 → 통장사본으로 들어갈 수 있다. 실제 공식 메뉴를 열어 해당 항목을 확인했으며, 통장사본 페이지는 로그인 화면으로 연결됐다. 로그인 후 계좌 선택과 인쇄는 본인 계정에 접근하지 않아 직접 확인하지 못했고, 2026년 4월 30일 공개된 별도 사용 안내를 보조 근거로 정리했다. 화면은 버전에 따라 달라질 수 있다. 확인일 2026년 11월 13일. [S1][S2]

## PC에서 출력하기
1. 국민은행 공식 개인뱅킹에 접속해 뱅킹관리를 선택한다. 제증명발급 영역의 통장사본 메뉴를 누른다. 이미지 2는 실제 공식 메뉴 위치다. [S1]
2. 로그인 화면에서 본인이 사용하는 인증 방법을 선택한다. 확인 당시 KB국민인증서, 공동·금융인증서, 아이디 로그인 탭이 나타났다. QR코드 생성이나 인증은 진행하지 않았다. 이미지 3은 인증 전 화면이다. [S1]
3. 별도 사용 안내에 따르면 로그인 후 필요한 계좌의 한글 또는 영문 미리보기를 선택하고 인쇄를 누른 뒤 인쇄 팝업에서 다시 인쇄를 선택한다. 계좌 목록과 버튼의 현재 상태는 직접 검증하지 못했다. 실제 화면의 계좌와 언어를 확인하고 진행한다. [S2]
4. 프린터가 연결되어 있다면 인쇄 대상을 선택한다. PDF가 필요하다면 운영체제의 인쇄창에서 PDF 저장 대상을 선택할 수 있다. 파일명과 보관 위치를 확인한 뒤 제출처가 원하는 형식인지 점검한다. [S2]

## 스마트폰에서 저장하기
별도 공개 안내는 KB스타뱅킹 로그인 후 해당 계좌의 더보기 메뉴에서 통장사본을 선택하고 인증을 거쳐 저장하는 경로를 설명한다. 이는 2026년 4월의 제3자 설명이며 본 조사에서 앱 내부를 직접 열어 검증한 단계는 아니다. 앱 UI나 계좌 종류에 따라 메뉴가 다를 수 있으므로 앱에서 통장사본을 검색하고 표시되는 안내를 확인한다. 저장된 이미지의 이름·은행·계좌번호가 제출하려는 계좌와 일치하는지 확인한다. [S2]

## STM을 이용하는 대안
은행의 STM 안내에는 주요 가능 업무로 통장 사본 출력이 포함되어 있다. STM은 신분증 스캔과 인증을 사용하는 무인 채널이며, 안내된 이용대상은 만 19세 이상 실명의 개인으로 개인사업자·임의단체·외국인·공동명의 계좌는 제외된다. 화상인증 시간과 운영점의 시간은 다를 수 있으니 방문 전 공식 운영점 안내를 확인한다. 일반 ATM과 STM은 같다고 가정하지 않는다. 이미지 4는 공식 업무 목록이다. [S1]

## 제출 전 확인
통장사본에는 예금주와 계좌정보가 포함된다. 실제 제출처가 요구하는 서류가 통장사본인지 계좌개설확인서 또는 별도 증명서인지, 한글·영문 및 이미지·PDF 중 어떤 형식이 필요한지 먼저 확인한다. 출력 후 저장한 파일과 인쇄물은 필요한 범위에서만 전달한다. PC 로그인 이후 화면과 실제 프린터 출력, 앱의 현행 화면은 직접 확인하지 못했다. [S1][S2]''',
 images=[('01_search','공식 통장사본 검색 결과','search',(0,560,1280,900)),('03_menu','뱅킹관리의 통장사본 메뉴','guide',None),('02_login','계좌 접근 전 로그인 선택','guide',None),('04_stm','STM 가능 업무의 통장 사본 출력','guide',None)])
]

for job in jobs:
 d=root/'26_1113'/('은행_재테크_'+job['key'])/'웹조사'; data=json.loads((d/'research.json').read_text(encoding='utf-8'))
 images=[]; md=[f"# {job['key']} 웹조사 결과",f"조사일: {date} | 은행_재테크 {job['row']}행",job['body'],'## 이미지 배치 및 출처']
 for idx,(name,caption,role,crop) in enumerate(job['images'],1):
  meta=json.loads((d/'evidence'/f'{name}.json').read_text(encoding='utf-8')); boxes=meta.get('boxes',[])
  if name=='02_login': boxes=[[284,145,856,59]]
  if name=='08_nonlogin': boxes=[[482,251,720,269]]
  source=Image.open(d/'raw'/f'{name}.png').convert('RGB'); w,h=source.size
  if crop:
   x0,y0,x1,y1=crop; source=source.crop(crop); boxes=[[x-x0,y-y0,bw,bh] for x,y,bw,bh in boxes]
  draw=ImageDraw.Draw(source)
  for x,y,bw,bh in boxes:
   pad=10;x=max(4,x-pad);y=max(4,y-pad);right=min(source.width-5,x+bw+2*pad);bottom=min(source.height-5,y+bh+2*pad)
   draw.rectangle((x,y,right,bottom),outline='#e11b22',width=6)
   if right+60<source.width:
    cy=(y+bottom)//2; draw.line((right+40,cy,right+3,cy),fill='#e11b22',width=6); draw.polygon([(right,cy),(right+14,cy-9),(right+14,cy+9)],fill='#e11b22'); draw.text((right+42,max(0,cy-17)),'1',font=font,fill='#e11b22',stroke_width=2,stroke_fill='white')
   elif x>60:
    cy=(y+bottom)//2; draw.line((x-40,cy,x-3,cy),fill='#e11b22',width=6); draw.polygon([(x,cy),(x-14,cy-9),(x-14,cy+9)],fill='#e11b22'); draw.text((x-65,max(0,cy-17)),'1',font=font,fill='#e11b22',stroke_width=2,stroke_fill='white')
   else:
    draw.text((x+4,max(0,y-32)),'1',font=font,fill='#e11b22',stroke_width=2,stroke_fill='white')
  out=f'{idx:02d}_{role}.png'; source.save(d/'publish'/out)
  url=meta['url']; src='Google 검색' if role=='search' else ('KB국민은행' if job['row']!=14 else '부산은행')
  note='; 실제 방문한 모바일 결과는 오류, 이후 부산은행 메뉴에서 공식 안내 도달' if job['row']==14 and role=='search' else ''
  extra='; 검색 결과에서 실제 연 공식 페이지: https://obank.kbstar.com/quics?page=C101339' if job['row']==15 and role=='search' else ('; 검색 결과에서 실제 연 공식 페이지: https://obank.kbstar.com/quics?page=C040611' if job['row']==16 and role=='search' else '')
  md.extend([f'### 이미지 {idx}: {caption}',f'![{caption}]({out})',f'- 원본: `../raw/{name}.png` → 발행: `{out}`; 배치: 위 본문 관련 단락. 출처: {src}, 화면 URL: {url}; 확인일: {date}{note}{extra}.'])
  images.append({'role':role,'file':f'raw/{name}.png','caption':caption,'alt':caption,'sourceId':'S1','boxes':meta.get('boxes',[]) or ([[284,145,856,59]] if name=='02_login' else [[482,251,720,269]]),'query':job['key'] if role=='search' else None})
 md.append('## 출처 및 확인일')
 for sid,title,url in job['sources']:md.append(f'- [{sid}] [{title}]({url}) — {date} 확인')
 if job['row']==14:md.append('- 초기 Google 결과 방문: 모바일 부산은행 오류 페이지(CMM0001). 대체 공식 안내는 위 S1. 검색어 `"FPMFRX189002011" 부산은행 ONE환전`은 결과 없음.')
 if job['row']==15:md.append('- 관련 공식 페이지: [지점 수령 이용안내](https://obank.kbstar.com/quics?page=C102233&cc=b028364:b105107&QSL=F), [비로그인 약관 단계](https://obank.kbstar.com/quics?page=C101340).')
 if job['row']==16:md.append('- 관련 공식 페이지: [통장사본 직접 진입](https://obank.kbstar.com/quics?page=C040611), [STM 이용안내](https://obank.kbstar.com/quics?page=C058772).')
 (d/'publish'/f"은행_재테크_{job['key']}_웹조사결과.md").write_text('\n\n'.join(md)+'\n',encoding='utf-8')
 data.update(body=job['body'],sources=[dict(id=sid,title=title,url=url,official=(sid=='S1'),checkedAt=date) for sid,title,url in job['sources']],images=images,visualReviewed=False,exceptionReason='')
 (d/'research.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
 print(job['key'],len(job['body']),len(images))
