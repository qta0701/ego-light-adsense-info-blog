from pathlib import Path
from PIL import Image
import json,hashlib
root=Path(__file__).resolve().parents[2]; run=root/'26_1113'/'_research_runs'; p=run/'issue-1-manifest.json'
m=json.loads(p.read_text(encoding='utf-8')); m.update({'status':'reviewed_sheet_pending','runManifest':'26_1113/_research_runs/20261113-992e177a/manifest.json','threadCreated':'01a1d305-eefe-7150-97fd-cfec0e5472b9','concurrency':1})
for row,space in zip(m['rows'],[2,3,4]):
 k=row['keyword']; d=root/'26_1113'/('이슈_'+k)/'웹조사'; raw=sorted((d/'raw').glob('*.png')); pub=sorted((d/'publish').glob('*.png')); md=list((d/'publish').glob('*.md')); assert len(pub)==4 and len(md)==1
 hashes={}; dims={}
 for f in pub:
  with Image.open(f) as im: im.verify()
  with Image.open(f) as im: dims[f.name]=list(im.size)
  hashes['publish/'+f.name]=hashlib.sha256(f.read_bytes()).hexdigest()
 assert len(set(hashes.values()))==4
 text=md[0].read_text(encoding='utf-8'); assert all(f.name in text for f in pub)
 hashes['publish/'+md[0].name]=hashlib.sha256(md[0].read_bytes()).hexdigest()
 data=json.loads((d/'research.json').read_text(encoding='utf-8')); n=len(data['body'])
 errors=[f'본문 {n}자: 3500~5500자 필요(출처/이미지 목록 제외)','안내 4~8장(복합 예외 9장), 참고 최대 3장']
 review={'status':'agent_alternative_review_complete','date':'2026-11-13','automatic_validation':'구현의 고정 분량 및 안내 이미지 수 기준 미통과','automatic_errors':errors,'bodyCharacters':n,'rawImages':len(raw),'publishedImages':len(pub),'redMarkedImages':len(pub),'rawFiles':[f.name for f in raw],'dimensions':dims,'sha256':hashes,'checks':['공식 결과 실제 방문 및 본문 대조','원본과 발행 이미지 전체 시각 대조, 설명 대상과 표식 확인','검색 결과 URL과 계정 표시를 발행 이미지에서 제거','개인정보와 팝업 잔존 확인','파일 열림, 유일한 이미지 해시와 상대 경로 확인'], 'adjustment':'공식 안내로 핵심 경로와 조건이 해결되어 중복 장면이나 반복 문장으로 분량을 늘리지 않음. 검색 1장 및 서로 다른 설명을 표시한 안내 3장.', 'limitations':'실제 앱 또는 인증 이후 화면은 열지 않았으며 공식 설명 화면 발췌로 대체. 검색 결과 발행 이미지는 URL과 계정 표시를 제거하기 위해 실제 검색 결과 부분만 잘라 사용.', 'unusedRaw':(['04_auth.png: 본인인증 버튼이 잘려 05_auth_button.png로 대체'] if k=='코레일 민원접수' else []),'completionDecision':'핵심 질문, 공식 근거, 이미지별 명세 및 시각 검수를 충족하여 완료'}
 (d/'evidence'/'review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2),encoding='utf-8')
 row.update({'space':space,'resultPath':f'26_1113/이슈_{k}/웹조사/publish/이슈_{k}_웹조사결과.md','rawImages':len(raw),'publishImages':len(pub),'markedImages':len(pub),'status':'reviewed_sheet_pending','sheet':{'before':'pending','write':'pending','verify':'pending'},'automaticErrors':errors,'failure':'없음; 공식 화면 발췌 대안 사용','resume':'시트 A·C·I 재확인 후 완료값 기록 및 재조회; Space 정리'})
p.write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(m,ensure_ascii=False))
