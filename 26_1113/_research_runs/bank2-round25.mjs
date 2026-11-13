const fs=await import('node:fs/promises');
const file='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_research_runs/bank-2-manifest.json';
const m=JSON.parse(await fs.readFile(file,'utf8'));
for(const row of m.rows){
 const t=await taskSpace(row.spaceId);await t.finish({keep:[]});
 row.spaceCleanup='finished via SDK';
 await fs.writeFile(file,JSON.stringify(m,null,2)+'\n','utf8');
 console.log(JSON.stringify({row:row.row,spaceId:row.spaceId,finished:true}));
}
m.spaceCleanup='all three finished via SDK after agent review';
await fs.writeFile(file,JSON.stringify(m,null,2)+'\n','utf8');
