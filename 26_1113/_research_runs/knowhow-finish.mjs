import fs from 'node:fs/promises';
const results=[];
for(const id of [5,6,7]){
 try{const t=await taskSpace(id);console.log('before',id,JSON.stringify(await t.tabs()));const result=await t.finish({keep:[]});results.push({id,result});console.log('finish',id,JSON.stringify(result));}catch(e){results.push({id,error:String(e)});console.log('finish-error',id,String(e));}
}
console.log('remaining',JSON.stringify(await listTaskSpaces()));
await fs.writeFile('Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_research_runs/knowhow-finish-result.json',JSON.stringify(results,null,2),'utf8');
