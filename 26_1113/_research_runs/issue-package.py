from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, hashlib
root=Path(__file__).resolve().parents[2]
date='2026-11-13'
jobs={
'앱스토어 로그아웃':{
 'files':['01_search','02_iphone','03_signout','04_mac'],
 'captions':['Apple 공식 검색 결과','iPhone 또는 iPad에서 미디어 및 구입 항목 선택','로그아웃과 확인 단계','Mac의 스토어 메뉴 경로'],
 'urls':['https://www.google.com/search?q=site%3Asupport.apple.com%2Fko-kr%20App%20Store%20%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83%20%EB%AF%B8%EB%94%94%EC%96%B4%20%EB%B0%8F%20%EA%B5%AC%EC%9E%85%20%ED%95%AD%EB%AA%A9','https://support.apple.com/ko-kr/108911','https://support.apple.com/ko-kr/108911','https://support.apple.com/ko-kr/108911'],
 'body':'''## 핵심 안내
iPhone이나 iPad에서 App Store에 사용하는 계정을 바꾸려면 설정 앱의 **[사용자 이름] → 미디어 및 구입 항목 → 로그아웃 → 확인** 순서로 진행합니다. Apple은 가족 공유 콘텐츠를 찾을 수 없을 때 이 경로를 공식 안내합니다. 같은 메뉴를 다시 탭한 다음 다른 계정으로 로그인할 수 있습니다. 화면 이름과 배치는 운영체제 버전에 따라 달라질 수 있습니다. [S1]

### iPhone·iPad에서 진행하기
1. 설정 앱을 열고 맨 위 사용자 이름을 탭합니다.
2. **미디어 및 구입 항목**을 선택합니다.
3. **로그아웃**을 탭하고 확인합니다.
4. 다른 계정이 필요하면 같은 메뉴를 다시 열고 표시되는 계정 변경 안내를 따라 로그인합니다. Apple의 가족 공유 설명에는 '[사용자 이름]님이 아닙니까?'를 선택하는 단계가 나옵니다. [S1]

이 경로는 미디어 및 구입 항목에 관한 로그아웃입니다. Apple은 이 안내에서 iCloud나 iMessage 등 다른 Apple 계정 서비스에서 로그아웃할 필요는 없다고 설명합니다. 따라서 설정 맨 아래의 기기 전체 Apple 계정 로그아웃 버튼과 혼동하지 않도록 현재 메뉴 이름을 확인하세요. 로그인 전에는 어떤 계정으로 구입했는지 확인해 두면 재다운로드나 공유 확인에 도움이 됩니다. [S1]

### Mac이라면
Mac에서는 App Store를 열고 화면 상단 메뉴 막대의 **스토어 → 로그아웃**을 선택합니다. 다시 로그인할 때도 스토어 메뉴를 사용합니다. iPhone의 설정 경로와 Mac의 메뉴 경로는 다릅니다. [S1]

### 확인할 점
가족 공유 문제로 계정을 바꾸는 경우, 가족 공유와 미디어 및 구입 항목에 사용한 계정 및 구입 항목 공유 설정을 확인하세요. 공유 가능한 콘텐츠의 종류와 가려진 구입 항목도 영향을 줄 수 있습니다. 계정 암호나 인증을 묻는 화면은 본인 기기에서 직접 진행합니다. 실제 iPhone 앱 화면은 이 조사 환경에서 열지 못해 아래 이미지는 Apple 공식 문서의 안내 부분을 발췌한 것입니다. [S1]''',
 'source':'Apple 지원, 가족의 공유 앱 및 콘텐츠를 찾을 수 없는 경우', 'official':'https://support.apple.com/ko-kr/108911'},
'코레일 민원접수':{
 'files':['01_search','02_voc','03_station','05_auth_button'],
 'captions':['한국철도 공식 검색 결과','고객의 소리 신청 및 조회 진입','역 방문과 서면 접수 안내','비회원 휴대전화 본인인증 진입'],
 'urls':['https://www.google.com/search?q=%EC%BD%94%EB%A0%88%EC%9D%BC%20%EB%AF%BC%EC%9B%90%EC%A0%91%EC%88%98','https://info.korail.com/info/contents.do?key=818','https://info.korail.com/info/contents.do?key=818','https://info.korail.com/mbs/www/jsp/voc/fe/login/NR_loginForm.do'],
 'body':'''## 어디에서 접수하나요?
한국철도공사 관련 의견이나 불편은 공식 홈페이지의 **고객참여 → 고객의소리 → 고객의소리 안내 및 신청**에서 시작합니다. 안내 페이지의 **고객의 소리(VOC) 바로가기**를 누르면 신청과 처리 결과 확인을 위한 로그인 화면으로 이동합니다. 회원 로그인 또는 비회원 휴대전화 본인인증이 필요합니다. [S1]

### 온라인 신청 순서
1. 한국철도공사 고객의소리 안내 및 신청 페이지를 엽니다.
2. **고객의 소리(VOC) 바로가기**를 선택합니다.
3. 회원은 로그인 방법을 선택해 로그인하고, 비회원은 **휴대폰 본인인증**으로 본인 확인을 진행합니다. 인증을 진행할 수 없으면 안내된 고객센터 1588-7788로 문의합니다. [S2]
4. 인증 후 서비스 화면의 안내에 따라 의견을 작성하고 접수합니다. 처리 결과도 고객의 소리 홈페이지에서 확인할 수 있습니다. 이 조사에서는 본인 인증 이전까지만 확인했으므로 인증 이후 필드 이름이나 처리 기간을 단정하지 않습니다. [S1][S2]

내용을 작성할 때 이용 날짜, 열차나 역, 발생 상황, 원하는 답변을 사실에 맞게 정리하면 담당자가 상황을 파악하는 데 도움이 됩니다. 주민등록번호 등 불필요한 민감정보는 본문에 넣지 않도록 주의하세요. 실제 접수는 하지 않았습니다.

### 역 방문·우편·팩스
가까운 역에서 개인정보 제공 동의서와 접점 VOC 신청서를 작성하면 고객의 소리로 등록할 수 있으며 회신은 문자, 이메일 또는 우편으로 받을 수 있습니다. 서면을 우편이나 팩스로 보내는 방법도 안내합니다. 별도 회신 방법을 요청하지 않으면 우편으로 결과가 회신됩니다. 안내 페이지에는 우편 주소가 대전광역시 동구 중앙로 240, 한국철도공사 여객사업본부 여객서비스처(우 34618), 서면민원 팩스가 02-361-8208로 기재돼 있습니다. 방문이나 발송 전 현재 안내를 다시 확인하세요. [S1]

한국철도공사 및 계열사의 소관이 아닌 민원은 해당 기관의 민원 사이트나 국민신문고를 이용하도록 안내합니다. 승차권 이용 긴급 문의나 인증 불가 상황은 공식 안내의 고객센터를 확인하세요. [S1][S2]''',
 'source':'한국철도공사 고객의소리 안내 및 신청','official':'https://info.korail.com/info/contents.do?key=818'},
'테무 회원탈퇴':{
 'files':['01_search','02_app','03_web','04_term'],
 'captions':['Temu 공식 도움말 검색 결과','앱에서 설정과 계정 보안으로 이동','웹에서 계정 보안으로 이동','삭제 처리와 취소 기한 안내'],
 'urls':['https://www.google.com/search?q=%ED%85%8C%EB%AC%B4%20%ED%9A%8C%EC%9B%90%ED%83%88%ED%87%B4','https://www.temu.com/kr/support/c3/support-f-54-s-124.html','https://www.temu.com/kr/support/c3/support-f-54-s-124.html','https://www.temu.com/kr/support/c3/support-f-54-s-124.html'],
 'body':'''## Temu 계정 삭제 경로
Temu 공식 고객센터에 따르면 계정 삭제는 앱 또는 Temu.com에서 로그인한 다음 계정 보안 메뉴를 통해 요청할 수 있습니다. 앱과 웹의 첫 진입 위치가 다르므로 사용하는 환경에 맞게 선택하세요. 아래는 2026년 11월 13일 확인한 공식 안내이며, 서비스 화면과 메뉴 이름은 변경될 수 있습니다. [S1]

### 앱에서 진행하기
1. Temu 앱에서 계정에 로그인합니다.
2. 화면 하단의 사용자 아바타를 선택합니다.
3. **설정 → 계정 보안**으로 이동합니다.
4. 메뉴 하단의 **Temu 계정 삭제**를 선택하고 이어지는 안내를 확인합니다. [S1]

### 웹사이트에서 진행하기
1. Temu.com에서 계정에 로그인합니다.
2. 화면 오른쪽 위 사용자 아바타를 선택합니다.
3. **계정 보안**을 열고 화면 하단의 **Temu 계정 삭제**를 선택합니다. [S1]

### 삭제 요청 후와 취소
공식 안내는 영구 삭제를 요청하면 자동 로그아웃되며, 계정이 **7영업일 이내** 영구 삭제된다고 설명합니다. 기한 전에 계정을 유지하고 싶다면 다시 로그인해 삭제 절차를 취소할 수 있습니다. 삭제 요청과 완료는 같은 순간이 아니므로 처리 상태와 현재 화면의 안내를 확인하세요. [S1]

삭제 전에는 진행 중인 주문, 반품이나 환불, 필요한 거래 기록이 있는지 확인하고, 계정에 연결된 로그인 수단을 기억해 두는 것이 좋습니다. 이 항목은 준비를 돕는 일반적인 확인 사항이며 공식 문서가 별도 처리 결과를 보장한다는 뜻은 아닙니다. 신청을 실제로 실행하지 않았고 로그인 후 삭제 확인 화면도 열지 않았습니다. 아래의 단계 이미지는 실제 계정 화면이 아니라 공개된 공식 도움말의 해당 문장을 표시한 것입니다. [S1]''',
 'source':'Temu 고객센터, 내 Temu 계정을 영구적으로 삭제할 수 있나요?', 'official':'https://www.temu.com/kr/support/c3/support-f-54-s-124.html'}
}
font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',23)
for keyword,j in jobs.items():
    d=root/'26_1113'/('이슈_'+keyword)/'웹조사'; out=d/'publish'; out.mkdir(exist_ok=True)
    lines=[]; hashes={}
    for i,(name,caption,url) in enumerate(zip(j['files'],j['captions'],j['urls']),1):
        meta=json.loads((d/'evidence'/f'{name}.json').read_text(encoding='utf-8')); x,y,w,h=meta['boxes'][0]; im=Image.open(d/'raw'/f'{name}.png').convert('RGB')
        if i==1:
            # Google source URL is above the title; retain the actual result title and snippet only.
            left=max(0,int(x)-25); top=int(y+20); right=min(im.width,int(x+max(w,700))); bottom=min(im.height,int(y+h+75)); box=(int(x-left)-5,8,int(x+w-left)+5,42)
        else:
            left=max(0,min(int(x)-45,im.width-900)); top=max(0,int(y)-75); right=min(im.width,left+900); bottom=min(im.height,int(y+h+90)); box=(int(x-left)-5,int(y-top)-5,int(x+w-left)+5,int(y+h-top)+5)
            if keyword=='테무 회원탈퇴':
                left,right=280,980
                top,bottom={'02_app':(220,310),'03_web':(244,330),'04_term':(175,320)}[name]
                box=(int(x-left)-5,int(y-top)+1,int(x+w-left)+5,int(y+h-top)+1)
            if keyword=='코레일 민원접수' and name in ('02_voc','03_station'):
                left,right=160,980; top=int(y)-60; bottom=int(y+h)+(15 if name=='02_voc' else 25)
                box=(int(x-left)-5,int(y-top)-5,int(x+w-left)+5,int(y+h-top)+5)
        crop=im.crop((left,top,right,bottom)); canvas=Image.new('RGB',(crop.width+55,crop.height),'white'); canvas.paste(crop,(55,0)); draw=ImageDraw.Draw(canvas)
        if i==1: draw.rectangle((55,0,canvas.width,7),fill='white')
        bx=(box[0]+55,max(1,box[1]),min(canvas.width-2,box[2]+55),min(canvas.height-2,box[3])); draw.rectangle(bx,outline='#e00000',width=4)
        cy=max(18,min(canvas.height-18,(bx[1]+bx[3])//2)); draw.ellipse((5,cy-16,37,cy+16),fill='#d90000'); draw.text((14,cy-14),str(i),font=font,fill='white')
        dest=f'{i:02d}_{"search" if i==1 else "guide"}.png'; canvas.save(out/dest)
        hashes[dest]=hashlib.sha256((out/dest).read_bytes()).hexdigest()
        lines.append(f'| {i} | {name}.png | {dest} | {caption} | {"Google 검색 / " if i==1 else ""}{j["source"]} | {url} | {date} |')
    related='\n- [S2] 한국철도공사 VOC 로그인: https://info.korail.com/mbs/www/jsp/voc/fe/login/NR_loginForm.do (2026-11-13 확인)' if keyword=='코레일 민원접수' else ''
    md=f'# {keyword} 웹조사\n\n확인일: {date} (한국 시간)\n\n{j["body"]}\n\n## 출처\n\n- [S1] {j["source"]}: {j["official"]} (2026-11-13 확인){related}\n\n## 이미지 배치 및 원본 명세\n\n검색 화면은 실제로 연 공식 결과를 표시합니다. 공식 도움말 문서 발췌는 실제 앱 조작 화면이 아닙니다. 원본은 `../raw/`, 캡처 좌표는 `../evidence/`에 보관했습니다.\n\n| 순서 | 원본 파일 | 발행 파일 | 삽입 위치·설명 | 출처 | 실제 화면 URL | 확인일 |\n|---|---|---|---|---|---|---|\n'+ '\n'.join(lines)+f'\n\n검색 결과에서 실제 연 공식 URL: {j["official"]}\n'
    md+='\n## 이미지 미리보기\n\n'+'\n\n'.join(f'![{caption}]({i:02d}_{"search" if i==1 else "guide"}.png)' for i,caption in enumerate(j['captions'],1))+'\n'
    mdpath=out/f'이슈_{keyword}_웹조사결과.md';mdpath.write_text(md,encoding='utf-8');hashes[mdpath.name]=hashlib.sha256(mdpath.read_bytes()).hexdigest()
    (d/'evidence'/'packaging.json').write_text(json.dumps({'images':j['files'],'publishHashes':hashes,'notes':'공식 페이지 본문 캡처를 발췌하고 빨간 테두리와 번호를 추가. 검색 결과의 URL과 계정 아이콘은 자르기로 제거. 원본 보존.'},ensure_ascii=False,indent=2),encoding='utf-8')
    research=json.loads((d/'research.json').read_text(encoding='utf-8'))
    query='site:support.apple.com/ko-kr App Store 로그아웃 미디어 및 구입 항목' if keyword=='앱스토어 로그아웃' else keyword
    research.update({'queries':[query],'originalQuery':keyword,'body':j['body'],'sources':[{'id':'S1','title':j['source'],'url':j['official'],'official':True,'checkedAt':date,'relatedUrls':(['https://info.korail.com/mbs/www/jsp/voc/fe/login/NR_loginForm.do'] if keyword=='코레일 민원접수' else [])}], 'images':[], 'exceptionReason':'공식 안내의 핵심 경로와 조건에 집중하여 본문과 안내 이미지 수를 조정. 실제 기기 및 인증 후 화면은 접근하지 않음.', 'visualReviewed':False})
    for i,(name,caption) in enumerate(zip(j['files'],j['captions'])):
        meta=json.loads((d/'evidence'/f'{name}.json').read_text(encoding='utf-8'))
        item={'role':'search' if i==0 else 'guide','file':f'raw/{name}.png','sourceId':'S1','caption':caption,'alt':caption,'boxes':meta['boxes']}
        if i==0:item['query']=query
        research['images'].append(item)
    (d/'research.json').write_text(json.dumps(research,ensure_ascii=False,indent=2),encoding='utf-8')
