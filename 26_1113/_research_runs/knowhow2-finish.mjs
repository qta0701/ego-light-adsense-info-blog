import fs from 'node:fs/promises';
const base='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113';
let result=[];
for(const [id,key] of [[8,'진학어플라이 회원가입'],[9,'인스타그램 탈퇴방법'],[10,'배민클럽 환불']]){
 try{let task=await taskSpace(id);await task.finish({keep:[]});result.push({id,key,status:'finished'});}catch(e){result.push({id,key,status:'error',error:String(e)});}
}
await fs.writeFile(`${base}/_research_runs/knowhow2-finish-result.json`,JSON.stringify(result,null,2),'utf8');
console.log(JSON.stringify({result,spaces:await listTaskSpaces()}));
