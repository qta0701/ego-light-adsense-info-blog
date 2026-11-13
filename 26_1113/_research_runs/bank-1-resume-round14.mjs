import {capture} from '../../tools/research_browser.mjs';
import fs from 'node:fs/promises';
const t=await taskSpace(13),p=t.page('p2'),g=t.page('p4'),f='26_1113/은행_재테크_국민은행 통장사본 출력/웹조사';
console.log('menu target',await p.evaluate(()=>{let e=[...document.querySelectorAll('a')].find(x=>x.textContent.trim()==='통장사본');e.setAttribute('data-shot','yes');e.scrollIntoView({block:'center'});return e.outerHTML;}));
console.log('CAP',JSON.stringify(await capture(p,f,'03_menu',['[data-shot="yes"]'],{width:1440,height:900})));
const d=await g.evaluate(()=>({url:location.href,title:document.title,text:document.body.innerText}));await fs.writeFile('Y:/antigravity-project/ego-light-adsense-info-blog/'+f+'/evidence/stm.json',JSON.stringify(d,null,2));console.log('STM',JSON.stringify(d).slice(0,7000));
console.log('target',await g.evaluate(()=>{let e=[...document.querySelectorAll('tr')].find(x=>x.innerText.includes('통장 사본 출력'));if(!e)return null;e.setAttribute('data-shot','yes');e.scrollIntoView({block:'center'});return e.innerText.slice(0,300)}));
try{console.log('CAPSTM',JSON.stringify(await capture(g,f,'04_stm',['[data-shot="yes"]'],{width:1440,height:900})));}catch(e){console.log('error',String(e.message));}
