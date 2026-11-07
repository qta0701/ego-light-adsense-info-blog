import {observePage} from '../../../tools/research_observe.mjs';
const t=await taskSpace(3),p=t.page('p1');
await p.goto('https://help.netflix.com/ko/node/114276');
console.log(JSON.stringify(await observePage(p,'26_1107/앱사용_넷플릭스 성인인증 방법/웹조사','profile',{selector:'body',maxChars:2500,linksLimit:5})));
