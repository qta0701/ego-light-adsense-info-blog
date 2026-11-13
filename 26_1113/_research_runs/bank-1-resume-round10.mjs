import {capture} from '../../tools/research_browser.mjs';
import fs from 'node:fs/promises';
const t=await taskSpace(11),p=t.page('p4'),folder='26_1113/은행_재테크_부산은행 환전/웹조사';
await p.click('text="ONE환전"');let d=await p.evaluate(()=>({url:location.href,title:document.title,text:document.body.innerText}));await fs.writeFile('Y:/antigravity-project/ego-light-adsense-info-blog/'+folder+'/evidence/one.json',JSON.stringify(d,null,2));console.log('ONE',JSON.stringify(d).slice(0,14000));console.log('snap',(await p.snapshot({scope:'full_page'})).slice(0,9000));
