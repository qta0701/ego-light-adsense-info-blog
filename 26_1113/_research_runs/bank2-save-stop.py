import json
from pathlib import Path

root = Path(__file__).resolve().parents[2]
file = root / '26_1113/_research_runs/bank-2-manifest.json'
data = json.loads(file.read_text(encoding='utf-8'))
data['status'] = 'paused_user_control'
data['reason'] = 'Space 14 returned SDK hard stop: control is with user. No retry, takeover, other browser, or further browser action was attempted.'
data['sheet']['write'] = 'not attempted: no row completed'
data['spaceCleanup'] = 'not performed: preserve all three Spaces for resume'
data['captureAlternative'] = 'not attempted: user control hard stop; no capture had been started'
for row in data['rows']:
    row['status'] = 'paused_user_control' if row['row'] == 17 else 'pending_after_user_control_stop'
    row['searchEvidence'] = row['folder'] + '/evidence/search-1.page.json'
    row['partialDocument'] = row['folder'] + '/publish/조사_중간기록.md'
    row['resume'] = ('After explicit continue, take over Space 14 using SDK; inspect p2 final URL and official content.' if row['row'] == 17 else 'After control is resolved and explicit continue, resume assigned Space and open official Google result.') + ' Confirm bank-1 capture end before capture; research, save, visually review, then recheck I/A/C and write only if complete.'
    state = root / row['folder'] / 'evidence/browser.json'
    state.write_text(json.dumps({'spaceId': row['spaceId'], 'page': 'p2' if row['row']==17 else 'p1', 'status': row['status'], 'resume': row['resume']}, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
file.write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
run = root / data['runManifest']
run_data = json.loads(run.read_text(encoding='utf-8'))
for job in run_data['jobs']:
    row = next(r for r in data['rows'] if r['row'] == job['row'])
    job['spaceName'], job['spaceId'] = row['spaceName'], row['spaceId']
run.write_text(json.dumps(run_data, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
