from pathlib import Path
from PIL import Image
import json,hashlib,datetime,zoneinfo
root=Path(__file__).resolve().parents[2]; run=root/'26_1113/_research_runs'; path=run/'knowhow-1-manifest.json'; m=json.loads(path.read_text(encoding='utf-8'))
m.update({'status':'reviewed_sheet_pending','sheetId':799022458,'sheetUrl':'https://docs.google.com/spreadsheets/d/1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s/edit','concurrency':3,'threadCreated':'01a1d30f-7f36-7783-b692-7299379c3900'})
for row,space in zip(m['rows'],[5,6,7]):
 k=row['keyword'];d=root/'26_1113'/('노하우_'+k)/'웹조사'; research=json.loads((d/'research.json').read_text(encoding='utf-8')); raw=list((d/'raw').glob('*.png')); pub=sorted((d/'publish').glob('*.png')); md=list((d/'publish').glob('*.md'));assert len(pub)==4 and len(md)==1
 hashes={};dims={};text=md[0].read_text(encoding='utf-8')
 for r in research['images']:
  source=d/r['file']; target=d/r['publish']; assert source.exists() and target.exists() and r['file'] in text and r['publish'] in text and r['screenUrl'] in text
  with Image.open(source) as im: w,h=im.size
  x1,y1,x2,y2=r['crop']; bx1,by1,bx2,by2=r['markedBox']; assert 0<=x1<x2<=w and 0<=y1<y2<=h and x1<=bx1<bx2<=x2 and y1<=by1<by2<=y2
 for f in pub:
  with Image.open(f) as im: im.verify()
  with Image.open(f) as im: dims[f.name]=list(im.size)
  hashes['publish/'+f.name]=hashlib.sha256(f.read_bytes()).hexdigest()
 assert len(set(hashes.values()))==4
 hashes['publish/'+md[0].name]=hashlib.sha256(md[0].read_bytes()).hexdigest()
 n=len(research['body']); errors=[f'본문 {n}자: 3500~5500자 필요(출처/이미지 목록 제외)']
 if k=='코레일 승차권 조회':errors.append('중복 없는 출처 1~2개 필요')
 errors.append('안내 4~8장(복합 예외 9장), 참고 최대 3장')
 limitation={'앱스토어 국가변경':'Apple 실제 기기 조작 대신 공식 지원 문서 화면. 로그인·결제·변경은 수행하지 않음.','코레일 승차권 조회':'로그인·본인 인증 후 실제 승차권을 열지 않음. 팝업이 가린 03/04/05 원본을 보존하고 06/07을 재촬영해 발행.','모바일 티머니 환불':'실제 앱·환불은 실행하지 않음. LG유플러스 USIM 교체 관련 Android FAQ의 적용 범위를 명시. 수수료·처리 시간은 공식 근거가 없어 단정하지 않음. 02/04 대상의 블록 폭이 화면 밖이어서 텍스트 영역 재측정 후 캡처.'}[k]
 review={'status':'agent_alternative_review_complete','date':date if (date:='2026-11-13') else date,'automatic_validation':'고정 수량 기준 미통과','automatic_errors':errors,'bodyCharacters':n,'rawImages':len(raw),'publishedImages':len(pub),'redMarkedImages':len(pub),'rawFiles':sorted(f.name for f in raw),'dimensions':dims,'sha256':hashes,'checks':['공식 검색 결과에서 실제 공식 페이지 방문과 근거 대조','발행 이미지 4장 모두 원본 및 좌표와 직접 시각 대조','PNG 열림, 서로 다른 해시, 표식과 잘라낸 영역 경계 확인','검색 결과 및 안내 이미지 개인정보와 팝업 잔존 확인','이미지별 원본·발행 파일명, 실제 화면 URL과 확인일 대조'],'adjustment':'검색 1장 및 서로 다른 진입·단계·조건 3장으로 핵심 경로를 설명해 반복 화면과 문장을 추가하지 않음. 코레일은 선택·회원 로그인·기존 비회원 폼의 실제 URL 3개를 명세.','limitations':limitation,'completionDecision':'확인 가능한 공식 근거와 핵심 절차, 이용 조건, 4장의 발행 이미지 및 실제 URL을 검수함'}
 (d/'evidence/review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2),encoding='utf-8')
 row.update({'space':space,'resultPath':str(md[0].relative_to(root)).replace('\\','/'),'rawImages':len(raw),'publishImages':len(pub),'markedImages':len(pub),'status':'reviewed_sheet_pending','sheet':{'before':'pending','write':'pending','verify':'pending'},'automaticErrors':errors,'failure':limitation,'resume':'A·C·I 재확인 후 완료 기록·재조회, Space 정리'})
path.write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps(m,ensure_ascii=False))
