import {capture} from '../../tools/research_browser.mjs';
const t=await taskSpace(11),s=t.page('p1');await s.goto('https://www.google.com/search?q='+encodeURIComponent('"FPMFRX189002011" 부산은행 ONE환전'));
console.log('11',JSON.stringify(await s.evaluate(()=>({text:document.body.innerText.slice(0,3500),results:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,8).map(a=>({text:a.innerText,href:a.href}))}))));
const t13=await taskSpace(13),p=t13.page('p1');await p.goto('https://www.google.com/search?q='+encodeURIComponent('국민은행 STM 이용안내 통장 사본 출력 site:kbstar.com'));
console.log('13',JSON.stringify(await p.evaluate(()=>({text:document.body.innerText.slice(0,3000),results:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,5).map(a=>a.innerText)}))));
