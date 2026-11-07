import {capture} from '../../../tools/research_browser.mjs';
const n='26_1107/앱사용_11월 넷플릭스 드라마 순위/웹조사',vp={width:1280,height:900};
try{
 const t=await taskSpace(6),p=t.page('p1');
 await p.keyboard.press('Escape');
 await p.click('[data-uia="top10-category-select-selected"]');
 console.log('N7',JSON.stringify(await capture(p,n,'07-category-menu',['[data-uia="top10-category-select-selected"]'],vp)));
 await p.keyboard.press('Escape');
 await p.click('[data-uia="top10-filters-week-select-selected"]');
 console.log('N8',JSON.stringify(await capture(p,n,'08-week-menu',['[data-uia="top10-filters-week-select-selected"]'],vp)));
 await p.keyboard.press('Escape');
 console.log('HEAD',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('h2')].filter(x=>x.innerText.includes('Overview')).map(x=>x.outerHTML))));
 await p.evaluate(()=>[...document.querySelectorAll('h2')].find(x=>x.innerText.includes('Overview')).scrollIntoView({block:'start'}));
 console.log('N9',JSON.stringify(await capture(p,n,'09-overview',['h2:has(+ div)'],vp)));
}catch(e){console.log('NE',String(e));}
