import json,sys
from pathlib import Path
from datetime import datetime,timezone
order=int(sys.argv[1]);root=Path('Y:/antigravity-project/ego-light-adsense-info-blog');run=root/'26_1113/_blogger_runs/20261113-blogger-1419'
d=json.loads((run/f'draft-ready-{order}.json').read_text(encoding='utf8'));p=json.loads((run/f'public-{order}.json').read_text(encoding='utf8'))
assert p['row']['view']==p['url']==p['canonical'] and d['verification']['title'] in p['h1']
assert d['verification']['description'] in p['description'] and len(p['images'])==d['originalImageCount']
for exp,actual in zip(d['images'],p['images']):
 assert exp['id']==actual['id'] and exp['alt']==actual['alt'] and exp['caption']==actual['caption'] and actual['complete'] and actual['width']>0
 assert exp['url'].split('/s1600/')[0]==actual['src'].split('/s1600/')[0]
published=[x['datetime'] for x in p['published'] if x.get('datetime')]
assert published
path=root/f"26_1113/이슈_{d['keyword']}/웹조사/evidence/blogger-state.json";s=json.loads(path.read_text(encoding='utf8'))
s.update(stage='published',url=p['url'],publishedAt=published[0],publicVerifiedAt=p['checkedAt']);path.write_text(json.dumps(s,ensure_ascii=False,indent=2),encoding='utf8')
out={'type':'published','verified':True,'order':order,'tab':'이슈','row':d['row'],'keyword':d['keyword'],'spaceId':d['spaceId'],'blogId':d['blogId'],'postId':d['postId'],'url':p['url'],'publishedAt':published[0],'verifiedAt':p['checkedAt'],'originalImageCount':d['originalImageCount'],'uploadedImageCount':len(p['images']),'replacementImageCount':0,'excludedImageCount':0,'images':p['images'],'title':p['h1'][0],'canonical':p['canonical'],'description':p['description'],'evidence':str(run/f'public-{order}.json')}
(run/f'published-ready-{order}.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf8')
txt=Path(json.loads((run/f'ready-create-{order}.json').read_text(encoding='utf8'))['txt'])
with txt.open('a',encoding='utf8') as f:f.write(f"공개 확인: {p['url']} / 발행 시각: {published[0]} / 확인: {p['checkedAt']}\n")
print('published-ready',order,p['url'],published[0])
