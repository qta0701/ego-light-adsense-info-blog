import {capture} from '../../../tools/research_browser.mjs';
import fs from 'node:fs/promises';
const jobs=[
 {id:3,folder:'26_1106/앱사용_코레일 승차권 전달/웹조사',query:'코레일 승차권 전달',selector:'a[jsname="UWckNb"][href*="nttNo=27005"]'},
 {id:4,folder:'26_1106/앱사용_당근마켓 채팅 걸기/웹조사',query:'당근마켓 채팅 걸기',selector:'a[jsname="UWckNb"][href="https://www.daangn.com/wv/faqs/24"]'}
];
await Promise.all(jobs.map(async j=>{const p=(await taskSpace(j.id)).page('p1');await p.goto('https://www.google.com/search?q='+encodeURIComponent(j.query));console.log(JSON.stringify({id:j.id,candidates:await p.evaluate(()=>[...document.querySelectorAll('a[jsname="UWckNb"]')].filter(a=>a.querySelector('h3')).map(a=>({title:a.innerText.slice(0,100),url:a.href})).slice(0,6))}));}));
const results=[];
for(const j of jobs){try{const p=(await taskSpace(j.id)).page('p1');await p.cdp('Emulation.setDeviceMetricsOverride',{width:1100,height:900,deviceScaleFactor:1,mobile:false});await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),j.selector);const result=await capture(p,j.folder,'01_search',[j.selector],{width:1100,height:900});results.push({id:j.id,query:j.query,...result});console.log(JSON.stringify(results.at(-1)));}catch(e){console.log(JSON.stringify({id:j.id,error:String(e)}));}}
await fs.writeFile(new URL('zoom-validation.json',import.meta.url),JSON.stringify(results,null,2));
