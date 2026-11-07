import {capture} from '../../../tools/research_browser.mjs';
const t=await taskSpace(6),p=t.page('p1'),s='[data-uia="section-eyebrow-heading"] + h2';
await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),s);
console.log('N9',JSON.stringify(await capture(p,'26_1107/앱사용_11월 넷플릭스 드라마 순위/웹조사','09-overview',[s],{width:1280,height:900})));
await p.goto('https://www.google.com/search?q='+encodeURIComponent('11월 넷플릭스 드라마 순위')+'&start=10');
console.log('ORIGINALPAGE2',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).map(a=>({title:a.innerText,url:a.href})) )));
