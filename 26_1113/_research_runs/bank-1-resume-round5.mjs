import {capture} from '../../tools/research_browser.mjs';
const f='26_1113/은행_재테크_국민은행 환전신청/웹조사';
const t=await taskSpace(12),g=t.page('p3');
for(const [name,needle] of [['03_eligibility','환전 대상고객'],['04_payment','결제 방법'],['05_pickup','수령희망일'],['06_caution','거래 유의사항']]){
 let x=await g.evaluate((needle)=>{let h=[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].find(e=>e.textContent.trim()===needle);if(!h)return null; document.querySelectorAll('[data-shot-target]').forEach(e=>e.removeAttribute('data-shot-target'));let n=h.nextElementSibling;if(!n)n=h; n.setAttribute('data-shot-target','yes');h.scrollIntoView({block:'start'});return {tag:n.tagName,text:n.innerText.slice(0,200)};},needle);
 console.log(name,x);try{console.log(JSON.stringify(await capture(g,f,name,['[data-shot-target="yes"]'],{width:1200,height:900})));}catch(e){console.log('CAPERROR',name,String(e.message));}
}
const p=t.page('p2'); console.log('apply',JSON.stringify(await p.click('[data-shot="branch"] button >> nth=0')));console.log('APPLYSNAP',(await p.snapshot({scope:'full_page'})).slice(0,11000));console.log('TABS',JSON.stringify((await t.tabs()).map(({label,url,title})=>({label,url,title}))));
const t11=await taskSpace(11), s=t11.page('p1');
console.log('11CLICK',JSON.stringify(await s.click('a:has(h3) >> nth=1')));console.log('11TABS',JSON.stringify((await t11.tabs()).map(({label,url,title})=>({label,url,title}))));
