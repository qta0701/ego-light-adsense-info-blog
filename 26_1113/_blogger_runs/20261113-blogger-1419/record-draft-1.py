import json
from pathlib import Path
from datetime import datetime, timezone
root=Path('Y:/antigravity-project/ego-light-adsense-info-blog')
run=root/'26_1113/_blogger_runs/20261113-blogger-1419'
m=json.loads((run/'ready-create-1.json').read_text(encoding='utf8'))
v=json.loads((run/'verify-1.json').read_text(encoding='utf8'))
p=root/'26_1113/이슈_앱스토어 로그아웃/웹조사/evidence/blogger-state.json'
s=json.loads(p.read_text(encoding='utf8'))
assert v['bodyMatches'] and len(s['images'])==m['originalImageCount']==3
images=[]
for expected, uploaded in zip(m['images'],s['images']):
 assert expected['id']==uploaded['id'] and uploaded['url'].startswith('https://blogger.googleusercontent.com/')
 images.append({**uploaded,'order':expected['order'],'alt':expected['alt'],'caption':expected['caption']})
now=datetime.now(timezone.utc).isoformat()
s.update(stage='draft_saved',savedAt=now,verifiedAt=v['verifiedAt'],permalink='automatic',metadata={'title':v['title'],'description':v['description'],'labels':v['labels'],'recommendedSlug':'app-store-sign-out-guide','slugResult':'not retained; automatic selected and reloaded'})
p.write_text(json.dumps(s,ensure_ascii=False,indent=2),encoding='utf8')
record={'type':'draft','verified':True,'order':1,'tab':'이슈','row':30,'keyword':s['keyword'],'spaceId':35,'blogId':s['blogId'],'postId':s['postId'],'editorUrl':s['editorUrl'],'savedAt':now,'originalImageCount':3,'uploadedImageCount':3,'excludedImageCount':0,'replacementImageCount':0,'images':images,'verification':{'bodyMatchesSavedAfterReload':True,'title':v['title'],'description':v['description'],'labels':v['labels'],'permalink':'automatic checked after reload','unresolvedTokens':0,'evidence':str(run/'verify-1.json')}}
(run/'draft-ready-1.json').write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf8')
with Path(m['txt']).open('a',encoding='utf8') as f:
 f.write('\n[B 업로드 실행 기록]\n'+f"postId: {s['postId']} / 초안 저장 검증: {now}\n")
 for i in images:f.write(f"{i['id']}: {i['url']}\n")
 f.write('추천 슬러그 미유지로 자동 퍼머링크 선택.\n')
print('draft-ready-1')
