import {observePage} from '../../tools/research_observe.mjs';
const task=await taskSpace(15),p=task.page('p1');
await p.goto('https://www.google.com/search?q='+encodeURIComponent('site:shinhan.com 쏠편한 환전 이용안내'));
console.log(JSON.stringify(await observePage(p,'26_1113/은행_재테크_신한은행 환전 방법/웹조사','search-extra',{maxChars:2200,linksLimit:0})));
console.log(JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,7).map(a=>({title:a.innerText.slice(0,140),href:a.href})))));
