import sys,json
from pathlib import Path
from datetime import datetime,timezone
root=Path('Y:/antigravity-project/ego-light-adsense-info-blog');run=root/'26_1113/_blogger_runs/20261113-blogger-1419';order=int(sys.argv[1]);keyword={10:'부산은행 환전',11:'국민은행 환전신청',12:'국민은행 통장사본 출력'}[order]
sp=root/f'26_1113/은행_재테크_{keyword}/웹조사/evidence/blogger-state.json';s=json.loads(sp.read_text(encoding='utf-8'));p=json.loads((run/f'public-{order}.json').read_text(encoding='utf-8'))
assert p['h1']==[s['title']] and p['canonical']==s['url'] and len(p['images'])==len(s['images']) and p['times'] and p['times'][0]['datetime']
for a,b in zip(p['images'],s['images']):
    assert a['id']==b['id'] and a['src'].replace('/s1600-rw/','/s1600/')==b['url'] and a['alt']==b['alt'] and a['caption']==b['caption'] and a['complete'] and a['width']>0
assert any(s['description'] in x['outer'] for x in p['meta'])
s.update(stage='published',publishedAt=p['times'][0]['datetime'],publicVerifiedAt=datetime.now(timezone.utc).isoformat(),publicEvidence=f'public-{order}.json')
sp.write_text(json.dumps(s,ensure_ascii=False,indent=2),encoding='utf-8');(run/f'published-ready-{order}.json').write_text(json.dumps(s,ensure_ascii=False,indent=2),encoding='utf-8');print(order,s['url'],s['publishedAt'],len(p['images']))
