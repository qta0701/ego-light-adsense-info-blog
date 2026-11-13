import {capture} from '../../tools/research_browser.mjs';
const t=await taskSpace(10),p=t.page('p1'),f='26_1113/노하우2_배민클럽 환불/웹조사';
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1100,height:900,deviceScaleFactor:1,mobile:false});
console.log(JSON.stringify({targets:await p.evaluate(()=>[...document.querySelectorAll('li')].filter(e=>e.textContent.includes('멤버십 회원은 회사에게 통지함')||e.textContent.includes('결제일의 익일부터')||e.textContent.includes('요건을 충족하지 않는')||e.textContent.includes('장기 구독상품')||e.textContent.includes('프로모션 등 비정기적인 혜택을 제공')).map(e=>({text:e.innerText,tag:e.tagName,html:e.outerHTML.slice(0,180)})))}));
for(const [name,needle] of [['01_refund','결제일의 익일부터 7일'],['02_cancel','위 제2항의 요건을 충족하지 않는'],['03_long','장기 구독상품의 경우'],['04_promo','프로모션 등 비정기적인 혜택을 제공하는 경우의 청약철회']]){
 try {let sel=await p.evaluate(n=>{let e=[...document.querySelectorAll('li')].find(x=>x.textContent.includes(n));if(!e)return null;e.id='codex-target';e.scrollIntoView({block:'center'});return '#codex-target'},needle);console.log(JSON.stringify({name,sel,result:await capture(p,f,name,[sel],{width:1100,height:900})}));}catch(e){console.log(JSON.stringify({name,error:String(e)}));}
 await p.evaluate(()=>document.querySelector('#codex-target')?.removeAttribute('id'));
}
await p.goto('https://www.google.com/search?q='+encodeURIComponent('site:terms.baemin.com 배민클럽 이용약관'));
console.log(JSON.stringify({search:await p.evaluate(()=>({text:document.body.innerText.slice(0,3500),links:[...document.querySelectorAll('a:has(h3)')].slice(0,8).map(a=>({title:a.innerText,url:a.href,id:a.querySelector('h3').id}))}))}));
