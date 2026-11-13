import {capture} from '../../tools/research_browser.mjs';
import {observePage} from '../../tools/research_observe.mjs';
{
 const p=(await taskSpace(7)).page('p1'),f='26_1113/노하우_모바일 티머니 환불/웹조사',vp={width:1400,height:900};
 for(const [name,phrase] of [['02_refund','모바일티머니 앱→왼쪽상단'],['04_usim','충전한 이전 USIM이 없다면']])try{
  await p.cdp('Emulation.setDeviceMetricsOverride',{...vp,deviceScaleFactor:1,mobile:false});
  const info=await p.evaluate(phrase=>{document.querySelectorAll('[data-research-target]').forEach(e=>e.removeAttribute('data-research-target'));const div=[...document.querySelectorAll('div')].find(x=>x.textContent.includes(phrase)&&![...x.children].some(c=>c.textContent.includes(phrase)));const node=[...div.childNodes].find(n=>n.nodeType===3&&n.textContent.includes(phrase));const span=document.createElement('span');node.parentNode.insertBefore(span,node);span.appendChild(node);span.dataset.researchTarget='yes';span.scrollIntoView({block:'center'});const r=span.getBoundingClientRect();return [r.x,r.y,r.width,r.height];},phrase);
  console.log(name,info,JSON.stringify(await capture(p,f,name,['[data-research-target="yes"]'],vp)));
 }catch(e){console.log(name,String(e));}
}
{
 const p=(await taskSpace(6)).page('p1'),f='26_1113/노하우_코레일 승차권 조회/웹조사';
 await p.goto('https://www.google.com/search?q='+encodeURIComponent('site:korail.com 비회원 승차권 확인 간편인증'));
 console.log('search',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,6).map(a=>({title:a.innerText,url:a.href})))));
 const u=await p.evaluate(()=>[...document.querySelectorAll('a')].find(a=>a.querySelector('h3')?.innerText.includes('비회원 예매'))?.href);
 if(u){await p.goto(u);console.log('menu',JSON.stringify(await observePage(p,f,'nonmember-menu',{maxChars:1500,linksLimit:5})));console.log(await p.snapshot());}
}
