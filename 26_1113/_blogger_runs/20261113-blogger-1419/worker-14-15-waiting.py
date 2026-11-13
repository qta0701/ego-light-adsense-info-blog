from pathlib import Path
from datetime import datetime, timezone
import json
run=Path('Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419')
for order in (14,15):
 d=json.loads((run/f'draft-ready-{order}.json').read_text(encoding='utf-8'))
 (run/f'waiting-{order}.json').write_text(json.dumps({'order':order,'at':datetime.now(timezone.utc).isoformat(),'stage':'awaiting draft-recorded','postId':d['postId'],'spaceId':d['spaceId'],'draftReady':f'draft-ready-{order}.json','imageCount':d['count']},ensure_ascii=False,indent=2),encoding='utf-8')
