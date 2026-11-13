from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, hashlib

root=Path(__file__).resolve().parents[2]
date='2026-11-13'
font=ImageFont.truetype('C:/Windows/Fonts/malgun.ttf',24)
small=ImageFont.truetype('C:/Windows/Fonts/malgun.ttf',18)
jobs={
'진학어플라이 회원가입': {
'body':'''## 바로 알아보기
진학어플라이의 대입 공통원서 회원가입 화면에서는 진학어플라이 단일회원과 진학어플라이·유웨이어플라이를 함께 이용하는 통합회원 중 선택할 수 있습니다. 통합회원은 두 대행사에 동시 가입하는 방식입니다. 원서접수 전에 지원할 대학의 접수처와 모집요강을 확인하고 지원자 본인의 정보를 사용하세요. 아래 절차는 2026년 11월 13일 확인한 공개 화면과 초보자 가이드 기준입니다. [S1][S2]

## 가입 순서
1. Google에서 공식 진학어플라이 회원가입 결과를 열고 주소가 진학어플라이 도메인인지 확인합니다. 공통원서 회원가입 화면에서 이용할 회원 유형을 고릅니다. 단일회원은 해당 사이트만 이용할 수 있고, 통합회원은 두 사이트를 함께 이용할 수 있습니다. 지원 대학이 어느 대행사에서 접수하는지 미리 확인하면 선택에 도움이 됩니다. [S1]
2. 통합회원을 고를 때 공식 가이드는 이용약관과 개인정보 수집·이용 동의 화면을 안내합니다. 실제 화면의 필수 항목과 선택 항목을 각각 읽고 필요한 동의를 진행한 뒤 다음 단계로 이동하세요. 안내 그림은 공식 초보자 가이드의 예시로, 실제 화면 구성은 달라질 수 있습니다. [S2]
3. 가이드에는 아이디 중복 확인, 비밀번호, 이름·생년월일·성별, 연락처와 이메일, 자동가입방지 문구 입력 후 가입하기를 누르는 과정이 나옵니다. 휴대폰이 없는 경우의 별도 예시도 제공됩니다. 비밀번호 등 입력 조건은 실제 가입 화면에 표시되는 최신 기준을 우선하세요. [S2]
4. 가입 완료 후 로그인해 본인 정보와 공통원서 작성 메뉴를 확인합니다. 회원가입만으로 대학 원서 제출이 끝나는 것은 아닙니다. 대학 선택, 원서 작성, 결제와 접수 확인은 모집요강과 사이트 안내에 따라 별도로 진행해야 합니다. [S2]

## 준비와 확인할 점
공식 가입 화면은 원서작성을 Windows 기반에서 제공하며 모바일 환경에서 원서작성은 할 수 없다고 안내합니다. Chrome 또는 Edge를 권장하므로 실제 접수 전 PC 환경을 준비하세요. 휴대폰 번호는 아이디·비밀번호 찾기와 대학 SMS 수신 등에 사용될 수 있어 본인이 확인할 수 있는 연락처를 입력하는 것이 좋습니다. [S1][S2]

이미 단일회원으로 가입했더라도 공식 가이드에 통합회원 전환 안내가 있습니다. 새 계정을 무작정 만들기 전에 기존 계정과 전환 가능 여부를 확인하세요. 가입이 막히면 화면의 안내를 확인하고 진학어플라이 고객센터 1544-7715로 문의할 수 있습니다. 실제 개인정보 입력, 인증 및 가입 제출은 진행하지 않았습니다. [S1][S2]''',
'sources':[('S1','진학어플라이 공통원서 회원가입','https://applymem.jinhakapply.com/'),('S2','진학어플라이 통합회원 가입 초보자 가이드','https://apply.jinhakapply.com/Customer/Guide/Join/1')],
'images':[('01_search','검색 결과에서 실제로 연 공식 가입 페이지','S1',None),('02_guide_choice','공식 예시: 통합회원과 단일회원 선택','S2',[[735,305,175,165]]),('03_guide_agree','공식 예시: 동의 항목과 동의 버튼','S2',[[897,335,50,368],[812,711,150,51]]),('04_guide_form','공식 예시: 회원정보 입력과 가입 버튼','S2',[[696,343,253,337],[681,681,285,55]])],
'note':'공식 예시 이미지의 화면은 현재 가입 양식과 다를 수 있어 예시로 명시. 회원가입 제출 및 인증은 수행하지 않음. 실제 가입 화면의 요소 선택이 모호하여 캡처 실패 후 공식 가이드 화면으로 보완.'},
'인스타그램 탈퇴방법': {
'body':'''## 바로 알아보기
Instagram 프로필을 영구 삭제하려면 로그인 후 계정 센터의 삭제 메뉴로 이동해 삭제할 계정을 선택하고 확인합니다. 잠시 쉬고 싶다면 삭제 대신 일시 비활성화를 선택할 수 있습니다. 삭제하면 프로필과 사진, 동영상, 댓글, 좋아요, 팔로워가 영구 삭제되므로 먼저 필요한 정보를 내보내세요. 아래는 2026년 11월 13일 확인한 Instagram 공식 고객센터의 컴퓨터 화면 안내입니다. 계정에 따라 메뉴가 다르게 나타날 수 있습니다. [S1]

## 삭제 전 준비
삭제할 계정이 맞는지 사용자 이름을 확인하고, 보관할 사진과 게시물이 있다면 로그인하여 정보 사본을 내보냅니다. 공식 안내는 삭제 후 정보 내보내기 도구에 접근할 수 없다고 설명합니다. 여러 프로필을 관리한다면 실제 선택 단계에서 계정을 다시 확인하세요. 일시 중단이 목적이라면 프로필 일시 비활성화 안내를 먼저 살펴볼 수 있습니다. [S1]

## 계정 센터의 두 가지 표시 방식
공식 도움말은 계정 센터 하단의 표시가 무엇인지에 따라 두 경로를 안내합니다. 화면이 업데이트 중일 수 있으므로 보이는 메뉴에 맞는 경로를 따르세요. [S1]

**‘계정 관리’가 보이는 경우**: 왼쪽 아래 더 보기 → 설정 → 계정 센터 → 프로필 및 개인정보로 이동합니다. 삭제할 계정 유형 옆 관리 → 비활성화 또는 삭제를 선택하고, 삭제할 계정 → 계정 삭제 → 계속 순으로 확인합니다. [S1]

**‘계정’이 보이는 경우**: 더 보기 → 설정 → 계정 센터 → 개인정보 → 계정 소유권 및 관리 → 비활성화 또는 삭제로 이동합니다. 삭제할 계정이나 프로필을 선택한 후 계정 삭제와 계속을 누르고 화면 안내에 따라 확인합니다. [S1]

## 삭제 후 기간과 로그인 문제
공식 문서에 따르면 삭제 요청 후 30일이 지나면 프로필과 정보가 영구 삭제되며 정보를 가져올 수 없습니다. 삭제 취소 가능 기간은 지역별로 다를 수 있고, 삭제 과정의 완료에는 최대 90일이 걸릴 수 있습니다. 따라서 실제 요청 화면에 표시되는 기한과 안내를 확인하세요. [S1]

삭제 요청을 위해서는 본인이 계정에 로그인할 수 있어야 합니다. 로그인할 수 없다면 먼저 공식 고객센터의 로그인·계정 복구 절차를 이용하세요. 이 조사는 공개 도움말을 확인한 것으로 사용자의 계정에 로그인하거나 삭제를 요청하지 않았습니다. 이미지의 메뉴 목록은 실제 계정의 설정 화면이 아니라 공식 도움말의 절차 설명입니다. [S1]''',
'sources':[('S1','Instagram 고객센터: 프로필 삭제 또는 비활성화','https://help.instagram.com/370452623149242/?helpref=hc_fnav&locale=ko_KR')],
'images':[('01_search','검색 결과에서 실제로 연 Instagram 공식 고객센터','S1',None),('02_export','삭제 전 정보 사본 내보내기 안내','S1',None),('03_manage','계정 관리가 표시되는 경우의 공식 절차','S1',None),('04_account','계정이 표시되는 경우의 공식 절차','S1',None),('05_wait','삭제 요청 이후 기간과 지역별 차이','S1',None)],
'note':'로그인 뒤 설정 화면에는 접근하지 않고 공식 고객센터의 두 경로와 삭제 전후 조건을 서로 다른 발췌로 사용. 초기 선택자 오류는 main 요소 부재로 수정 후 캡처 성공.'},
'배민클럽 환불': {
'body':'''## 바로 알아보기
2026년 10월 1일 시행된 배민클럽 이용약관 제11조에 따르면, 결제일의 다음 날부터 7일 이내이고 배민클럽 혜택을 전혀 사용하지 않은 회원이 청약철회 또는 해지를 요청해 그 의사가 회사에 도달하면 계약이 종료되고 전액 환불됩니다. 두 조건을 충족하지 않는 일반 이용권은 정기결제가 해지되고 이미 결제한 이용기간이 끝난 직후 계약이 종료됩니다. 장기 구독상품과 프로모션은 별도 조건이 있으므로 아래 내용을 함께 확인하세요. [S1]

## 앱에서 확인하고 신청하기
1. 배달의민족 앱에서 마이배민과 마이배민클럽으로 들어가 현재 이용권, 결제일, 혜택 사용 여부를 확인합니다. 앱 메뉴 경로는 2026년 10월 확인된 외부 안내에 따른 것이며 화면 이름과 순서는 앱 버전에 따라 달라질 수 있습니다. [S2]
2. 마이배민클럽 화면 아래의 해지하기를 찾아 안내와 해지 사유를 확인한 뒤 마지막 해지 또는 해지 예약 화면까지 진행합니다. 단순히 버튼을 한 번 눌렀다는 사실만으로 완료라고 판단하지 말고, 최종 안내와 이용 종료일·환불 표시를 확인하세요. [S2]
3. 환불을 원한다면 마지막 결제일, 혜택 사용 내역, 이용권 종류를 확인하고 앱에 표시되는 금액과 처리 결과를 살펴보세요. 약관상 요건을 충족하는지 또는 제휴·프로모션 조건이 다른지 불분명하면 앱 고객센터에 문의하세요. 공개 약관을 확인했으며 실제 사용자의 결제·해지 화면에는 접근하지 않았습니다. [S1]

## 전액 환불과 해지의 차이
약관의 전액 환불 요건은 **결제일의 익일부터 7일 이내**와 **혜택 미사용**을 모두 만족하는 것입니다. 요청 의사가 회사에 도달해야 한다는 문구도 확인하세요. 요건에 들지 않는 일반 이용권의 경우에는 다음 정기결제가 중단되고, 마지막으로 결제한 기간까지는 이용할 수 있습니다. 약관은 이 경우 현재 이용기간 종료일 전일까지 해지 취소도 허용합니다. [S1]

## 예외와 유의사항
장기 구독상품에서 전액 환불 요건을 충족하지 못해 해지하는 경우 약관은 실제 결제금액을 기준으로 이미 이용한 일수의 일할 이용료와 정상가의 10%를 공제해 환불하는 별도 규정을 둡니다. 프로모션 등 비정기 혜택에 대한 철회·해지·환불은 앱 화면 등에 안내된 조건을 따릅니다. 본인의 상품이 어느 범주인지 먼저 확인하세요. [S1]

오래된 설명의 일할 환불을 모든 월간 구독에 적용하지 마세요. 약관은 변경될 수 있으므로 신청 시점의 적용 약관과 앱 표시를 다시 확인하는 것이 좋습니다. 마이배민클럽 메뉴가 보이지 않거나 처리 결과가 불명확하면 배달의민족 고객센터 1600-0987에 결제일과 이용권 정보를 알려 확인할 수 있습니다. [S1][S2]''',
'sources':[('S1','배달의민족 배민클럽 이용약관, 2026-10-01 시행','https://terms.baemin.com/content/BAEMINCLUB_658'),('S2','KOOLTIP 배민클럽 해지 안내, 2026-10-22 확인','https://kooltip.com/baemin-club-cancel/')],
'images':[('05_search','Google에서 실제 방문한 배달의민족 공식 홈페이지','HOME',None),('06_entry','외부 안내의 앱 해지 경로: 실제 앱 화면 아님','S2',[[97,360,752,275]]),('01_refund','공식 약관 제11조: 전액 환불 요건','S1',None),('03_long','공식 약관 제11조: 장기 구독상품 예외','S1',None)],
'note':'공식 약관 URL은 Google의 정확 URL 및 도메인 검색에서 결과가 없어 직접 방문. 공식 홈페이지 검색 결과는 환불 약관 자체가 아님을 명시. 앱 진입 단계는 실제 계정 조작 없이 외부 안내를 보조 출처로 기재. 외부 안내 첫 캡처는 페이지 변경으로 실패했으나 안정화 후 재시도하여 성공했고 광고를 제외해 잘랐다. 미채택 원본 02_cancel·04_promo·07_confirm은 다른 발행 장면과 중복되어 보존만 함. 약관 장면은 내용이 일부 겹치지만 각각 전액 환불과 장기상품 예외를 표식했다.'}
}

for key,j in jobs.items():
 d=root/'26_1113'/f'노하우2_{key}'/'웹조사'; out=d/'publish'; out.mkdir(exist_ok=True)
 sources={sid:(title,url) for sid,title,url in j['sources']}; sources['HOME']=('배달의민족 공식 홈페이지','https://www.baemin.com/')
 md=[f'# {key} 웹조사',f'확인일: {date} | 노하우2 {34+list(jobs).index(key)}행',j['body'],'## 이미지 배치와 출처']
 manifest=[]
 for n,(name,desc,sid,override) in enumerate(j['images'],1):
  raw=d/'raw'/f'{name}.png'; meta=json.loads((d/'evidence'/f'{name}.json').read_text(encoding='utf-8'))
  im=Image.open(raw).convert('RGB'); draw=ImageDraw.Draw(im); boxes=override or meta['boxes']
  if name in ('01_search','05_search'):
   draw.rectangle((im.width-100,0,im.width-1,70),fill='white')
  for x,y,w,h in boxes:
   assert x>=0 and y>=0 and x+w<=im.width and y+h<=im.height
   pad=6; x=max(4,x-pad);y=max(4,y-pad);r=min(im.width-4,x+w+2*pad);b=min(im.height-4,y+h+2*pad)
   draw.rectangle((x,y,r,b),outline='#e00016',width=5)
   nx=max(2,x-34);ny=max(2,y-1);draw.ellipse((nx,ny,nx+30,ny+30),fill='#e00016');draw.text((nx+9,ny+1),'1',font=small,fill='white')
   if y>=35:
    ax=min(r-12,x+max(40,(r-x)//2)); draw.line((ax,y-28,ax,y),fill='#e00016',width=5);draw.polygon([(ax,y),(ax-8,y-12),(ax+8,y-12)],fill='#e00016')
  if name=='06_entry': im=im.crop((30,60,890,735))
  canvas=Image.new('RGB',(im.width,im.height+55),'white');canvas.paste(im,(0,0));ImageDraw.Draw(canvas).text((16,im.height+11),f'{n:02d} | {desc}',font=font,fill='#172235')
  dest=out/f'{n:02d}_{name}.png';canvas.save(dest)
  title,url=sources[sid]; search=meta['url'] if name in ('01_search','05_search') else None
  md.extend([f'### {n}. {desc}',f'![{desc}]({dest.name})',f'- 원본: `raw/{name}.png` → 발행: `{dest.name}`',f'- 출처: [{title}]({url}) · 확인일 {date}',f'- 화면 URL: {meta["url"]}'+(f' · 실제 방문한 공식 결과: {url}' if search else '')])
  manifest.append({'raw':f'raw/{name}.png','publish':f'publish/{dest.name}','description':desc,'source':title,'url':meta['url'],'officialResult':url if search else None,'boxes':boxes})
 if key=='배민클럽 환불':
  for old in ['02_01_refund.png','03_02_cancel.png','05_04_promo.png']:
   (out/old).unlink(missing_ok=True)
 md+=['## 출처 및 확인일']+[f'- [{sid} {title}]({url}) — {date}' for sid,title,url in j['sources']]
 md+=['## 조사·검수 메모',j['note']]
 (out/f'노하우2_{key}_웹조사결과.md').write_text('\n\n'.join(md)+'\n',encoding='utf-8')
 research=json.loads((d/'research.json').read_text(encoding='utf-8'));research.update(body=j['body'],sources=[{'id':sid,'title':title,'url':url,'official':sid=='S1' or (key=='진학어플라이 회원가입' and sid=='S2'),'checkedAt':date} for sid,title,url in j['sources']],images=[{'role':'search' if m['officialResult'] else 'guide','file':m['raw'],'sourceId':('S1' if m['source']=='배달의민족 공식 홈페이지' else next((s for s,t,u in j['sources'] if t==m['source']),'S1')),'caption':m['description'],'alt':m['description'],'boxes':m['boxes'],'actualScreenUrl':m['url'],**({'actualOpenedResultUrl':m['officialResult'],'query':'배달의민족 공식 홈페이지 배민클럽' if key=='배민클럽 환불' else key} if m['officialResult'] else {})} for m in manifest],exceptionReason=j['note'],visualReviewed=False);(d/'research.json').write_text(json.dumps(research,ensure_ascii=False,indent=2),encoding='utf-8')
 if key=='배민클럽 환불':
  research['queries']=[key,'배달의민족 공식 홈페이지 배민클럽'];(d/'research.json').write_text(json.dumps(research,ensure_ascii=False,indent=2),encoding='utf-8')
 print(key, len(manifest),len(j['body']))
