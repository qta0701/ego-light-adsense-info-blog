import {observePage} from '../../../tools/research_observe.mjs';
const t=await takeOverTaskSpace(1),p=t.userPage();console.log('resume',JSON.stringify({spaceId:t.spaceId,url:await p.url(),title:await p.title()}));
console.log('genre',JSON.stringify(await observePage(p,'26_1107/앱사용_11월 넷플릭스 한국영화 순위/웹조사','korean-films',{selector:'body',maxChars:2500,linksLimit:5})));
const t3=await taskSpace(3),p3=t3.page('p1');console.log('verify',JSON.stringify(await p3.evaluate(()=>({inputs:[...document.querySelectorAll('input:not([type=hidden])')].map(e=>({type:e.type,filled:!!e.value&&e.type!=='radio',checked:e.checked})),heads:[...document.querySelectorAll('h1')].map(e=>e.outerHTML)}))));
