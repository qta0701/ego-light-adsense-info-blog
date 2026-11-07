import importlib.util
import json
import sys
from pathlib import Path
from PIL import ImageDraw

root = Path(__file__).resolve().parents[3]
spec = importlib.util.spec_from_file_location('research_pipeline', root / 'tools/research_pipeline.py')
pipeline = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pipeline)
original_text = ImageDraw.ImageDraw.text

def text_with_private_label(self, xy, text, *args, **kwargs):
    if text == '로그인 QR 가림':
        text = '개인정보 가림'
    return original_text(self, xy, text, *args, **kwargs)

ImageDraw.ImageDraw.text = text_with_private_label
for keyword in (sys.argv[1:] or ('당근마켓 전국검색', '번개장터 계좌거래')):
    folder = root / '26_1107' / ('앱사용_' + keyword) / '웹조사'
    data = json.loads((folder / 'research.json').read_text(encoding='utf-8'))
    print(pipeline.package(folder, data))
