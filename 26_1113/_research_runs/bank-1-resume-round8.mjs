import {capture} from '../../tools/research_browser.mjs';
import fs from 'node:fs/promises';
const root='Y:/antigravity-project/ego-light-adsense-info-blog/';
const t12=await taskSpace(12),p12=t12.page('p2'),f12='26_1113/은행_재테크_국민은행 환전신청/웹조사';
const data=await p12.evaluate(()=>({url:location.href,text:document.body.innerText}));await fs.writeFile(root+f12+'/evidence/nonlogin.txt',JSON.stringify(data,null,2));console.log('12',JSON.stringify(data).slice(0,8500));
console.log('CAP',JSON.stringify(await capture(p12,f12,'08_nonlogin',[],{width:1440,height:900})));
const t11=await taskSpace(11),p11=t11.page('p4');console.log((await p11.snapshot()).slice(0,6500));await p11.click('text="환전"');console.log('11after',(await p11.snapshot({scope:'full_page'})).slice(0,10000));
const t13=await taskSpace(13),s=t13.page('p1');console.log('13click',JSON.stringify(await s.click('a:has(h3) >> nth=2')));console.log('13tabs',JSON.stringify((await t13.tabs()).map(({label,url,title})=>({label,url,title}))));
