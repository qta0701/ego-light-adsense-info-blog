import {observePage} from '../../tools/research_observe.mjs';
let t=await taskSpace(10),p=t.page('p1'),f='26_1113/노하우2_배민클럽 환불/웹조사';
await p.goto('https://terms.baemin.com/content/BAEMINCLUB_658');
console.log(JSON.stringify({info:await p.info(),observation:await observePage(p,f,'terms'),snapshot:(await p.snapshot()).slice(0,12000),dom:await p.evaluate(()=>({body:document.body.innerText.slice(0,15000),headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(e=>({tag:e.tagName,text:e.innerText})).slice(0,40)}))}));
