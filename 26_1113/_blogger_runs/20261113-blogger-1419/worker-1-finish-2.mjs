const fs=await import('node:fs/promises');const run='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
const record=JSON.parse(await fs.readFile(`${run}/sheet-recorded-2.json`,'utf8'));if(record.postId!=='6033282310404400433')throw Error('sheet record mismatch');
const task=await taskSpace(37);await task.finish({keep:[]});const endedAt=new Date().toISOString();
await fs.writeFile(`${run}/space-finished-2.json`,JSON.stringify({order:2,spaceId:37,endedAt},null,2),'utf8');console.log(JSON.stringify({order:2,spaceId:37,endedAt}));
