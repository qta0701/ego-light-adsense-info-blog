import {observePage} from '../../../tools/research_observe.mjs';
const t=await taskSpace(2),p=t.page('p1');await p.goto('https://www.netflix.com/tudum/top10');await p.click('loc=role:button[name="More Details"]');
console.log(JSON.stringify(await observePage(p,'26_1107/앱사용_11월 넷플릭스 오리지널 순위/웹조사','methodology',{selector:'body',maxChars:5000,linksLimit:5})));
