from pathlib import Path
from datetime import datetime,timezone
import json
run=Path('Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419')
for order in (13,14,15):
    marker=run/f'draft-recorded-{order}.json'; out=run/f'ready-publish-{order}.json'
    if marker.exists() and not out.exists():
        r=json.loads(marker.read_text(encoding='utf-8')); d=json.loads((run/f'draft-ready-{order}.json').read_text(encoding='utf-8'))
        if r['postId']!=d['postId'] or r['G']!='ㅇ' or r['H']!='blank' or r['L']!='blank': raise ValueError(order)
        out.write_text(json.dumps({'order':order,'row':r['row'],'keyword':r['keyword'],'spaceId':d['spaceId'],'blogId':d['blogId'],'postId':d['postId'],'draftRecordedAt':r['checkedAt'],'at':datetime.now(timezone.utc).isoformat(),'count':d['count']},ensure_ascii=False,indent=2),encoding='utf-8')
        print(order)
