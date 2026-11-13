from pathlib import Path
p = Path(__file__).resolve().parent.parent / 'publish'
html = (p / '은행_재테크_국민은행 환전신청_html콘텐츠.html').read_text(encoding='utf-8')
for i, name in enumerate(['02_guide.png','05_guide.png','03_guide.png','04_guide.png','06_guide.png','07_guide.png'], 1):
    html = html.replace('{{BLOGGER_IMAGE_URL_IMG_%02d}}' % i, name)
style = '<meta name="viewport" content="width=device-width, initial-scale=1"><style>body{font:16px/1.7 sans-serif;max-width:900px;margin:auto;padding:16px;color:#1e293b}*{box-sizing:border-box}.box{background:#f0f5ff;padding:18px;margin:20px 0;border-radius:8px}.button3{display:block;background:#3c40ff;color:white;text-align:center;padding:14px;border-radius:8px}.faq-item{padding:14px;margin:12px 0;background:#f4f7ff}figure{margin:24px auto}figcaption{font-size:.9em;color:#475569}h2{font-size:1.4rem}a{overflow-wrap:anywhere}</style>'
(p / '_content_preview.html').write_text('<!doctype html><html><head><meta charset="utf-8">'+style+'</head><body>'+html+'</body></html>', encoding='utf-8')
