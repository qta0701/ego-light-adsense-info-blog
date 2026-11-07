import {observePage} from '../../../tools/research_observe.mjs';
const t=await taskSpace(1),p=t.page('p1');await p.goto('https://www.netflix.com/kr/title/81949585');console.log(JSON.stringify(await observePage(p,'26_1107/앱사용_11월 넷플릭스 한국영화 순위/웹조사','ultimate-duo',{selector:'body',maxChars:2000,linksLimit:4})));
