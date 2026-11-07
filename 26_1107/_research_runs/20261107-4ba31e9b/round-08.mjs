import {capture} from '../../../tools/research_browser.mjs';
import {observePage} from '../../../tools/research_observe.mjs';
const t=await taskSpace(2),p=t.page('p1'),folder='26_1107/앱사용_넷플릭스 오리지널 역대 영화 순위/웹조사';
await p.click('loc=role:option[name="Movies | Non-English"]');
console.log('page',JSON.stringify({url:await p.url(),controls:await p.evaluate(()=>[...document.querySelectorAll('[role="combobox"][data-uia]')].map(e=>({uia:e.dataset.uia,text:e.innerText}))),table:await p.evaluate(()=>document.querySelector('table')?.innerText)}));
console.log('evidence',JSON.stringify(await observePage(p,folder,'non-english',{selector:'table',maxChars:3000,linksLimit:0})));
const vp={width:1100,height:850};await p.evaluate(()=>scrollTo(0,0));console.log('filters',JSON.stringify(await capture(p,folder,'guide-nonenglish-filter',['[data-uia="top10-category-select-selected"]'],vp)));await p.evaluate(()=>document.querySelector('table tbody tr:first-child').scrollIntoView({block:'center',behavior:'instant'}));console.log('table',JSON.stringify(await capture(p,folder,'guide-nonenglish-table',['table tbody tr:first-child'],vp)));
