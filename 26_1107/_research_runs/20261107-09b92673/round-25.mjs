import {observePage} from '../../../tools/research_observe.mjs';
const t=await taskSpace(2),p=t.page('p1');await p.goto('https://www.netflix.com/tudum/articles/kpop-demon-hunters-most-popular-netflix-film');
console.log(JSON.stringify(await observePage(p,'26_1107/앱사용_11월 넷플릭스 오리지널 순위/웹조사','kpop-popular',{selector:'body',maxChars:3500,linksLimit:4})));
