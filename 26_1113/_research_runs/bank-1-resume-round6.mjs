import fs from 'node:fs/promises';
const root='Y:/antigravity-project/ego-light-adsense-info-blog/';
for(const [id,label,folder] of [[11,'p4','26_1113/은행_재테크_부산은행 환전/웹조사'],[12,'p2','26_1113/은행_재테크_국민은행 환전신청/웹조사'],[13,'p2','26_1113/은행_재테크_국민은행 통장사본 출력/웹조사']]){
 const t=await taskSpace(id),p=t.page(label);const data=await p.evaluate(()=>({url:location.href,title:document.title,text:document.body.innerText.slice(0,20000)}));await fs.writeFile(root+folder+'/evidence/resume-page.json',JSON.stringify(data,null,2));console.log(id,JSON.stringify(data).slice(0,12000));console.log('info',JSON.stringify(await p.info()));
}
