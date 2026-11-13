import {capture} from '../../tools/research_browser.mjs';
import {observePage} from '../../tools/research_observe.mjs';
const t=await taskSpace(10),p=t.page('p1'),f='26_1113/노하우2_배민클럽 환불/웹조사';
await p.goto('https://www.google.com/search?q='+encodeURIComponent('배달의민족 공식 홈페이지 배민클럽'));
console.log(JSON.stringify({links:await p.evaluate(()=>[...document.querySelectorAll('a:has(h3)')].slice(0,8).map(a=>({title:a.innerText,id:a.querySelector('h3').id})))}));
let sel=await p.evaluate(()=>{let h=[...document.querySelectorAll('h3')].find(x=>x.textContent.includes('배달의민족'));return h?'#'+CSS.escape(h.id):null});
try{console.log(JSON.stringify({sel,capture:await capture(p,f,'05_search',[sel],{width:1280,height:900})}));let r=await p.click('loc=css:'+sel);console.log(JSON.stringify({r,tabs:await t.tabs()}));}catch(e){console.log(JSON.stringify({error:String(e)}));}
