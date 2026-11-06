import json
from pathlib import Path
import sys
import hashlib

run=Path(__file__).resolve().parent
root=run.parents[2]
sys.path.insert(0,str(root))
from tools.research_pipeline import read,write,package

def source(id,title,url,related=()):
    return dict(id=id,title=title,url=url,official=True,checkedAt='2026-11-06',relatedUrls=[dict(title=t,url=u) for t,u in related])

def image(folder,name,role,sid,caption,alt,query=None,boxes=None,redactions=None):
    meta=read(folder/'evidence'/f'{name}.json')
    item=dict(role=role,file=f'raw/{name}.png',sourceId=sid,caption=caption+' 확인일: 2026-11-06. 화면 URL: '+meta['url'],alt=alt,boxes=meta.get('boxes',meta.get('targets',[])) if boxes is None else boxes)
    if query:item['query']=query
    if redactions:item['redactions']=redactions
    return item

for keyword,bodyfile in [('코레일 승차권 전달','korail-body.md'),('당근마켓 채팅 걸기','daangn-body.md')]:
    folder=root/'26_1106'/f'앱사용_{keyword}'/'웹조사'
    data=read(folder/'research.json')
    data['body']=(run/bodyfile).read_text(encoding='utf-8').strip()
    data['visualReviewed']='--reviewed' in sys.argv
    if keyword.startswith('코레일'):
        press=read(folder/'evidence/official.page.json')['url']
        data['sources']=[source('S1','코레일 공식 이용안내·승차권이용 FAQ','https://www.korail.com/ticket/reserve/guide/faq',[
            ('구매·환불 안내의 전달하기 항목','https://www.korail.com/ticket/reserve/guide/pay'),('승차권 확인 진입·로그인 경계','https://www.korail.com/ticket/myticket/list')]),source('S2','코레일 승차권 전달 확대 계획 보도자료',press)]
        data['images']=[
            image(folder,'01_search','search','S2','01. Google에서 원래 키워드로 검색한 뒤 공식 보도자료 결과를 확인했습니다. 표시한 링크는 실제 열어 확인한 결과입니다. 결과 제목: 코레일, 열차 승차권 전달 서비스 하루 5만여 명 이용. 공식 결과 URL: '+press,'Google 공식 코레일 결과 위치',query=keyword),
            image(folder,'03_transfer_rules','guide','S1','02. 공식 구매 안내에서 전달 수단과 입석·자유석 제한을 먼저 확인합니다. 앱 실행 화면이 아닌 공식 문서입니다.','전달하기 공식 조건'),
            image(folder,'04_send','guide','S1','03. 공식 FAQ에서 승차권 하단 전달하기와 수단별 완료 조건을 확인합니다. 카카오톡은 상대방 선택 후 확인까지 안내돼 있습니다.','공식 FAQ 보내는 방법'),
            image(folder,'05_receive','guide','S1','04. 공식 FAQ의 앱·SMS·카카오톡별 수신 확인 경로입니다. 실제 받은 승차권 화면은 아닙니다.','공식 FAQ 전달받은 표 확인'),
            image(folder,'06_refund','guide','S1','05. 보낸 사람이 회수한 뒤 환불하는 경로와 받은 사람의 환불 경로를 구분합니다. 실제 회수·환불은 실행하지 않았습니다.','공식 FAQ 회수와 환불'),
            image(folder,'02_login','reference','S1','06. 개인 승차권 확인은 로그인 요구 화면에서 중단했습니다. 계정과 결제 정보는 입력하지 않았습니다.','로그인 요구 조사 경계',boxes=[[229,330,627,241]])]
    else:
        data['sources']=[source('S1','당근 판매자 채팅 공식 도움말','https://www.daangn.com/wv/faqs/24',[
            ('공식 PC 채팅 로그인 안내','https://chat.daangn.com/login'),('공개 중고거래 목록 확인 경로','https://www.daangn.com/kr/search/buy-sell/')]),source('S2','당근 동네생활 채팅 공식 도움말','https://www.daangn.com/wv/faqs/2154')]
        qr=read(folder/'evidence/06_pc_login.json')['boxes'][1]
        redaction=[qr[0]-4,qr[1]-4,qr[2]+8,qr[3]+8]
        data['images']=[
            image(folder,'01_search','search','S1','01. Google 원래 키워드 검색에서 실제 연 공식 고객센터 링크를 표시했습니다. 결과 제목: 판매자와 채팅은 어떻게 하나요? 공식 결과 URL: https://www.daangn.com/wv/faqs/24','Google 당근 공식 고객센터 결과',query=keyword),
            image(folder,'03_start_chat','guide','S1','02. 공식 도움말 예시의 채팅하기 버튼입니다. 1번은 일반 게시글, 2번은 바로구매 게시글의 채팅 버튼입니다. 실제 이용자와의 대화 화면은 아닙니다.','당근 공식 채팅 시작 예시',boxes=[[245,338,259,44],[609,338,128,44]]),
            image(folder,'04_existing_chat','guide','S1','03. 공식 예시의 일반 게시글은 1번 대화중인 채팅으로 바뀝니다. 바로구매 진행 게시글은 2번 채팅하기 문구가 유지되는 예외입니다.','당근 공식 기존 대화 예시',boxes=[[245,469,259,44],[609,469,128,44]]),
            image(folder,'05_neighbor_chat','guide','S2','04. 동네생활에서는 게시글 작성자가 댓글 작성자에게 더보기 메뉴로 채팅하는 조건을 확인합니다.','동네생활 채팅 시작 권한 안내',boxes=[[158,286,769,144]]),
            image(folder,'06_pc_login','guide','S1','05. PC 채팅은 QR 인증 안내 화면까지 확인했습니다. 로그인용 QR은 가렸으며 인증·회원가입을 진행하지 않았습니다.','당근 PC 로그인 경계와 QR 가림',boxes=read(folder/'evidence/06_pc_login.json')['boxes'][:1],redactions=[redaction])]
    write(folder/'research.json',data)
    print(keyword,len(data['body']),len(data['images']))
    out=package(folder,data)
    if data['visualReviewed']:
        generated=out/f'앱사용_{keyword}_웹조사결과.md'
        content=generated.read_text(encoding='utf-8')
        for i in range(1,len(data['images'])+1):
            name=f'{i:02d}_{data["images"][i-1]["role"]}.png'
            content=content.replace(f']({name})',f'](publish/{name})')
        destination=folder/'웹조사결과.md'
        if destination.exists() and destination.read_text(encoding='utf-8')!=content:
            raise ValueError('기존 웹조사결과.md 보존: 충돌 확인 필요')
        if not destination.exists():destination.write_text(content,encoding='utf-8')
        validation=read(folder/'validation.json')
        validation['artifactHashes']['웹조사결과.md']=hashlib.sha256(destination.read_bytes()).hexdigest()
        write(folder/'validation.json',validation)
        state=read(folder/'evidence/browser.json')
        if state['status']!='finished':
            state.pop('error',None)
            state['status']='reviewed'
            write(folder/'evidence/browser.json',state)
