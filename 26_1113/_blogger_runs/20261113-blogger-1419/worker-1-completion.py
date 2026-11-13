import json
from pathlib import Path
from datetime import datetime,timezone
root=Path('Y:/antigravity-project/ego-light-adsense-info-blog');run=root/'26_1113/_blogger_runs/20261113-blogger-1419'
rows=[]
for order in (1,2,3):
 def read(name):return json.loads((run/f'{name}-{order}.json').read_text(encoding='utf8'))
 d,p,s,start,end,released=(read(n) for n in ('draft-ready','published-ready','sheet-recorded','space','space-finished','released'))
 assert d['postId']==p['postId']==s['postId'] and p['url']==s['H'] and p['publishedAt']==s['publishedAt'] and s['G']=='ㅇ' and released['released']
 assert len(p['images'])==p['originalImageCount']==p['uploadedImageCount']
 statepath=root/f"26_1113/이슈_{d['keyword']}/웹조사/evidence/blogger-state.json";state=json.loads(statepath.read_text(encoding='utf8'))
 state.update(sheetRecorded=s,spaceEndedAt=end['endedAt'],claimReleasedAt=released['at']);statepath.write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf8')
 rows.append({'order':order,'row':s['row'],'keyword':d['keyword'],'status':'published_and_sheet_verified','postId':d['postId'],'url':s['H'],'publishedAt':p['publishedAt'],'G':s['G'],'H':s['H'],'L':s['L'],'sheetCheckedAt':s['checkedAt'],'originalImages':p['originalImageCount'],'uploadedImages':p['uploadedImageCount'],'replacements':0,'excluded':0,'spaceId':start['spaceId'],'spaceStartedAt':start['startedAt'],'spaceEndedAt':end['endedAt'],'claimReleasedAt':released['at']})
assert len({x['url'] for x in rows})==3
result={'completedAt':datetime.now(timezone.utc).isoformat(),'blogId':'694192108971227039','maximumConcurrentSpaces':3,'rows':rows}
(run/'worker-1-completion.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(result,ensure_ascii=False,indent=2))
