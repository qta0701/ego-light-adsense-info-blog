import {capture} from '../../tools/research_browser.mjs';
import {observePage} from '../../tools/research_observe.mjs';
let t=await taskSpace(8),p=t.page('p3'),f='26_1113/노하우2_진학어플라이 회원가입/웹조사';
console.log(JSON.stringify({id:8,images:await p.evaluate(()=>[...document.images].map((x,i)=>({i,alt:x.alt,src:x.currentSrc,html:x.outerHTML.slice(0,400)})))}));
try{console.log(JSON.stringify({id:8,capture:await capture(p,f,'02_signup',['h2 img'],{width:1280,height:1000})}));}catch(e){console.log(JSON.stringify({id:8,error:String(e)}));}
await p.goto('https://apply.jinhakapply.com/Customer/Guide/Join/1');
console.log(JSON.stringify({id:8,info:await p.info(),observation:await observePage(p,f,'guide'),dom:await p.evaluate(()=>({headings:[...document.querySelectorAll('h1,h2,h3,h4')].map((e,i)=>({i,text:e.innerText,html:e.outerHTML.slice(0,250)})),images:[...document.images].map((e,i)=>({i,alt:e.alt,src:e.currentSrc})).slice(0,20)}))}));
t=await taskSpace(9);p=t.page('p2');f='26_1113/노하우2_인스타그램 탈퇴방법/웹조사';
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
for(const [name,index] of [['02_export',0],['03_manage',1],['04_account',2],['05_wait',3]]){
 try {
  const sel=await p.evaluate(i=>{let items=[document.querySelectorAll('main h2')[0],document.querySelectorAll('main ol')[0],document.querySelectorAll('main ol')[1],[...document.querySelectorAll('main div')].find(x=>x.textContent.startsWith('프로필 삭제 요청 후 30일')&&x.textContent.length<450)];let e=items[i];if(!e)return null;e.id='codex-capture-target';e.scrollIntoView({block:'center'});return '#codex-capture-target'},index);
  console.log(JSON.stringify({id:9,name,sel,capture:await capture(p,f,name,[sel],{width:1280,height:900})}));
  await p.evaluate(()=>{document.querySelector('#codex-capture-target')?.removeAttribute('id')});
 }catch(e){console.log(JSON.stringify({id:9,name,error:String(e)}));await p.evaluate(()=>document.querySelector('#codex-capture-target')?.removeAttribute('id'));}
}
