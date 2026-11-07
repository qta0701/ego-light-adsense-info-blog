import {capture} from '../../../tools/research_browser.mjs';
import {observePage} from '../../../tools/research_observe.mjs';
const d='26_1107/앱사용_당근마켓 전국검색/웹조사',b='26_1107/앱사용_번개장터 계좌거래/웹조사',n='26_1107/앱사용_11월 넷플릭스 드라마 순위/웹조사';
try{
 const t=await taskSpace(4),p=t.page('p1');
 console.log('D3',JSON.stringify(await capture(p,d,'03-region-dialog',['input[placeholder="예) 서초4동, 홍대, 황리단길"]'],{width:1280,height:900})));
 await p.fill('input[placeholder="예) 서초4동, 홍대, 황리단길"]','역삼동');
 console.log('DSNAP',await p.snapshot());
}catch(e){console.log('DE',String(e));}
try{
 const t=await taskSpace(5),p=t.page('p1');
 console.log('BINFO',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('p')].map((x,i)=>({i,text:x.innerText.slice(0,150)})))));
 console.log('BOBS',JSON.stringify(await observePage(p,b,'official-1-loaded',{maxChars:3000})));
}catch(e){console.log('BE',String(e));}
try{
 const t=await taskSpace(6),p=t.page('p1');
 console.log('NINFO',JSON.stringify(await p.evaluate(()=>({selects:[...document.querySelectorAll('[role="combobox"]')].map(x=>({outer:x.outerHTML.slice(0,500),text:x.innerText})),head:[...document.querySelectorAll('h1,h2,h3')].map(x=>({tag:x.tagName,text:x.innerText})),lists:[...document.querySelectorAll('main li')].slice(0,12).map(x=>x.innerText.slice(0,300))}))));
 console.log('NCAP',JSON.stringify(await capture(p,n,'02-ranking',[],{width:1280,height:900})));
}catch(e){console.log('NE',String(e));}
