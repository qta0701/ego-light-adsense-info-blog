import {capture} from '../../tools/research_browser.mjs';
for(const j of [
 {id:14,query:'신한은행 간편조회',folder:'26_1113/은행_재테크_신한은행 간편조회/웹조사',needle:'신한간편서비스'},
 {id:15,query:'신한은행 환전 방법',folder:'26_1113/은행_재테크_신한은행 환전 방법/웹조사',needle:'환전가이드-환전이용안내'},
 {id:16,query:'하나은행 환율조회',folder:'26_1113/은행_재테크_하나은행 환율조회/웹조사',needle:'환율/외화예금 금리'}]) {
 const t=await taskSpace(j.id),p=t.page('p1');
 if(j.id===15) await p.goto('https://www.google.com/search?q='+encodeURIComponent(j.query));
 const selector=await p.evaluate(needle=>{
   const el=[...document.querySelectorAll('a:has(h3)')].find(e=>e.innerText.includes(needle));
   if(!el)throw Error('official result not found');el.scrollIntoView({block:'center'});
   const path=[];let n=el;while(n&&n.nodeType===1){let s=n.localName;if(n.id){s+='#'+CSS.escape(n.id);path.unshift(s);break;}let i=1;for(let x=n.previousElementSibling;x;x=x.previousElementSibling)if(x.localName===n.localName)i++;s+=`:nth-of-type(${i})`;path.unshift(s);n=n.parentElement;}return path.join(' > ');
 },j.needle);
 console.log(JSON.stringify({id:j.id,selector,capture:await capture(p,j.folder,'01_search',[selector],{width:1280,height:900})}));
}
