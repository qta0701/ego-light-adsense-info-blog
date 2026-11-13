import json
from pathlib import Path
from datetime import datetime, timezone
root=Path('Y:/antigravity-project/ego-light-adsense-info-blog'); run=root/'26_1113/_blogger_runs/20261113-blogger-1419'
for order,keyword,space in [(10,'부산은행 환전',40),(11,'국민은행 환전신청',41),(12,'국민은행 통장사본 출력',42)]:
    images=json.loads((run/f'images-{order}.json').read_text(encoding='utf-8'))
    state={'runId':'20261113-blogger-1419','order':order,'tab':'은행_재테크','row':order+4,'keyword':keyword,'spaceId':space,'blogId':'3013546958093270596','startedAt':json.loads((run/f'space-{order}.json').read_text())['startedAt'],'stage':'ready_create','expectedImages':images['count'],'images':[],'duplicateEvidence':f'duplicate-final-{order}.txt','imageEvidence':f'images-{order}.json','updatedAt':datetime.now(timezone.utc).isoformat()}
    (root/f'26_1113/은행_재테크_{keyword}/웹조사/evidence/blogger-state.json').write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf-8')
    (run/f'ready-create-{order}.json').write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf-8')
    print(order,state['stage'],state['expectedImages'])
