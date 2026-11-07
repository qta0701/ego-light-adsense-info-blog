import {capture} from '../../../tools/research_browser.mjs';
const jobs=[{id:1,folder:'26_1107/앱사용_11월 넷플릭스 한국영화 순위/웹조사'},{id:2,folder:'26_1107/앱사용_11월 넷플릭스 오리지널 순위/웹조사'}];
const vp={width:1100,height:850},country='[data-uia="top10-country-select-selected"]',category='[data-uia="top10-category-select-selected"]',week='[data-uia="top10-filters-week-select-selected"]';
for(const j of jobs){
 const t=await taskSpace(j.id),p=t.page('p1');
 await p.cdp('Emulation.setDeviceMetricsOverride',{...vp,deviceScaleFactor:1,mobile:false});
 await p.evaluate(()=>scrollTo(0,0));
 console.log(j.id,'filters',JSON.stringify(await capture(p,j.folder,'guide-filters',[country,category],vp)));
 await p.click(category); await p.waitForFunction(s=>document.querySelector(s)?.getAttribute('aria-expanded')==='true',category);
 console.log(j.id,'category',JSON.stringify(await capture(p,j.folder,'guide-category',[category],vp)));
 await p.click(category);
 await p.click(week); await p.waitForFunction(s=>document.querySelector(s)?.getAttribute('aria-expanded')==='true',week);
 console.log(j.id,'week',JSON.stringify(await capture(p,j.folder,'guide-week',[week],vp)));
 await p.click(week);
 await p.evaluate(()=>document.querySelector('table tbody tr:first-child').scrollIntoView({block:'center',behavior:'instant'}));
 console.log(j.id,'table',JSON.stringify(await capture(p,j.folder,'guide-table',['table tbody tr:first-child'],vp)));
}
