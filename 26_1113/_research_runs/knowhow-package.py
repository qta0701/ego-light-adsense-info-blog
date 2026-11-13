from pathlib import Path
from PIL import Image, ImageDraw
import json
root=Path(__file__).resolve().parents[2]
date='2026-11-13'
jobs={
'앱스토어 국가변경':{
 'row':34,'source':'Apple 지원, Apple 계정 국가 또는 지역 변경하기','url':'https://support.apple.com/ko-kr/118283',
 'images':[
 ('01_search','Apple 공식 검색 결과',(80,340,780,460),(100,360,350,437)),
 ('02_conditions','국가 변경 전 구독과 잔액 등 확인',(115,130,975,710),None),
 ('03_iphone','iPhone·iPad의 국가/지역 진입 단계',(115,200,970,485),(135,382,750,475)),
 ('04_payment','국가 선택 후 약관 및 결제 정보 입력',(115,270,970,430),(135,285,780,412))],
 'body':'''## 먼저 확인할 사항
App Store에서 이용하는 Apple 계정의 국가나 지역을 바꾸려면 기기 설정 또는 Apple 계정 웹사이트에서 변경할 수 있습니다. 진행 전 계정 잔액, 구독과 처리 중인 항목을 먼저 확인하세요. 새 국가에서 사용 가능한 콘텐츠와 결제 수단도 이전과 다를 수 있습니다. 아래는 2026년 11월 13일 확인한 Apple 지원 문서 기준입니다. [S1]

### 변경 전 준비
1. Apple 계정에 남은 잔액을 사용합니다. 단일 품목보다 적은 잔액이 남았다면 Apple 지원에 문의해 잔액 처리 방법을 확인할 수 있습니다.
2. 변경을 차단하는 구독은 취소하고 구독 기간이 끝날 때까지 기다립니다. 취소 버튼을 눌렀다는 사실과 이용 기간 종료는 별개입니다.
3. 멤버십, 사전 주문, 영화 대여, 시즌 패스와 처리 중인 환불이 끝날 때까지 기다립니다. 가족 공유 그룹에 속한 경우 변경하지 못할 수도 있습니다.
4. 새 국가나 지역에서 유효한 결제 수단이 필요할 수 있으므로 미리 확인합니다. 일부 콘텐츠는 새 지역에서 이용할 수 없으므로 필요한 앱과 콘텐츠를 사용할 기기에 다시 다운로드합니다. Apple One이나 iCloud+ 해지 시에는 저장 정보에 미치는 영향도 확인하세요. [S1]

### iPhone 또는 iPad에서 변경
1. **설정 → 사용자 이름**을 누릅니다.
2. **미디어 및 구입 항목**을 선택합니다. Apple 계정에 로그인해야 할 수 있습니다.
3. **국가/지역**을 누르고 원하는 국가 또는 지역을 선택합니다.
4. **계속**을 누르고 이용 약관을 살펴본 후 동의합니다.
5. 결제 방법을 고르고 새 결제 정보와 청구 주소를 입력한 다음 **완료**를 누릅니다. 실제 입력 화면은 기기와 계정 상태에 따라 달라질 수 있습니다. [S1]

### Mac과 웹에서 변경
Mac에서는 Apple Music 또는 Apple TV 앱을 열고 메뉴 막대의 **계정 → 계정 설정 → 국가/지역**으로 이동합니다. 웹에서는 account.apple.com에 로그인한 뒤 **개인 정보 → 국가/지역**을 선택하고 안내를 따릅니다. 인증이나 결제 정보 입력은 본인 계정에서 직접 진행하세요. [S1]

### 변경이 되지 않을 때
구독이 실제로 종료되었는지, 남은 잔액과 보류 중인 활동이 있는지 먼저 확인합니다. 가족 공유도 제한 요인이 될 수 있습니다. 해결되지 않으면 Apple 지원에 문의하세요. 이 조사에서는 실제 계정 변경을 실행하지 않았으며, 발행 이미지는 Apple의 공개 안내 화면을 표시한 것입니다. [S1]'''
},
'코레일 승차권 조회':{
 'row':35,'source':'코레일 승차권 확인 및 비회원 확인','url':'https://www.korail.com/ticket/reserve/nonmember/check/menu',
 'images':[
 ('01_search','코레일 공식 승차권 확인 검색 결과',(80,150,770,280),(100,165,420,236)),
 ('02_login','회원 승차권 확인을 위한 로그인 화면',(15,270,1060,690),None),
 ('06_method_clean','비회원 로그인 방식 선택',(50,170,750,485),None),
 ('07_form_clean','기존 비회원 인증 입력 화면',(55,205,1020,550),(175,326,910,475))],
 'body':'''## 회원과 비회원의 확인 경로
코레일 승차권을 확인할 때는 예매 당시 회원으로 로그인했는지, 비회원으로 예매했는지를 먼저 확인합니다. 코레일 공식 웹사이트의 **승차권 확인**은 회원에게 로그인을 요구하며, 비회원은 별도의 확인 화면에서 예매 당시 방식에 맞는 인증을 선택합니다. 아래 화면은 2026년 11월 13일 확인한 웹 화면입니다. [S1][S2]

### 회원 승차권 확인
1. 코레일 승차권예매 사이트에서 **승차권 → 승차권 확인**으로 이동합니다.
2. 로그인 화면이 나타나면 회원번호, 이메일 주소 또는 휴대폰 번호 탭 등 제공되는 방법을 선택합니다.
3. 계정 정보를 입력해 로그인하고 승차권 확인 화면으로 이동합니다. 이 조사에서는 개인 계정으로 로그인하지 않았으므로 실제 보유 승차권 목록이나 탑승 화면은 확인하지 않았습니다. [S2]

회원번호나 비밀번호가 기억나지 않으면 로그인 화면의 회원번호 찾기 또는 비밀번호 찾기를 이용할 수 있습니다. 화면에는 로그인 다섯 차례 실패 시 로그인이 제한된다는 안내도 있습니다. 계정정보를 반복해서 추측하기보다 찾기 기능을 사용하세요. [S2]

### 비회원 승차권 확인
1. 코레일의 비회원 승차권 확인 메뉴로 이동합니다.
2. **간편인증** 또는 **기존 비회원 승차권 확인** 중 예매할 때 사용한 방식에 맞는 항목을 고릅니다.
3. 간편인증으로 예매한 승차권은 간편인증으로만 조회할 수 있다는 공식 안내를 확인합니다.
4. 기존 비회원 확인 화면에서는 예약자 이름, 휴대폰 번호, 비밀번호 5자리를 입력하고 **비회원 승차권 확인**을 누릅니다. 전달받은 승차권의 비밀번호는 코레일 알림톡 또는 문자메시지를 확인하라는 안내가 있습니다. [S1][S3]

비회원 확인 화면은 간편인증으로 예매한 승차권을 조회하지 못하므로, 이 경우 이전 화면에서 간편인증을 선택해야 합니다. 본인 인증이나 실제 승차권 조회는 진행하지 않았습니다. 정보가 맞지 않거나 확인이 어려우면 코레일 대표전화 1588-7788 또는 공식 고객센터의 안내를 확인하세요. [S1][S3]

### 조회와 예매를 구분하기
이미 구매한 표를 확인하려면 **승차권 확인**을 선택합니다. 출발역·도착역을 넣어 열차를 찾는 새 승차권 예매 화면과는 목적이 다릅니다. 이용 내역이나 영수증이 필요할 때도 해당 메뉴 명칭을 확인해 이동하세요. 사이트 구성은 변경될 수 있으므로 현재 화면의 표시를 기준으로 진행합니다. [S2]'''
},
'모바일 티머니 환불':{
 'row':36,'source':'티머니, LG유플러스 USIM 교체 관련 모바일티머니(Android) FAQ','url':'https://www.tmoney.co.kr/aeb/cmnctn/notice/readNoticeView.dev?bdSeqNo=3852',
 'images':[
 ('01_search','티머니 공식 FAQ 검색 결과',(80,330,780,510),(100,350,640,442)),
 ('02_refund','Android 선불충전형 환불 신청 경로',(0,240,1010,530),(0,425,960,470)),
 ('03_postpaid','후불청구형 해지 안내',(0,265,1010,555),(0,382,725,470)),
 ('04_usim','기존 USIM 보관과 환불 조건',(0,365,900,530),(0,427,690,475))],
 'body':'''## 먼저 이용 형태를 확인하세요
모바일티머니의 환불 경로는 이용 중인 교통카드의 유형과 기기에 따라 다를 수 있습니다. 티머니가 2026년 4월 7일 게시한 안내는 **LG유플러스 USIM 교체와 관련된 Android 모바일티머니**를 대상으로 하며, iPhone 이용자에게는 해당하지 않는다고 명시합니다. 아래 단계는 그 공식 FAQ에서 안내하는 선불충전형 경로입니다. 실제 신청 전 앱에 표시되는 조건과 수수료를 확인하세요. [S1]

### Android 선불충전형 잔액 환불
1. 모바일티머니 앱을 열고 왼쪽 위 **전체메뉴(≡)**를 선택합니다.
2. **교통카드 → 환불신청**으로 이동합니다.
3. 등록된 계좌를 선택합니다. 등록된 계좌가 없다면 환불 계좌 입력 항목을 선택해 안내에 맞춰 입력합니다.
4. 화면 아래 유의사항을 읽고 확인란을 체크한 뒤 **환불하기**를 선택합니다. 신청 전 환불액과 계좌 정보를 다시 확인하세요. [S1]

이 조사는 앱 설치나 개인 계좌 입력을 하지 않았습니다. 실제 앱의 현재 표시와 환불 가능 여부, 금액, 수수료 및 입금 일정은 신청 화면이나 고객센터에서 확인해야 합니다. 공식 FAQ에 없는 수치나 편의점 환불 조건을 모바일 선불 잔액에 임의로 적용하지 않습니다. [S1]

### 후불청구형이라면
후불청구형은 충전 잔액을 돌려받는 절차와 구분합니다. 해당 FAQ는 USIM 교체 전에 **전체메뉴 → 교통카드 → 충전형 서비스 전환 → 전환신청 → 확인** 순서로 후불형 서비스를 해지하라고 안내합니다. 후불형 가입 시 최초 승인 금액은 4~5영업일 이내 자동 취소되며 카드사별 시간이 다를 수 있습니다. 해지 없이 USIM을 교체한 경우에는 티머니 고객센터 1644-0088로 문의하도록 안내합니다. [S1]

### USIM을 교체하기 전
FAQ에 따르면 해당 모바일티머니 선불 잔액은 USIM에 저장됩니다. 환불에 충전한 이전 USIM 실물이 필요하므로 교체 전에 잔액과 신청 상태를 확인하고 기존 USIM을 보관하세요. 같은 FAQ는 모바일기후동행카드·페이머니·페이교통카드는 USIM 교체 전 환불 신청이 필요하지 않다고 별도로 설명합니다. 티머니 갤럭시워치는 워치 단말기에 잔액이 충전된다고 안내합니다. 적용 범위는 해당 공식 공지에서 다시 확인하세요. [S1]

문제가 생기면 어떤 기기와 카드 유형을 사용했는지, USIM을 보유하고 있는지 정리해 고객센터에 문의하세요. 아래 이미지는 실제 앱 조작 화면이 아니라 공개된 공식 FAQ의 각 설명 부분입니다. [S1]'''
}}
for keyword,j in jobs.items():
 folder=root/'26_1113'/('노하우_'+keyword)/'웹조사'; src=[]
 sources=[{'id':'S1','title':j['source'],'url':j['url'],'official':True,'checkedAt':date}]
 if keyword=='코레일 승차권 조회':
  sources += [{'id':'S2','title':'코레일 회원 승차권 확인 로그인','url':'https://www.korail.com/ticket/myticket/list','official':True,'checkedAt':date},{'id':'S3','title':'코레일 기존 비회원 승차권 확인','url':'https://www.korail.com/ticket/reserve/nonmember/check','official':True,'checkedAt':date}]
 records=[]
 for idx,(name,caption,crop,manualbox) in enumerate(j['images'],1):
  metadata=json.loads((folder/'evidence'/f'{name}.json').read_text(encoding='utf-8'))
  x,y,w,h=metadata['boxes'][0]; box=manualbox or (x,y,x+w,y+h)
  cx,cy,ex,ey=crop
  with Image.open(folder/'raw'/f'{name}.png') as im:
   im=im.convert('RGB').crop(crop)
   canvas=Image.new('RGB',(im.width+40,im.height+40),'white');canvas.paste(im,(20,20));draw=ImageDraw.Draw(canvas)
   bx1,by1,bx2,by2=box;pad=7
   draw.rectangle((max(2,bx1-cx+20-pad),max(2,by1-cy+20-pad),min(canvas.width-3,bx2-cx+20+pad),min(canvas.height-3,by2-cy+20+pad)),outline='#ed1b24',width=4)
   out=f'{idx:02d}_{name}.png';canvas.save(folder/'publish'/out)
  sourceid= ('S2' if idx in (1,2) else 'S3' if idx==4 else 'S1') if keyword=='코레일 승차권 조회' else 'S1'
  records.append({'role':'search' if idx==1 else 'guide','file':f'raw/{name}.png','publish':f'publish/{out}','sourceId':sourceid,'caption':caption,'alt':caption,'boxes':metadata['boxes'],'crop':list(crop),'markedBox':list(box),'screenUrl':metadata['url'],**({'query':keyword} if idx==1 else {})})
 data={'keyword':keyword,'originalQuery':keyword,'row':j['row'],'tab':'노하우','date':date,'queries':[keyword],'multiIntent':False,'body':j['body'],'sources':sources,'images':records,'limits':{'bodyMin':3500,'bodyMax':5500,'guideMax':8,'referenceMax':3,'rawMax':12},'exceptionReason':'공식 검색 1장과 서로 다른 안내·조건 화면 3장으로 핵심 내용을 설명. 앱이나 인증 후 화면은 공개 공식 안내 또는 인증 전 화면으로 대체.','visualReviewed':False}
 (folder/'research.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
 lines=[f'# 노하우 {keyword} 웹조사',f'확인일: {date} (한국시간)',f'검색어: {keyword}','',j['body'],'','## 출처']
 for s in sources:lines.append(f"- [{s['id']}] {s['title']} — {s['url']} (확인일 {date})")
 lines+=['','## 이미지 배치 및 출처']
 for n,r in enumerate(records,1):
  source_name='Google 검색 결과' if n==1 else next(s['title'] for s in sources if s['id']==r['sourceId'])
  lines.append(f"{n}. **{r['caption']}** — 원본 `{r['file']}`, 발행 `{r['publish']}`. 출처: {source_name}; 실제 화면 URL: {r['screenUrl']}; 확인일: {date}. 빨간 테두리는 설명 대상.")
 lines+=['','## 조사 및 이미지 한계','실제 개인 계정 로그인, 인증 후 승차권 확인 또는 휴대전화 앱 조작은 수행하지 않았다. 발행 이미지는 실제 Google 검색과 공개 공식 페이지의 캡처를 잘라 표식한 것이다. 화면과 절차는 변경될 수 있다.']
 (folder/'publish'/f'노하우_{keyword}_웹조사결과.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
 print(keyword,'body',len(j['body']),'images',len(records))
