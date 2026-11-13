from pathlib import Path
from datetime import datetime, timezone
import json
run=Path('Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419')
for order,space in [(13,43),(14,44),(15,45)]:
    audit=json.loads((run/f'image-audit-{order}.json').read_text(encoding='utf-8'))
    data={'order':order,'row':order+4,'keyword':audit['keyword'],'spaceId':space,'blogId':'3013546958093270596','at':datetime.now(timezone.utc).isoformat(),'adoptedCount':audit['adoptedCount'],'imageAudit':f'image-audit-{order}.json','duplicateEvidence':f'duplicate-{order}.txt','duplicateResult':'Blogger keyword search returned 게시물 없음','originalPreserved':f'original-{order}'}
    (run/f'ready-create-{order}.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
    print(data)
