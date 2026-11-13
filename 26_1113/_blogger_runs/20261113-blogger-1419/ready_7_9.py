import json
from pathlib import Path
from datetime import datetime
run=Path('26_1113/_blogger_runs/20261113-blogger-1419')
for order in (7,8,9):
    inspection=json.loads((run/f'inspection-{order}.json').read_text(encoding='utf-8'))
    data={'order':order,'row':inspection['row'],'keyword':inspection['keyword'],'spaceId':inspection['spaceId'],'blogId':inspection['blogId'],'at':datetime.now().astimezone().isoformat(),'stage':'ready-create','duplicateCheck':'Blogger 전체 글 검색: 해당 키워드 게시물 없음; local blogger-state.json 없음','originalImageCount':inspection['originalCount'],'verifiedImageCount':len(inspection['slots']),'imageEvidence':f'inspection-{order}.json','originalBackup':f'original-{order}'}
    (run/f'ready-create-{order}.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(data,ensure_ascii=False))
