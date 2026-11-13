import json,sys
from pathlib import Path
from datetime import datetime
run=Path('26_1113/_blogger_runs/20261113-blogger-1419');order=int(sys.argv[1]);d=json.loads((run/f'draft-ready-{order}.json').read_text(encoding='utf8'));record=json.loads((run/f'draft-recorded-{order}.json').read_text(encoding='utf8'));assert str(record['postId'])==str(d['postId']) and record['G']=='ㅇ' and record['H']=='blank' and record['L']=='blank'
data={'order':order,'row':d['row'],'keyword':d['keyword'],'spaceId':d['spaceId'],'blogId':d['blogId'],'postId':d['postId'],'at':datetime.now().astimezone().isoformat(),'stage':'ready-publish','images':d['uploadedCount'],'draftRecordedAt':record['checkedAt']}
(run/f'ready-publish-{order}.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(data,ensure_ascii=False))
