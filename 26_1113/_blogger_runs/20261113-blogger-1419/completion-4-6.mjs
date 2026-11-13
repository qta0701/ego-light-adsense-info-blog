const fs=await import('node:fs/promises'),base='Y:/antigravity-project/ego-light-adsense-info-blog',run=`${base}/26_1113/_blogger_runs/20261113-blogger-1419`,rows=[];
for(const [order,name] of [[4,'노하우_앱스토어 국가변경'],[5,'노하우_코레일 승차권 조회'],[6,'노하우_모바일 티머니 환불']]){
 const p=`${base}/26_1113/${name}/웹조사/evidence/blogger-state.json`,s=JSON.parse(await fs.readFile(p,'utf8')),info=JSON.parse(await fs.readFile(`${run}/images-${order}.json`,'utf8'));
 s.claimRelease={released:true,recordedAt:new Date().toISOString(),evidence:'release command returned released: true once'};await fs.writeFile(p,JSON.stringify(s,null,2));
 await fs.appendFile(info.txtPath,`\n[Blogger 공개 완료]\n실제 URL: ${s.publicUrl}\n발행 관찰 시각: ${s.publishedAt}\nG/H/L 재조회: ${s.sheet.G} / ${s.sheet.H} / ${s.sheet.L}\nSpace ${s.spaceId}: ${s.startedAt} ~ ${s.spaceEndedAt}\n`);
 rows.push({order,tab:s.tab,row:s.row,keyword:s.keyword,status:s.stage,postId:s.postId,url:s.publicUrl,publishedAt:s.publishedAt,originalCount:s.originalCount,uploadedCount:s.images.length,substitutedCount:0,excludedCount:0,spaceId:s.spaceId,startedAt:s.startedAt,endedAt:s.spaceEndedAt,sheet:s.sheet,claimReleased:true});
}
await fs.writeFile(`${run}/completion-4-6.json`,JSON.stringify({runId:'20261113-blogger-1419',completedAt:new Date().toISOString(),rows},null,2));console.log(JSON.stringify(rows));
