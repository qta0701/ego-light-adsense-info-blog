from pathlib import Path
from PIL import Image, ImageDraw

base = Path('26_1113/은행_재테크_부산은행 환전/웹조사')
out = base / 'publish/blogger-images'
out.mkdir(exist_ok=True)
with Image.open(base / 'raw/06_delivery.png') as source:
    image = source.convert('RGB')
draw = ImageDraw.Draw(image)
draw.rectangle((406, 422, 1218, 476), outline='#e32f35', width=6)
image.save(out / '06_delivery_marked.png')
