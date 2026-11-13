import {observePage} from '../../tools/research_observe.mjs';
const task=await takeOverTaskSpace(14);
console.log(JSON.stringify({spaceId:task.spaceId,pages:await task.pages()}));
const p=task.page('p2');
await p.waitForLoadState();
console.log((await p.snapshot()).slice(0,9000));
console.log(JSON.stringify(await observePage(p,'26_1113/은행_재테크_신한은행 간편조회/웹조사','official-1',{maxChars:2500})));
