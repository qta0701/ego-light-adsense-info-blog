import json
from pathlib import Path
p=Path(__file__).resolve().parents[3]/'26_1107/앱사용_11월 넷플릭스 드라마 순위/웹조사/research.json'
data=json.loads(p.read_text(encoding='utf-8'))
data['visualReviewed']=True
p.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
