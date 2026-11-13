import fs from 'node:fs/promises';
const root='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113';
for (const [id,key] of [[8,'진학어플라이 회원가입'],[9,'인스타그램 탈퇴방법'],[10,'배민클럽 환불']]) {
 const task=await taskSpace(id), p=task.page('p1');
 console.log(JSON.stringify({id,key,info:await p.info(), links:await p.evaluate(()=>Array.from(document.querySelectorAll('a:has(h3)')).slice(0,8).map((a,i)=>({i,html:a.outerHTML.slice(0,700),rect:(()=>{let r=a.getBoundingClientRect();return [r.x,r.y,r.width,r.height]})()})))}));
}
