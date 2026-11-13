import {capture} from '../../tools/research_browser.mjs';
import fs from 'node:fs/promises';
const entries=[[8,'진학어플라이 회원가입','회원가입 | 진학어플라이(공통)'],[9,'인스타그램 탈퇴방법','Instagram 프로필을 영구적으로 삭제하거나 비활성화하기']];
for(const [id,key,title] of entries){
 const task=await taskSpace(id),p=task.page('p1'),folder=`26_1113/노하우2_${key}/웹조사`;
 try{
   const selector=await p.evaluate(t=>{let e=[...document.querySelectorAll('h3')].find(x=>x.textContent.includes(t));return e?'#'+CSS.escape(e.id):null},title);
   console.log(JSON.stringify({id,selector,capture:await capture(p,folder,'01_search',[selector],{width:1280,height:900})}));
   const receipt=await p.click(`text="${title}"`);
   console.log(JSON.stringify({id,receipt,tabs:await task.tabs()}));
 }catch(e){console.log(JSON.stringify({id,error:String(e)}));}
}
const t=await taskSpace(10), p=t.page('p1');
await p.goto('https://www.google.com/search?q='+encodeURIComponent('배민클럽 이용약관 환불 우아한형제들'));
console.log(JSON.stringify({id:10,snapshot:await p.snapshot(),links:await p.evaluate(()=>Array.from(document.querySelectorAll('a:has(h3)')).slice(0,8).map(a=>({title:a.innerText,url:a.href})))}));
