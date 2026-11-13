import json, re, sys
from pathlib import Path
from html.parser import HTMLParser
from datetime import datetime
root=Path('Y:/antigravity-project/ego-light-adsense-info-blog'); run=root/'26_1113/_blogger_runs/20261113-blogger-1419'
order=int(sys.argv[1]);audit=json.loads((run/f'inspection-{order}.json').read_text(encoding='utf8')); folder=root/f"26_1113/노하우2_{audit['keyword']}/웹조사";state=json.loads((folder/'evidence/blogger-state.json').read_text(encoding='utf8'));html=(run/f'final-{order}.html').read_text(encoding='utf8')
assert state['status']=='draft_saved' and len(state['images'])==audit['originalCount']
class Figures(HTMLParser):
 def __init__(self):super().__init__();self.items=[];self.current=None;self.caption=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag in ('figure','div') and a.get('data-image-id'):self.current={'id':a['data-image-id'],'container':tag}
  if self.current is not None and tag=='img':self.current.update(src=a.get('src'),alt=a.get('alt'))
  if self.current is not None and (tag=='figcaption' or (tag=='p' and 'seo-image-caption' in a.get('class','').split())):self.caption=True;self.current['caption']=''
 def handle_data(self,data):
  if self.caption:self.current['caption']+=data
 def handle_endtag(self,tag):
  if tag in ('figcaption','p') and self.caption:self.caption=False
  if self.current is not None and tag==self.current['container']:self.current.pop('container');self.items.append(self.current);self.current=None
p=Figures();p.feed(html);assert len(p.items)==audit['originalCount']
for slot,img in zip(audit['slots'],p.items):
 assert slot['id']==img['id'] and img['src']==next(x['url'] for x in state['images'] if x['id']==img['id']) and img['alt'] and img['caption']
data={'order':order,'row':audit['row'],'keyword':audit['keyword'],'spaceId':audit['spaceId'],'blogId':state['blogId'],'postId':state['postId'],'editorUrl':state['editorUrl'],'at':datetime.now().astimezone().isoformat(),'originalCount':audit['originalCount'],'uploadedCount':len(p.items),'substitutedCount':0,'excludedCount':0,'images':p.items,'verification':state['verification'],'evidence':'stored CodeMirror HTML matched final HTML on editor reload; title, description, labels checked'}
(run/f'draft-ready-{order}.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps({'order':order,'postId':state['postId'],'count':len(p.items)},ensure_ascii=False))
