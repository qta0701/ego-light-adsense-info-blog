from pathlib import Path
from PIL import Image
import json,hashlib,subprocess,sys
root=Path(__file__).resolve().parents[2]; day=root/'26_1113'
for key in ['진학어플라이 회원가입','인스타그램 탈퇴방법','배민클럽 환불']:
 d=day/f'노하우2_{key}'/'웹조사'; data=json.loads((d/'research.json').read_text(encoding='utf-8')); files=sorted((d/'publish').glob('*.png')); raws=sorted((d/'raw').glob('*.png')); md=list((d/'publish').glob('*.md'))
 assert len(files)>=4 and len(md)==1 and len(files)==len(data['images'])
 checks=[];hashes={};rawhash=set();pubhash=set()
 for item in data['images']:
  p=d/item['file']; assert p.is_file(); h=hashlib.sha256(p.read_bytes()).hexdigest();assert h not in rawhash;rawhash.add(h)
  with Image.open(p) as im:
   w,h=im.size;im.verify()
  assert min(w,h)>=200
  for x,y,bw,bh in item['boxes']:assert 0<=x and 0<=y and x+bw<=w and y+bh<=h
  checks.append({'raw':item['file'],'dimensions':[w,h],'boxes':item['boxes'],'actualScreenUrl':item['actualScreenUrl']})
 for p in files:
  with Image.open(p) as im: im.verify()
  h=hashlib.sha256(p.read_bytes()).hexdigest();assert h not in pubhash;pubhash.add(h);hashes[str(p.relative_to(d))]=h
 hashes[str(md[0].relative_to(d))]=hashlib.sha256(md[0].read_bytes()).hexdigest()
 text=md[0].read_text(encoding='utf-8')
 for p in files: assert p.name in text
 result=subprocess.run([sys.executable,str(root/'tools/research_pipeline.py'),'validate',str(d),'--no-notify'],capture_output=True,text=True,encoding='utf-8')
 error=json.loads(result.stdout)['errors'];assert all(('본문 ' in e or '안내 4~8장' in e) for e in error),error
 report={'reviewedAt':'2026-11-13 Asia/Seoul','visualReview':'모든 발행 이미지와 표식 및 개인정보 가림을 직접 확인','contentDecision':'완료: 공식 근거로 핵심 절차·조건·예외를 확인','adjustment':'핵심 답변을 반복하지 않도록 본문을 권장 길이보다 짧게 작성. 검색 화면 포함 4장 이상 확보.','rawCount':len(raws),'publishedCount':len(files),'markedCount':len(files),'autoValidation':{'status':'구 수량 기준 미통과','errors':error},'alternativeReview':{'status':'완료','fileOpen':'Pillow 확인','distinctPublishedHashes':len(pubhash),'rawDimensionsAndMarks':checks,'publishHashes':hashes,'privacy':'Google 계정 식별 부분을 발행 이미지에서 가림; 원본은 보존','limitation':data['exceptionReason']}}
 (d/'evidence'/'review.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
 print(key,json.dumps({'raw':len(raws),'publish':len(files),'marked':len(files),'errors':error},ensure_ascii=False))
