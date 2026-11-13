const fs=await import('node:fs/promises');
const base='Y:/antigravity-project/ego-light-adsense-info-blog', run=`${base}/26_1113/_blogger_runs/20261113-blogger-1419`;
for(const [order,row,keyword] of [[4,34,'앱스토어 국가변경'],[5,35,'코레일 승차권 조회'],[6,36,'모바일 티머니 환불']]) {
 const info=JSON.parse(await fs.readFile(`${run}/images-${order}.json`,'utf8')), space=JSON.parse(await fs.readFile(`${run}/space-${order}.json`,'utf8')), dup=JSON.parse(await fs.readFile(`${run}/duplicate-${order}.json`,'utf8'));
 if(info.images.some(x=>!x.file || !x.rawExists || !x.htmlSlot || x.tokenCount!==1)||!dup.snapshot.includes('게시물 없음')) throw Error(`Unresolved validation ${order}`);
 const state={runId:'20261113-blogger-1419',order,tab:'노하우',row,keyword,blogId:'1872124715220437079',spaceId:space.spaceId,startedAt:space.startedAt,postId:null,images:info.images.map(({id,path,raw,alt,caption})=>({id,path,raw,alt,caption,url:null})),originalCount:info.originalCount,stage:'ready-create',duplicateCheckedAt:dup.at,updatedAt:new Date().toISOString()};
 await fs.writeFile(`${base}/26_1113/${info.name}/웹조사/blogger-state.json`,JSON.stringify(state,null,2));
 await fs.writeFile(`${run}/ready-create-${order}.json`,JSON.stringify({...state,duplicateEvidence:`duplicate-${order}.json`,imageEvidence:`images-${order}.json`},null,2));
 console.log(JSON.stringify({order,spaceId:space.spaceId,count:info.originalCount,readyAt:state.updatedAt}));
}
