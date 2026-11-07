import {capture} from '../../../tools/research_browser.mjs';
import {observePage} from '../../../tools/research_observe.mjs';
const jobs=[
 {id:4,folder:'26_1107/앱사용_당근마켓 전국검색/웹조사',selector:'a[href^="https://www.daangn.com/kr/search/"]:has(h3)',url:'https://www.daangn.com/kr/search/?q=%EC%A0%84%EA%B5%AD'},
 {id:5,folder:'26_1107/앱사용_번개장터 계좌거래/웹조사',selector:'a[href="https://help.bunjang.co.kr/faq/3/629"]:has(h3)',url:'https://help.bunjang.co.kr/faq/3/629'}
];
for(const j of jobs){
 try{
  const t=await taskSpace(j.id),p=t.page('p1');
  await p.evaluate(s=>document.querySelector(s)?.scrollIntoView({block:'center'}),j.selector);
  console.log('CAPTURE',j.id,JSON.stringify(await capture(p,j.folder,'01-search',[j.selector],{width:1280,height:900})));
  await p.goto(j.url);
  console.log('PAGE',j.id,JSON.stringify(await observePage(p,j.folder,'official-1',{maxChars:5000})));
  console.log('SNAP',j.id,await p.snapshot());
 }catch(e){console.log('ERROR',j.id,String(e));}
}
try{
 const t=await taskSpace(6),p=t.page('p1');
 await p.goto('https://www.google.com/search?q='+encodeURIComponent('site:netflix.com/tudum/top10/south-korea tv 2026'));
 console.log('NETSEARCH',JSON.stringify(await p.evaluate(()=>({text:document.body.innerText.slice(0,3500),candidates:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,10).map(a=>({title:a.innerText,url:a.href}))}))));
}catch(e){console.log('ERROR',6,String(e));}
