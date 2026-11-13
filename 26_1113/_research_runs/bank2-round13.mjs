import {observePage} from '../../tools/research_observe.mjs';
const t=await taskSpace(15),p=t.page('p1');
const r=await p.click('loc=css:a:has-text("휴일에도 OK! 가장 편리한 환전 장소와 방법 총정리")');
const q=r.popups?.length?t.page(r.popups[0].label):p;
await q.waitForLoadState();
console.log((await q.snapshot()).slice(0,7000));
console.log(JSON.stringify(await observePage(q,'26_1113/은행_재테크_신한은행 환전 방법/웹조사','official-3',{maxChars:6000})));
