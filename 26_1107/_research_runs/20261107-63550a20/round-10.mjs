import {capture} from '../../../tools/research_browser.mjs';
const n='26_1107/앱사용_11월 넷플릭스 드라마 순위/웹조사';
try{
 const t=await taskSpace(6),p=t.page('p1');
 console.log('STRUCT',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('h2[data-uia="section-title"]')].map(x=>x.parentElement.outerHTML.slice(0,800)))));
 await p.evaluate(()=>[...document.querySelectorAll('h2[data-uia="section-title"]')][1].scrollIntoView({block:'center'}));
 console.log('N9',JSON.stringify(await capture(p,n,'09-overview',['h2[data-uia="section-title"]:nth-of-type(1)'],{width:1280,height:900})));
}catch(e){console.log('NE',String(e));}
