import {capture} from '../../tools/research_browser.mjs';
import fs from 'node:fs/promises';
const root='Y:/antigravity-project/ego-light-adsense-info-blog/';
const t12=await taskSpace(12), p12=t12.page('p3'), f12='26_1113/은행_재테크_국민은행 환전신청/웹조사';
const info=await p12.evaluate(()=>({url:location.href,title:document.title,text:document.body.innerText}));
await fs.writeFile(root+f12+'/evidence/guide.txt',JSON.stringify(info,null,2));
console.log('12GUIDE',JSON.stringify(info).slice(0,15000));
console.log('12SNAP', (await p12.snapshot({scope:'full_page'})).slice(0,13000));
const t13=await taskSpace(13), p13=t13.page('p2'), f13='26_1113/은행_재테크_국민은행 통장사본 출력/웹조사';
console.log('13CAP',JSON.stringify(await capture(p13,f13,'02_login',[],{width:1440,height:900})));
for(const [id,query] of [[11,'부산은행 환전 서비스 이용안내 site:busanbank.co.kr'],[13,'site:kbstar.com 통장사본 출력 뱅킹관리 제증명발급']]){
 const t=await taskSpace(id), p=t.page('p1'); await p.goto('https://www.google.com/search?q='+encodeURIComponent(query));
 console.log('SEARCH',id,JSON.stringify(await p.evaluate(()=>({url:location.href,text:document.body.innerText.slice(0,5000),results:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,8).map(a=>({text:a.innerText,href:a.href}))}))));
}
