import {capture} from '../../tools/research_browser.mjs';
const t=await taskSpace(15),p=t.page('p1');
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
await p.evaluate(()=>window.scrollBy(0,400));
const s=await p.evaluate(()=>{const e=[...document.querySelectorAll('a:has(h3)')].find(x=>x.innerText.includes('환전가이드-환전이용안내'));let a=[],n=e;while(n&&n.nodeType===1){let q=n.localName;if(n.id){a.unshift(q+'#'+CSS.escape(n.id));break;}let i=1;for(let x=n.previousElementSibling;x;x=x.previousElementSibling)if(x.localName===n.localName)i++;a.unshift(q+`:nth-of-type(${i})`);n=n.parentElement;}return a.join(' > ')});
console.log(JSON.stringify(await capture(p,'26_1113/은행_재테크_신한은행 환전 방법/웹조사','07_searchfocus',[s],{width:1280,height:900})));
