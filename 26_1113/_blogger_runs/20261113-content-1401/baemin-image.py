from pathlib import Path
from PIL import Image, ImageDraw
root = Path('26_1113/노하우2_배민클럽 환불/웹조사')
out = root / 'publish/blogger-images'
out.mkdir(exist_ok=True)
im = Image.open(root / 'raw/02_cancel.png').convert('RGB')
im = im.crop((0, 285, 1080, 630))
ImageDraw.Draw(im).rectangle((49, 123, 1073, 205), outline='#e00020', width=4)
im.save(out / '02_cancel_detail.png')
for p in [root/'publish/02_06_entry.png',root/'publish/03_01_refund.png',root/'publish/04_03_long.png',out/'02_cancel_detail.png']:
 print(p, Image.open(p).size)
