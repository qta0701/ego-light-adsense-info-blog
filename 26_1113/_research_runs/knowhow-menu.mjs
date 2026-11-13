import {capture} from '../../tools/research_browser.mjs';
const p=(await taskSpace(6)).page('p1'), f='26_1113/노하우_코레일 승차권 조회/웹조사',vp={width:1100,height:800};
await p.cdp('Emulation.setDeviceMetricsOverride',{...vp,deviceScaleFactor:1,mobile:false});
await p.evaluate(()=>{const e=[...document.querySelectorAll('button')].find(e=>e.textContent.includes('기존 비회원 승차권 확인'));e.dataset.researchTarget='yes';e.scrollIntoView({block:'center'});});
console.log(JSON.stringify(await capture(p,f,'05_method',['[data-research-target="yes"]'],vp)));
