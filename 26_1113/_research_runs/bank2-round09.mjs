import {observePage} from '../../tools/research_observe.mjs';
const t=await taskSpace(14),p=t.page('p2');
await p.click('@14');
console.log((await p.snapshot()).slice(0,5500));
await p.click('loc=css:a:has-text("계좌조회") >> nth=0');
console.log((await p.snapshot()).slice(0,8000));
console.log(JSON.stringify(await observePage(p,'26_1113/은행_재테크_신한은행 간편조회/웹조사','official-2',{maxChars:2500})));
