import json
from pathlib import Path
from datetime import datetime,timezone
root=Path('Y:/antigravity-project/ego-light-adsense-info-blog');run=root/'26_1113/_blogger_runs/20261113-blogger-1419'
for order,keyword in [(2,'코레일 민원접수'),(3,'테무 회원탈퇴')]:
 m=json.loads((run/f'ready-create-{order}.json').read_text(encoding='utf8'));v=json.loads((run/f'verify-{order}.json').read_text(encoding='utf8'))
 p=root/f'26_1113/이슈_{keyword}/웹조사/evidence/blogger-state.json';s=json.loads(p.read_text(encoding='utf8'))
 assert v['bodyMatches'] and v['title']==v['expectedTitle'] and v['description']==v['expectedDescription'] and len(s['images'])==m['originalImageCount']
 images=[]
 for expected,uploaded in zip(m['images'],s['images']):
  assert expected['id']==uploaded['id'] and uploaded['url'].startswith('https://blogger.googleusercontent.com/')
  images.append({**uploaded,'order':expected['order'],'alt':expected['alt'],'caption':expected['caption']})
 now=datetime.now(timezone.utc).isoformat();s.update(stage='draft_saved',savedAt=now,verifiedAt=v['verifiedAt'],permalink='automatic',metadata={'title':v['title'],'description':v['description'],'labels':v['labels'],'recommendedSlug':v['expectedSlug'],'slugResult':'not retained; automatic selected and reloaded'})
 p.write_text(json.dumps(s,ensure_ascii=False,indent=2),encoding='utf8')
 record={'type':'draft','verified':True,'order':order,'tab':'이슈','row':s['row'],'keyword':keyword,'spaceId':s['spaceId'],'blogId':s['blogId'],'postId':s['postId'],'editorUrl':s['editorUrl'],'savedAt':now,'originalImageCount':len(images),'uploadedImageCount':len(images),'excludedImageCount':0,'replacementImageCount':0,'images':images,'verification':{'bodyMatchesSavedAfterReload':True,'title':v['title'],'description':v['description'],'labels':v['labels'],'permalink':'automatic checked after reload','unresolvedTokens':0,'evidence':str(run/f'verify-{order}.json')}}
 (run/f'draft-ready-{order}.json').write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf8')
 with Path(m['txt']).open('a',encoding='utf8') as f:
  f.write('\n[B 업로드 실행 기록]\n'+f"postId: {s['postId']} / 초안 저장 검증: {now}\n")
  for i in images:f.write(f"{i['id']}: {i['url']}\n")
  f.write('추천 슬러그 미유지로 자동 퍼머링크 선택.\n')
 print('draft-ready',order)
