import {capture} from '../../../tools/research_browser.mjs';
import {observePage} from '../../../tools/research_observe.mjs';
const d='26_1107/앱사용_당근마켓 전국검색/웹조사',b='26_1107/앱사용_번개장터 계좌거래/웹조사',n='26_1107/앱사용_11월 넷플릭스 드라마 순위/웹조사';
try{
 const t=await taskSpace(4),p=t.page('p1');
 await p.waitForFunction(()=>[...document.querySelectorAll('[role="dialog"] button')].some(x=>x.innerText.includes('역삼')),undefined,{timeout:10000});
 console.log('DRESULT',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('[role="dialog"] button')].map((x,i)=>({i,text:x.innerText})))));
 console.log('D4',JSON.stringify(await capture(p,d,'04-region-results',['[role="dialog"] input'],{width:1280,height:900})));
 await p.click('loc=role:button[name="서울특별시 강남구 역삼동"]');
 console.log('DAFTER',await p.snapshot());
}catch(e){console.log('DE',String(e));}
try{
 const t=await taskSpace(5),p=t.page('p1');
 for(const [name,sel] of [['02-risk','p:nth-of-type(1)'],['03-rule','p:nth-of-type(3)'],['04-violation','p:nth-of-type(4)'],['05-prohibited','ul li:nth-child(1)']]){
  await p.evaluate(s=>document.querySelector(s)?.scrollIntoView({block:'center'}),sel);
  console.log('BCAP',name,JSON.stringify(await capture(p,b,name,[sel],{width:1280,height:900})));
 }
}catch(e){console.log('BE',String(e));}
try{
 const t=await taskSpace(6),p=t.page('p1');
 for(const [name,sel] of [['03-country','[data-uia="top10-country-select-selected"]'],['04-category','[data-uia="top10-category-select-selected"]'],['05-week','[data-uia="top10-filters-week-select-selected"]']]){
  console.log('NCAP',name,JSON.stringify(await capture(p,n,name,[sel],{width:1280,height:900})));
 }
 console.log('NLIST',JSON.stringify(await p.evaluate(()=>({tail:document.body.innerText.slice(-2000),imgs:[...document.querySelectorAll('img')].slice(0,15).map(x=>({alt:x.alt,src:x.currentSrc.slice(0,120)}))}))));
}catch(e){console.log('NE',String(e));}
