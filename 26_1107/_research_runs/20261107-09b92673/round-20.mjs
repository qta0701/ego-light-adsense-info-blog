import {observePage} from '../../../tools/research_observe.mjs';
const t2=await taskSpace(2),p2=t2.page('p1');await p2.goto('https://www.netflix.com/tudum/articles/kpop-demon-hunters-release-date-cast-news');
console.log('article',JSON.stringify(await observePage(p2,'26_1107/앱사용_11월 넷플릭스 오리지널 순위/웹조사','kpop-film',{selector:'body',maxChars:3000,linksLimit:5})));
const t3=await taskSpace(3),p3=t3.page('p1');console.log('errors',JSON.stringify(await p3.evaluate(()=>[...document.querySelectorAll('p')].filter(e=>e.innerText.includes('입력하신 정보가 맞지')).map(e=>e.parentElement.outerHTML.slice(0,3500)))));
