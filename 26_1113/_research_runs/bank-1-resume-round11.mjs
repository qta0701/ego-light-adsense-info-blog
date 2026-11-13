import {capture} from '../../tools/research_browser.mjs';
import fs from 'node:fs/promises';
const root='Y:/antigravity-project/ego-light-adsense-info-blog/';
const t=await taskSpace(11),p=t.page('p4'),f='26_1113/은행_재테크_부산은행 환전/웹조사';
let d=await p.evaluate(()=>({url:location.href,title:document.title,text:document.body.innerText}));await fs.writeFile(root+f+'/evidence/one-official.json',JSON.stringify(d,null,2));
console.log('headings',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(e=>({tag:e.tagName,text:e.innerText.trim(),next:e.nextElementSibling?.tagName})).filter(x=>x.text))));
for(const [name,needle] of [['02_intro','ONE 환전'],['03_target','이용대상'],['04_limits','환전 가능 한도'],['05_pickup','환전 수령 방법 ( 환전수령, 현찰배달, 금고보관 )']]){
 const result=await p.evaluate(needle=>{let e=[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].find(x=>x.innerText.trim()===needle);if(!e)return null;document.querySelectorAll('[data-cap]').forEach(x=>x.removeAttribute('data-cap'));let n=e.nextElementSibling||e;if(n.getBoundingClientRect().height>500)n=e;e.scrollIntoView({block:'center'});n.setAttribute('data-cap','yes');return {text:e.innerText,tag:n.tagName,nt:n.innerText.slice(0,200)};},needle);
 console.log(name,JSON.stringify(result));if(result)try{console.log(JSON.stringify(await capture(p,f,name,['[data-cap="yes"]'],{width:1440,height:900})));}catch(e){console.log('CAPERR',String(e.message));}
}
const s=t.page('p1');await s.goto('https://www.google.com/search?q='+encodeURIComponent('부산은행 ONE환전 환전 금고 이용안내 site:busanbank.co.kr'));
console.log('SEARCH',JSON.stringify(await s.evaluate(()=>({text:document.body.innerText.slice(0,3500),results:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,6).map(a=>a.innerText)}))));
