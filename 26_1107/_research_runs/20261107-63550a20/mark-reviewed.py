import json
from pathlib import Path
root = Path(__file__).resolve().parents[3]
for keyword in ('당근마켓 전국검색', '번개장터 계좌거래'):
    path = root / '26_1107' / ('앱사용_' + keyword) / '웹조사' / 'research.json'
    data = json.loads(path.read_text(encoding='utf-8'))
    data['visualReviewed'] = True
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
