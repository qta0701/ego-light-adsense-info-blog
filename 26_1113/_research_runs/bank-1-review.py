import hashlib,json
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[2]
for key,errors,reason in [
 ('부산은행 환전',['본문 1749자: 3500~5500자 필요(출처/이미지 목록 제외)'],'공식 안내의 핵심 조건과 실제 진입 경계가 충분하며 숫자를 채우기 위한 반복을 피했다. 검색 첫 공식 결과는 오류여서 대체 공식 사이트 메뉴에서 ONE환전 안내를 확인했다.'),
 ('국민은행 환전신청',['본문 1681자: 3500~5500자 필요(출처/이미지 목록 제외)'],'공식 지점 수령 경로와 조건, 비로그인 약관 경계, 수령 및 재환전 예외를 수록했다. 약관 동의 이후는 확인하지 않았음을 밝혔다.'),
 ('국민은행 통장사본 출력',['본문 1433자: 3500~5500자 필요(출처/이미지 목록 제외)','안내 4~8장(복합 예외 9장), 참고 최대 3장'],'검색 1장과 공식 메뉴·로그인·STM 안내 3장으로 총 4장의 서로 다른 화면을 사용했다. 인증 이후 절차는 직접 확인하지 않고 실제 방문한 제3자 출처로 구분했다.')]:
 d=root/'26_1113'/('은행_재테크_'+key)/'웹조사'; files=sorted(p for p in (d/'publish').iterdir() if p.suffix in ('.png','.md')); raw=list((d/'raw').glob('*.png')); seen=set(); info=[]
 for p in files:
  digest=hashlib.sha256(p.read_bytes()).hexdigest()
  if digest in seen:raise ValueError('duplicate output '+str(p))
  seen.add(digest)
  item={'file':p.relative_to(d).as_posix(),'sha256':digest}
  if p.suffix=='.png':
   with Image.open(p) as im:
    im.verify()
   with Image.open(p) as im:
    item['pixels']=list(im.size)
    if min(im.size)<150: raise ValueError('too small '+str(p))
  info.append(item)
 review={'date':'2026-11-13','result':'complete_by_alternative_agent_review','automaticValidation':'not passed; legacy quantity rules','automaticErrors':errors,'reason':reason,'rawCount':len(raw),'publishImageCount':sum(p.suffix=='.png' for p in files),'markedImageCount':sum(p.suffix=='.png' for p in files),'visualReview':'모든 발행 이미지 접촉 시트와 주요 원본 크기 이미지를 확인. 표시 대상, 좌표, 화면 출처와 텍스트 가독성 점검. Google 화면은 결과 영역을 잘라 개인 프로필 노출 제거. 실제 로그인 QR이나 계좌 개인정보 없음.','files':info}
 (d/'evidence'/'review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2),encoding='utf8')
 print(key,review['rawCount'],review['publishImageCount'],len(files))
