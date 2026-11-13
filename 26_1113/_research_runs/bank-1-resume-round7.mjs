import {capture} from '../../tools/research_browser.mjs';
const t12=await taskSpace(12),p12=t12.page('p2'),f12='26_1113/은행_재테크_국민은행 환전신청/웹조사';
console.log('modal',JSON.stringify(await p12.evaluate(()=>{let a=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&e.innerText?.trim()==='비로그인 환전신청');if(!a)return null;let x=a.parentElement; x.setAttribute('data-shot-modal','yes');return {tag:x.tagName,html:x.outerHTML.slice(0,800)};})));
console.log('capture',JSON.stringify(await capture(p12,f12,'07_login_choice',['[data-shot-modal="yes"]'],{width:1440,height:900})));
console.log('click',JSON.stringify(await p12.click('text="비로그인 환전신청"')));
console.log('snap',(await p12.snapshot({scope:'full_page'})).slice(0,16000));
const t11=await taskSpace(11),p11=t11.page('p4');console.log('11SNAP',(await p11.snapshot({scope:'full_page'})).slice(0,10000));
const t13=await taskSpace(13),p13=t13.page('p1');await p13.goto('https://www.google.com/search?q='+encodeURIComponent('KB국민은행 통장사본 출력 방법 KB스타뱅킹 공식'));console.log('13SEARCH',JSON.stringify(await p13.evaluate(()=>({url:location.href,text:document.body.innerText.slice(0,6000),results:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,8).map(a=>({title:a.innerText,href:a.href}))}))));
