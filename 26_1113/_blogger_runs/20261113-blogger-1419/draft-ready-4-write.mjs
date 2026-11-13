const fs=await import('node:fs/promises'),base='Y:/antigravity-project/ego-light-adsense-info-blog',run=`${base}/26_1113/_blogger_runs/20261113-blogger-1419`,p=`${base}/26_1113/노하우_앱스토어 국가변경/웹조사/evidence/blogger-state.json`;
const s=JSON.parse(await fs.readFile(p,'utf8')),v=JSON.parse(await fs.readFile(`${run}/verify-draft-4.json`,'utf8')),info=JSON.parse(await fs.readFile(`${run}/images-4.json`,'utf8'));
if(!v.htmlEqual||v.tokens||v.images.length!==s.originalCount||v.title!==s.metadata.title||v.description!==s.metadata.description||v.images.some((x,i)=>x.id!==s.images[i].id||x.src!==s.images[i].url||x.alt!==s.images[i].alt||x.caption!==s.images[i].caption))throw Error('Draft mismatch');
s.stage='draft_saved';s.savedAt=v.at;s.verification=`${run}/verify-draft-4.json`;await fs.writeFile(p,JSON.stringify(s,null,2));
const addition=`\n\n[Blogger 업로드 결과 2026-11-13]\npostId: ${s.postId}\n${s.images.map(x=>`${x.id}: ${x.url}`).join('\n')}\n검증: 저장 후 동일 편집기 재진입, 본문·메타·이미지 순서와 alt·캡션 확인 ${v.at}\n`;await fs.appendFile(info.txtPath,addition);
await fs.writeFile(`${run}/draft-ready-4.json`,JSON.stringify({...v,blogId:s.blogId,tab:s.tab,row:s.row,keyword:s.keyword,originalCount:s.originalCount,uploadedCount:s.images.length,replacements:0,excluded:0,savedAt:v.at},null,2));
console.log(JSON.stringify({order:4,postId:s.postId,savedAt:s.savedAt,count:s.images.length}));
