import json
from pathlib import Path
from datetime import datetime,timezone
root=Path('Y:/antigravity-project/ego-light-adsense-info-blog');run=root/'26_1113/_blogger_runs/20261113-blogger-1419';results=[]
for order,keyword in [(10,'부산은행 환전'),(11,'국민은행 환전신청'),(12,'국민은행 통장사본 출력')]:
    sp=root/f'26_1113/은행_재테크_{keyword}/웹조사/evidence/blogger-state.json';s=json.loads(sp.read_text(encoding='utf-8'));sheet=json.loads((run/f'sheet-recorded-{order}.json').read_text(encoding='utf-8'));m=json.loads((run/f'images-{order}.json').read_text(encoding='utf-8'))
    assert s['stage']=='sheet_recorded' and sheet['H']==s['url'] and sheet['postId']==s['postId'] and sheet['G']=='ㅇ'
    text=(root/m['txt']).read_text(encoding='utf-8')+'\n\n[Blogger 발행 결과 — B 실행 기록]\n'+f"postId: {s['postId']}\n실제 URL: {s['url']}\n발행 시각: {s['publishedAt']}\n주소: 자동 퍼머링크 (추천값 저장 후 미유지)\n"
    for x in s['images']:text+=f"{x['id']} / {x['path']} / {x['url']}\n"
    (run/f'final-{order}.txt').write_text(text,encoding='utf-8');s['sheetEvidence']=f'sheet-recorded-{order}.json';s['completedAt']=datetime.now(timezone.utc).isoformat();sp.write_text(json.dumps(s,ensure_ascii=False,indent=2),encoding='utf-8')
    results.append({'order':order,'row':s['row'],'keyword':keyword,'spaceId':s['spaceId'],'startedAt':s['startedAt'],'endedAt':s['spaceEndedAt'],'postId':s['postId'],'url':s['url'],'publishedAt':s['publishedAt'],'originalImageCount':s['expectedImages'],'uploadedCount':len(s['images']),'replacementCount':0,'excludedCount':0,'G':sheet['G'],'H':sheet['H'],'L':sheet['L'],'claimReleased':True})
(run/'released-12.json').write_text(json.dumps({'order':12,'released':True,'at':datetime.now(timezone.utc).isoformat()}),encoding='utf-8')
(run/'bank-results-10-12.json').write_text(json.dumps({'completedAt':datetime.now(timezone.utc).isoformat(),'results':results},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(results,ensure_ascii=False,indent=2))
