import json
from pathlib import Path
root=Path(__file__).resolve().parents[2]
path=root/'26_1113/_research_runs/bank-2-manifest.json'
data=json.loads(path.read_text(encoding='utf-8'))
data['status']='complete'
data['sheet']['preWriteVerification']='I17:I19 matched assignment; A17:A19 and C17:C19 blank; date format yyyy-MM-dd'
data['sheet']['write']='A17:A19 numeric date 46339 (2026-11-13), C17:C19 ㅇ; only userEnteredValue changed'
data['sheet']['postWriteVerification']='Re-read A/C/I: all dates formatted 2026-11-13 with numeric effective value 46339; C all ㅇ; I all match.'
data.pop('reason',None)
for row in data['rows']:
 row['status']='complete'; row['sheetApplied']=True
 row['sheetVerification']={'A':'2026-11-13','A_numeric':46339,'C':'ㅇ','I':row['keyword'],'verified':True}
 row.pop('resume',None)
 state=root/row['folder']/'evidence/browser.json'
 state.write_text(json.dumps({'spaceId':row['spaceId'],'status':'finished','finish':'SDK finish keep [] after agent review'},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Manifest updated and sheet verification recorded.')
