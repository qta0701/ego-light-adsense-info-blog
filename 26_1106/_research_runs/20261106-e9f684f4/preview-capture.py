"""Diagnostic marker previews only; these are not approved research deliverables."""
import json
import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

run = Path(__file__).resolve().parent
root = run.parents[2]
font = ImageFont.truetype(str(Path(os.environ['WINDIR'])/'Fonts/malgun.ttf'), 28)
for keyword, name in [('코레일 승차권 전달', 'korail'), ('당근마켓 채팅 걸기', 'daangn')]:
    folder = root/'26_1106'/f'앱사용_{keyword}'/'웹조사'
    meta = json.loads((folder/'evidence/01_search.json').read_text(encoding='utf-8'))
    with Image.open(folder/'raw/01_search.png') as source:
        im = source.convert('RGB')
    draw = ImageDraw.Draw(im)
    for number, (x, y, w, h) in enumerate(meta['boxes'], 1):
        x, y, w, h = x-12, y-12, w+24, h+24
        draw.rectangle((x,y,x+w,y+h), outline='#e32f35', width=8)
        cx = x+w/2
        draw.line((cx,y-52,cx,y), fill='#e32f35', width=8)
        draw.polygon([(cx,y),(cx-14,y-20),(cx+14,y-20)], fill='#e32f35')
        draw.text((x+8,y+7),str(number),font=font,fill='#e32f35',stroke_width=3,stroke_fill='white')
    im.save(run/f'{name}-zoom-preview.png')
