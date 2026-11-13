import json,re,html
from pathlib import Path
from datetime import datetime,timezone
root=Path('Y:/antigravity-project/ego-light-adsense-info-blog');run=root/'26_1113/_blogger_runs/20261113-blogger-1419'
for order,keyword in [(10,'부산은행 환전'),(11,'국민은행 환전신청'),(12,'국민은행 통장사본 출력')]:
    if (run/f'draft-ready-{order}.json').exists(): continue
    sp=root/f'26_1113/은행_재테크_{keyword}/웹조사/evidence/blogger-state.json';s=json.loads(sp.read_text(encoding='utf-8'));m=json.loads((run/f'images-{order}.json').read_text(encoding='utf-8'));d=json.loads((run/f'saved-{order}.json').read_text(encoding='utf-8'))
    source=(root/m['html']).read_text(encoding='utf-8');final=source
    for x in s['images']:final=final.replace('{{BLOGGER_IMAGE_URL_'+x['id']+'}}',x['url'])
    assert final.replace('\r','')==d['html'].replace('\r','') and len(s['images'])==m['count'] and d['auto']=='true'
    entries=[]
    for i,x in enumerate(s['images'],1):
        block=re.search(r'<!-- IMAGE_SLOT:'+x['id']+r' START -->(.*?)<!-- IMAGE_SLOT:'+x['id']+r' END -->',d['html'],re.S).group(1)
        src=html.unescape(re.search(r'<img\b[^>]*src="([^"]+)"',block).group(1));alt=html.unescape(re.search(r'<img\b[^>]*alt="([^"]+)"',block).group(1));caption_match=re.search(r'<p[^>]*class="seo-image-caption"[^>]*>(.*?)</p>',block,re.S) or re.search(r'<figcaption[^>]*>(.*?)</figcaption>',block,re.S);caption=html.unescape(caption_match.group(1)).strip()
        assert src==x['url'] and alt and caption
        entries.append({**x,'order':i,'alt':alt,'caption':caption})
    assert not re.search(r'\{\{BLOGGER_IMAGE_URL_',d['html'])
    (run/f'final-{order}.html').write_text(final,encoding='utf-8')
    s.update(stage='draft_saved',draftSavedAt=datetime.now(timezone.utc).isoformat(),verified=True,images=entries,title=d['title'],description=d['description'],labels=d['labels'],permalink='automatic',permalinkNote='추천 슬러그 저장 후 미유지 확인, 자동 주소로 전환',verification='같은 편집기 재진입 후 본문 원문과 URL 치환 결과 완전 일치; 이미지 ID/URL/순서/alt/캡션 및 잔여 토큰 확인')
    sp.write_text(json.dumps(s,ensure_ascii=False,indent=2),encoding='utf-8')
    (run/f'draft-ready-{order}.json').write_text(json.dumps(s,ensure_ascii=False,indent=2),encoding='utf-8')
    print(order,'verified',len(entries),s['postId'])
