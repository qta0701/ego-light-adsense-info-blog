import {capture} from '../../tools/research_browser.mjs';
const t=await taskSpace(14),p=t.page('p2'); await p.click('@51');
console.log((await p.snapshot()).slice(0,6000));
console.log(JSON.stringify(await capture(p,'26_1113/은행_재테크_신한은행 간편조회/웹조사','05_other',[],{width:1280,height:900})));
