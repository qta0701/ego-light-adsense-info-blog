import {capture} from '../../tools/research_browser.mjs';
const t=await taskSpace(3),p=t.page('p1'),f='26_1113/이슈_코레일 민원접수/웹조사';
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1000,height:700,deviceScaleFactor:1,mobile:false});
await p.evaluate(()=>{document.querySelectorAll('[data-research-target]').forEach(e=>e.removeAttribute('data-research-target'));const e=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='휴대폰 본인인증');if(!e)throw Error('button missing');e.dataset.researchTarget='yes';e.scrollIntoView({block:'center'});});
console.log(JSON.stringify(await capture(p,f,'05_auth_button',['[data-research-target="yes"]'],{width:1000,height:700})));
