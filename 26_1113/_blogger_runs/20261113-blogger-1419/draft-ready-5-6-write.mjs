const fs=await import('node:fs/promises'),base='Y:/antigravity-project/ego-light-adsense-info-blog',run=`${base}/26_1113/_blogger_runs/20261113-blogger-1419`;
for(const [order,name] of [[5,'노하우_코레일 승차권 조회'],[6,'노하우_모바일 티머니 환불']]){
 const p=`${base}/26_1113/${name}/웹조사/evidence/blogger-state.json`,s=JSON.parse(await fs.readFile(p,'utf8')),v=JSON.parse(await fs.readFile(`${run}/verify-draft-${order}.json`,'utf8')),info=JSON.parse(await fs.readFile(`${run}/images-${order}.json`,'utf8'));
 const normLabels=x=>x.split(',').map(x=>x.trim()).filter(Boolean).sort().join('|');
 if(!v.htmlEqual||v.tokens||v.images.length!==s.originalCount||v.title!==s.metadata.title||v.description!==s.metadata.description||normLabels(v.labels)!==normLabels(s.metadata.labels)||v.images.some((x,i)=>x.id!==s.images[i].id||x.src!==s.images[i].url||x.alt!==s.images[i].alt||x.caption!==s.images[i].caption)||v.permalink.auto!=='true')throw Error(`Draft mismatch ${order}`);
 s.stage='draft_saved';s.savedAt=v.at;s.permalinkResult='automatic; recommended custom value was not retained';s.verification=`${run}/verify-draft-${order}.json`;await fs.writeFile(p,JSON.stringify(s,null,2));
 await fs.appendFile(info.txtPath,`\n\n[Blogger 업로드 결과 2026-11-13]\npostId: ${s.postId}\n${s.images.map(x=>`${x.id}: ${x.url}`).join('\n')}\n퍼머링크: 추천 맞춤 값이 저장 후 유지되지 않아 자동 주소 사용\n검증: 동일 편집기 재진입, 본문·메타·이미지 순서와 alt·캡션 확인 ${v.at}\n`);
 await fs.writeFile(`${run}/draft-ready-${order}.json`,JSON.stringify({...v,blogId:s.blogId,tab:s.tab,row:s.row,keyword:s.keyword,originalCount:s.originalCount,uploadedCount:s.images.length,replacements:0,excluded:0,savedAt:v.at},null,2));console.log(JSON.stringify({order,postId:s.postId,savedAt:s.savedAt,count:s.images.length}));
}
