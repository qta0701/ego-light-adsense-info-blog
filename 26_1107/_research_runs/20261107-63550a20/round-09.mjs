import {capture} from '../../../tools/research_browser.mjs';
const n='26_1107/앱사용_11월 넷플릭스 드라마 순위/웹조사';
try{
 const t=await taskSpace(6),p=t.page('p1');
 console.log('H2',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('h2[data-uia="section-title"]')].map(x=>({text:x.innerText,box:x.getBoundingClientRect().toJSON()})))));
 await p.evaluate(()=>document.querySelector('h2[data-uia="section-title"]').scrollIntoView({block:'center'}));
 console.log('N9',JSON.stringify(await capture(p,n,'09-overview',['h2[data-uia="section-title"]'],{width:1280,height:900})));
 await p.goto('https://www.google.com/search?q='+encodeURIComponent('11월 넷플릭스 드라마 순위')+'&start=10');
 console.log('ORIGINALPAGE2',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).map(a=>({title:a.innerText,url:a.href})) )));
}catch(e){console.log('NE',String(e));}
