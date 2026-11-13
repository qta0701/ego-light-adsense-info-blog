import {capture} from '../../tools/research_browser.mjs';
async function take(p,f,name,tag,phrase,vp={width:1100,height:800}){
 await p.cdp('Emulation.setDeviceMetricsOverride',{...vp,deviceScaleFactor:1,mobile:false});
 const info=await p.evaluate(({tag,phrase})=>{document.querySelectorAll('[data-research-target]').forEach(e=>e.removeAttribute('data-research-target'));const es=[...document.querySelectorAll(tag)].filter(x=>x.textContent.includes(phrase));let e=es.find(x=>![...x.children].some(c=>c.textContent.includes(phrase)))||es[0];if(!e)throw Error('missing');e.dataset.researchTarget='yes';e.scrollIntoView({block:'center'});let r=e.getBoundingClientRect();return {tag:e.tagName,rect:[r.x,r.y,r.width,r.height],txt:e.innerText?.slice(0,150)};},{tag,phrase});console.log(name,info);
 console.log(name,JSON.stringify(await capture(p,f,name,['[data-research-target="yes"]'],vp)));
}
{
const p=(await taskSpace(6)).page('p1'),f='26_1113/노하우_코레일 승차권 조회/웹조사';
for(const x of [['03_nonmember','p','비회원 인증 후'],['04_inputs','input','']])try{if(x[0]==='04_inputs') {await p.evaluate(()=>{let e=document.querySelector('input[name="phone"]');e.dataset.researchTarget='yes';e.scrollIntoView({block:'center'});});console.log('04_inputs',JSON.stringify(await capture(p,f,'04_inputs',['input[name="phone"]'],{width:1100,height:800})));}else await take(p,f,...x);}catch(e){console.log(x[0],String(e));}
}
{
const p=(await taskSpace(7)).page('p1'),f='26_1113/노하우_모바일 티머니 환불/웹조사';
for(const x of [['02_refund','div','모바일티머니 앱→왼쪽상단'],['04_usim','div','충전한 이전 USIM이 없다면']])try{await take(p,f,...x,{width:1400,height:900});}catch(e){console.log(x[0],String(e));}
}
