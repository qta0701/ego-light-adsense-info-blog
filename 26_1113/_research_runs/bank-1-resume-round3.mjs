import {capture} from '../../tools/research_browser.mjs';
const root='26_1113/';
const t12=await taskSpace(12), p12=t12.page('p2');
console.log('12SNAP BEFORE', (await p12.snapshot()).slice(0,7000));
await p12.click('[data-shot="branch"] button >> nth=1');
console.log('12AFTER', (await p12.snapshot({scope:'full_page'})).slice(0,19000));
const t13=await taskSpace(13), p13=t13.page('p2'), f13=root+'은행_재테크_국민은행 통장사본 출력/웹조사';
console.log('13LOGIN',JSON.stringify(await p13.evaluate(()=>{let e=[...document.querySelectorAll('table')].find(x=>x.innerText.includes('KB국민인증서')&&x.innerText.includes('아이디 로그인'));if(!e)return null;e.setAttribute('data-shot','login');e.scrollIntoView({block:'center'});return e.innerText;})));
console.log(JSON.stringify(await capture(p13,f13,'02_login',['[data-shot="login"]'],{width:1440,height:900})));
for(const [id,query] of [[11,'부산은행 환전 서비스 이용안내 site:busanbank.co.kr'],[13,'site:kbstar.com 통장사본 출력 뱅킹관리 제증명발급']]){
 const t=await taskSpace(id), p=t.page('p1'); await p.goto('https://www.google.com/search?q='+encodeURIComponent(query));
 console.log('SEARCH',id,JSON.stringify(await p.evaluate(()=>({url:location.href,text:document.body.innerText.slice(0,5000),results:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,8).map(a=>({text:a.innerText,href:a.href}))}))));
}
