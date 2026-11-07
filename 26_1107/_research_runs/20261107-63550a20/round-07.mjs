import {capture} from '../../../tools/research_browser.mjs';
const d='26_1107/앱사용_당근마켓 전국검색/웹조사',b='26_1107/앱사용_번개장터 계좌거래/웹조사',n='26_1107/앱사용_11월 넷플릭스 드라마 순위/웹조사';
try{
 const t=await taskSpace(4),p=t.page('p1');
 await p.waitForFunction(()=>document.querySelector('button[aria-label^="지역 선택"]')?.innerText.includes('역삼'),undefined,{timeout:10000});
 console.log('D5',JSON.stringify(await capture(p,d,'05-region-selected',['button[aria-label^="지역 선택"]'],{width:1280,height:900})));
}catch(e){console.log('DE',String(e));}
try{
 const t=await taskSpace(5),p=t.page('p1'),vp={width:600,height:500};
 await p.cdp('Emulation.setDeviceMetricsOverride',{...vp,deviceScaleFactor:1,mobile:false});
 for(const [name,sel] of [['06-mobile-risk','p:nth-of-type(1)'],['07-mobile-rule','p:nth-of-type(4)'],['08-mobile-list','ul li:nth-child(1)'],['09-mobile-more','p:nth-of-type(8)']]){
  await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),sel);
  console.log('BCAP',name,JSON.stringify(await capture(p,b,name,[sel],vp)));
 }
}catch(e){console.log('BE',String(e));}
try{
 const t=await taskSpace(6),p=t.page('p1'),vp={width:1280,height:900};
 await p.click('[data-uia="top10-country-select-selected"]');
 console.log('N6',JSON.stringify(await capture(p,n,'06-country-menu',['[data-uia="top10-country-select-selected"]'],vp)));
 await p.click('[data-uia="top10-country-select-selected"]');
 await p.click('[data-uia="top10-category-select-selected"]');
 console.log('N7',JSON.stringify(await capture(p,n,'07-category-menu',['[data-uia="top10-category-select-selected"]'],vp)));
 await p.click('[data-uia="top10-category-select-selected"]');
 await p.click('[data-uia="top10-filters-week-select-selected"]');
 console.log('N8',JSON.stringify(await capture(p,n,'08-week-menu',['[data-uia="top10-filters-week-select-selected"]'],vp)));
 await p.click('[data-uia="top10-filters-week-select-selected"]');
 const info=await p.evaluate(()=>[...document.querySelectorAll('h2')].filter(x=>x.innerText.includes('Overview')).map(x=>x.outerHTML));console.log('NINFO',JSON.stringify(info));
 await p.evaluate(()=>[...document.querySelectorAll('h2')].find(x=>x.innerText.includes('Overview')).scrollIntoView({block:'start'}));
 console.log('N9',JSON.stringify(await capture(p,n,'09-overview',['main h2:nth-of-type(2)'],vp)));
}catch(e){console.log('NE',String(e));}
