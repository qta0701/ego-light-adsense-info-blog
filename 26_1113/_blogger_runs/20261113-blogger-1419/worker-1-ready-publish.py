import json
from pathlib import Path
from datetime import datetime,timezone
run=Path('Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419')
for order in (1,2,3):
 rec=run/f'draft-recorded-{order}.json';out=run/f'ready-publish-{order}.json'
 if not rec.exists() or out.exists():continue
 d=json.loads((run/f'draft-ready-{order}.json').read_text(encoding='utf8'));r=json.loads(rec.read_text(encoding='utf8'))
 assert r['postId']==d['postId'] and r['G']=='ㅇ' and r['H']=='blank' and r['L']=='blank'
 obj={'order':order,'row':d['row'],'keyword':d['keyword'],'spaceId':d['spaceId'],'blogId':d['blogId'],'postId':d['postId'],'at':datetime.now(timezone.utc).isoformat(),'stage':'ready-publish','images':d['uploadedImageCount'],'draftRecordedAt':r['checkedAt']}
 out.write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf8');print(order,'ready-publish')
