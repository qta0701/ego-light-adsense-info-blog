import {capture} from '../../../tools/research_browser.mjs';
import {observePage} from '../../../tools/research_observe.mjs';
const viewport={width:1100,height:900};
const k=(await taskSpace(3)).page('p1'),kf='26_1106/앱사용_코레일 승차권 전달/웹조사';
await k.cdp('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:false});
const selector=await k.evaluate(()=>{const el=[...document.querySelectorAll('.ticketInfo_inner')].find(e=>e.querySelector('h2')?.textContent.trim()==='전달하기');let n=el,s='';while(n&&n!==document.documentElement){const tag=n.tagName.toLowerCase();const index=[...n.parentElement.children].filter(e=>e.tagName===n.tagName).indexOf(n)+1;s=tag+':nth-of-type('+index+')'+(s?' > '+s:'');n=n.parentElement;}el.scrollIntoView({block:'center'});return 'html > '+s;});
console.log(JSON.stringify({id:3,capture:await capture(k,kf,'03_transfer_rules',[selector],viewport)}));
await k.goto('https://www.korail.com/ticket/reserve/guide/faq');console.log(JSON.stringify({id:3,obs:await observePage(k,kf,'current-faq',{selector:'body',maxChars:1300,linksLimit:3}),snap:(await k.snapshot()).slice(-6500)}));
const d=(await taskSpace(4)).page('p1'),df='26_1106/앱사용_당근마켓 채팅 걸기/웹조사';
await d.cdp('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:false});
for(const [name,prefix] of [['03_start_chat','1d87e949'],['04_existing_chat','55a971d8']]){const s='img[src*="'+prefix+'"]';await d.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),s);console.log(JSON.stringify({id:4,capture:await capture(d,df,name,[s],viewport)}));}
await d.goto('https://www.daangn.com/wv/faqs/2154');await d.cdp('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:false});await d.evaluate(()=>document.querySelector('h3').scrollIntoView({block:'center'}));console.log(JSON.stringify({id:4,capture:await capture(d,df,'05_neighbor_chat',['h3'],viewport)}));
await d.goto('https://chat.daangn.com/login');console.log(JSON.stringify({id:4,obs:await observePage(d,df,'chat-login',{selector:'body',maxChars:1500,linksLimit:3}),snap:(await d.snapshot()).slice(0,4500)}));
