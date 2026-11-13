from pathlib import Path
from datetime import datetime,timezone
import json
root=Path('Y:/antigravity-project/ego-light-adsense-info-blog');run=root/'26_1113/_blogger_runs/20261113-blogger-1419';path=root/'26_1113/은행_재테크_신한은행 간편조회/웹조사/evidence/blogger-state.json'
state=json.loads(path.read_text(encoding='utf-8'));audit=json.loads((run/'image-audit-13.json').read_text(encoding='utf-8'));obs=json.loads((run/'public-observe-13.json').read_text(encoding='utf-8'))
url='https://bank.supportimes.com/2026/11/blog-post_13.html';title='신한은행 간편조회 방법: 계좌조회 로그인과 이용 범위'
assert obs['url']==obs['canonical']==url and obs['h1']==[title] and len(obs['images'])==len(audit['slots'])
for a,o,s in zip(audit['slots'],obs['images'],state['images']):
 assert a['id']==o['id']==s['id'] and o['loaded'] and o['alt']==a['alt'] and o['caption']==a['caption'] and o['src'].replace('/s1600-rw/','/s1600/')==s['url']
date=next(x['datetime'] for x in obs['dates'] if x['tag']=='TIME' and x['datetime'])
state.update(stage='published_verified',url=url,publishedAt=date,publicVerifiedAt=datetime.now(timezone.utc).isoformat());path.write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf-8');(run/'state-13.json').write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf-8')
(run/'published-ready-13.json').write_text(json.dumps({'order':13,'row':17,'keyword':state['keyword'],'spaceId':43,'blogId':state['blogId'],'postId':state['postId'],'url':url,'title':title,'canonical':obs['canonical'],'publishedAt':date,'verifiedAt':state['publicVerifiedAt'],'images':obs['images'],'count':len(obs['images']),'evidence':'public-observe-13.json'},ensure_ascii=False,indent=2),encoding='utf-8')
print(url,date,len(obs['images']))
