import {capture} from '../../tools/research_browser.mjs';
const t=await taskSpace(3),p=t.page('p1'),f='26_1113/이슈_코레일 민원접수/웹조사';
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1000,height:700,deviceScaleFactor:1,mobile:false});
await p.evaluate(()=>{const e=[...document.querySelectorAll('h1,h2,h3,h4')].find(x=>x.textContent.trim()==='비회원 실명인증');if(!e)throw Error('heading missing');e.dataset.researchTarget='yes';e.scrollIntoView({block:'center'});});
console.log(JSON.stringify(await capture(p,f,'04_auth',['[data-research-target="yes"]'],{width:1000,height:700})));
