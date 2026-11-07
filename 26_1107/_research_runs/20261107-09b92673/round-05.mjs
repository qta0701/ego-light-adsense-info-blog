import {observePage} from '../../../tools/research_observe.mjs';
const t1=await taskSpace(1),t2=await taskSpace(2),t3=await taskSpace(3);
const p1=t1.page('p1'),p2=t2.page('p1'),p3=t3.page('p1');
console.log('links1',JSON.stringify(await p1.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>/methodology|more details|ultimate|eyes|boss/i.test(a.innerText)).map(a=>({text:a.innerText,href:a.href})).slice(0,20))));
console.log('links2',JSON.stringify(await p2.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>/methodology|more details|animals|kpop/i.test(a.innerText)).map(a=>({text:a.innerText,href:a.href})).slice(0,20))));
await p3.goto('https://help.netflix.com/ko/node/109172');
console.log('errors',JSON.stringify(await observePage(p3,'26_1107/앱사용_넷플릭스 성인인증 방법/웹조사','errors',{selector:'body',maxChars:4500,linksLimit:10})));
