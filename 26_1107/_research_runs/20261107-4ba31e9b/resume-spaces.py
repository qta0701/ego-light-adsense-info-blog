import json
from pathlib import Path
run=Path(__file__).resolve().parent
root=run.parents[2]
manifest_file=run/'manifest.json'
manifest=json.loads(manifest_file.read_text(encoding='utf-8'))
for job in manifest['jobs']:
    space=1 if job['row']==53 else 2
    job['spaceName']=f'research-20261107-09b92673-{job["row"]}-{space-1}'
    job['resumedSpaceId']=space
    state=root/job['folder']/'evidence'/'browser.json'
    if state.exists(): raise RuntimeError('Existing browser state: stop')
    state.write_text(json.dumps({'spaceId':space,'page':'p1','status':'searching','resumedFromRun':'20261107-09b92673'},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
manifest_file.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
