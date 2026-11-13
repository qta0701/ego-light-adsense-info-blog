import fs from 'node:fs/promises';
const results=[];
for(const id of [11,12,13]){
 try {const task=await taskSpace(id); await task.finish({keep:[]}); results.push({spaceId:id,status:'finished'});}
 catch(e){results.push({spaceId:id,status:'error',error:String(e.message)});}
}
await fs.writeFile('Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_research_runs/bank-1-finish-result.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results));
