import {capture} from '../../../tools/research_browser.mjs';
import {observePage} from '../../../tools/research_observe.mjs';
const t=await taskSpace(6),p=t.page('p1'),folder='26_1107/앱사용_11월 넷플릭스 드라마 순위/웹조사';
const s='a[href="https://about.netflix.com/ko/news/top-10-week-of-november-28-two-snaps-for-wednesday-as-the-series-enters-the"]:has(h3)';
await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),s);
console.log('CAP',JSON.stringify(await capture(p,folder,'10-original-search',[s],{width:1280,height:900})));
await p.goto('https://about.netflix.com/ko/news/top-10-week-of-november-28-two-snaps-for-wednesday-as-the-series-enters-the');
console.log('HISTORIC',JSON.stringify(await observePage(p,folder,'historic-official',{maxChars:2200})));
