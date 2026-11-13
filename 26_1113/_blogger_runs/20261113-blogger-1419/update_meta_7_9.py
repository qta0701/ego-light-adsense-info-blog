from pathlib import Path
from datetime import datetime
import json,re
root=Path('Y:/antigravity-project/ego-light-adsense-info-blog');run=root/'26_1113/_blogger_runs/20261113-blogger-1419'
for order in (7,8,9):
 d=json.loads((run/f'published-ready-{order}.json').read_text(encoding='utf8'));folder=root/f"26_1113/노하우2_{d['keyword']}/웹조사";txt=next((folder/'publish').glob('*_제목메타디스크립션.txt'));text=txt.read_text(encoding='utf8');marker='[Blogger 발행 결과 — 2026-11-13]'
 if marker in text: continue
 parts=re.split(r'(삽입 ID:\s*IMG_\d+)',text)
 for i in range(1,len(parts),2):
  ident=re.search(r'IMG_\d+',parts[i]).group();img=next(x for x in d['images'] if x['id']==ident);body=parts[i+1];body,n=re.subn(r'업로드 상태 / Blogger 이미지 URL / 확대 링크(?: URL)?:\s*[^\n]*',f"업로드 상태 / Blogger 이미지 URL / 확대 링크 URL: 업로드 완료 / {img['src']} / 없음",body,count=1);assert n==1,(order,ident);parts[i+1]=body
 text=''.join(parts);marker='[Blogger 발행 결과 — 2026-11-13]';assert marker not in text
 text+=f"\n{marker}\n상태: 공개 발행 및 실제 페이지 검증 완료\nblogId / postId / spaceId: {d['blogId']} / {d['postId']} / {d['spaceId']}\n공개 URL: {d['url']}\n공개 발행 시각: {d['publishedAt']}\n원래 채택 / 실제 업로드 / 대체 / 제외: {d['originalCount']} / {d['uploadedCount']} / 0 / 0\n공개 페이지 메타 설명: 블로그 공통 설명이 출력됨. 편집기에 저장한 글별 검색 설명과 다름.\n확인 시각: {datetime.now().astimezone().isoformat()}\n";txt.write_text(text,encoding='utf8');print(order,txt)
