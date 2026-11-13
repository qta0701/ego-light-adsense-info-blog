import {capture} from '../../tools/research_browser.mjs';
const t=await taskSpace(10),p=t.page('p2'),f='26_1113/노하우2_배민클럽 환불/웹조사';
console.log(JSON.stringify({els:await p.evaluate(()=>[...document.querySelectorAll('h2,h3,ol')].map(e=>({tag:e.tagName,text:e.innerText.slice(0,200),html:e.outerHTML.slice(0,150)})).slice(0,25))}));
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
let sel=await p.evaluate(()=>{let e=[...document.querySelectorAll('h2,h3')].find(x=>x.innerText.includes('배민클럽 해지 방법'));if(!e)return null;e.id='codex-target';e.scrollIntoView({block:'start'});return '#codex-target'});
try{console.log(JSON.stringify({sel,result:await capture(p,f,'06_secondary_steps',[sel],{width:1280,height:1000})}));}catch(e){console.log(String(e));}
