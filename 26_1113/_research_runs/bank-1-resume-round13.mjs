import {capture} from '../../tools/research_browser.mjs';
import fs from 'node:fs/promises';
const root='Y:/antigravity-project/ego-light-adsense-info-blog/',t=await taskSpace(13),s=t.page('p1'),f='26_1113/은행_재테크_국민은행 통장사본 출력/웹조사';
console.log('click stm',JSON.stringify(await s.click('a:has(h3) >> nth=0')));console.log('tabs',JSON.stringify((await t.tabs()).map(({label,url,title})=>({label,url,title}))));
const p=t.page('p2');await p.goto('https://obank.kbstar.com/quics?page=C016535');console.log('menu',JSON.stringify(await p.evaluate(()=>({url:location.href,text:document.body.innerText.slice(0,10000)}))));console.log('snap',(await p.snapshot({scope:'full_page'})).slice(0,13000));
