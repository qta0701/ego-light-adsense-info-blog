import fs from 'node:fs/promises';
const base='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113';
for(const [id,k] of [[2,'앱스토어 로그아웃'],[3,'코레일 민원접수'],[4,'테무 회원탈퇴']]){
 const file=base+'/이슈_'+k+'/웹조사/evidence/browser.json';let state=JSON.parse(await fs.readFile(file,'utf8'));
 try {const t=await taskSpace(id);const tabs=await t.tabs(); const result=await t.finish({keep:[]});state={...state,status:'finished',finishMethod:'task.finish({keep:[]})',tabsBeforeFinish:tabs.map(({label,title,url,openedBy})=>({label,title,url,openedBy})),finishResult:result??null};console.log(id,'finished',JSON.stringify(state));}
 catch(e){state={...state,status:'finish_failed',error:String(e)};console.log(id,'failed',String(e));}
 await fs.writeFile(file,JSON.stringify(state,null,2),'utf8');
}
console.log('remaining',JSON.stringify((await listTaskSpaces()).filter(x=>[2,3,4].includes(x.id))));
