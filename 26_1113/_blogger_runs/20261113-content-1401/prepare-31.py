from pathlib import Path
from PIL import Image, ImageDraw
base = Path('26_1113/이슈_코레일 민원접수/웹조사')
out = base / 'publish/blogger-images'
out.mkdir(exist_ok=True)
with Image.open(base / 'raw/06_post.png') as im:
    im = im.crop((105, 405, 980, 680)).convert('RGB')
    ImageDraw.Draw(im).rectangle((110, 115, 850, 173), outline='#e00000', width=4)
    im.save(out / '06_post_marked.png')
print('06_post_marked.png', im.size)
