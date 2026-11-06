import {capture} from '../../../tools/research_browser.mjs';
const viewport={width:1100,height:900};
const k=(await taskSpace(3)).page('p1'),folder='26_1106/앱사용_코레일 승차권 전달/웹조사';
await k.cdp('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:false});
for(const [name,text] of [['04_send','승차권을 구입해서 다른사람에게 전달하고 싶은데 어떻게 해야하나요?'],['05_receive','전달받은 승차권은 어떻게 확인하나요?'],['06_refund','전달한 승차권을 환불할 수 있나요?']]){
 const selector=await k.evaluate(text=>{const p=[...document.querySelectorAll('a p')].find(e=>e.textContent.trim()===text);const el=p.closest('a').parentElement;let n=el,s='';while(n&&n!==document.documentElement){const index=[...n.parentElement.children].filter(e=>e.tagName===n.tagName).indexOf(n)+1;s=n.tagName.toLowerCase()+':nth-of-type('+index+')'+(s?' > '+s:'');n=n.parentElement;}el.scrollIntoView({block:'center'});return 'html > '+s;},text);
 console.log(JSON.stringify({id:3,name,capture:await capture(k,folder,name,[selector],viewport)}));
}
const d=(await taskSpace(4)).page('p1');await d.cdp('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:false});
const qr=await d.evaluate(()=>{const el=[...document.querySelectorAll('img')].find(e=>e.width>=200&&e.width<300);let n=el,s='';while(n&&n!==document.documentElement){const index=[...n.parentElement.children].filter(e=>e.tagName===n.tagName).indexOf(n)+1;s=n.tagName.toLowerCase()+':nth-of-type('+index+')'+(s?' > '+s:'');n=n.parentElement;}return 'html > '+s;});
console.log(JSON.stringify({id:4,capture:await capture(d,'26_1106/앱사용_당근마켓 채팅 걸기/웹조사','06_pc_login',['h1.qr-title',qr],viewport)}));
