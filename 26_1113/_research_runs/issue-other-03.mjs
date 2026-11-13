import {capture} from '../../tools/research_browser.mjs';
import {observePage} from '../../tools/research_observe.mjs';
async function mark(p,folder,name,tag,phrase,viewport={width:1000,height:700}){
 await p.cdp('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:false});
 await p.evaluate(({tag,phrase})=>{document.querySelectorAll('[data-research-target]').forEach(e=>e.removeAttribute('data-research-target'));const e=[...document.querySelectorAll(tag)].find(x=>x.textContent.trim().includes(phrase));if(!e)throw Error('Missing '+phrase);e.dataset.researchTarget='yes';e.scrollIntoView({block:'center'});},{tag,phrase});
 console.log(name,JSON.stringify(await capture(p,folder,name,['[data-research-target="yes"]'],viewport)));
}
{
 const t=await taskSpace(3),p=t.page('p1'),f='26_1113/이슈_코레일 민원접수/웹조사';
 await mark(p,f,'02_voc','a','고객의 소리(VOC) 바로가기');
 await mark(p,f,'03_station','p','가까운 역에 방문');
 const link=await p.evaluate(()=>[...document.querySelectorAll('a')].find(e=>e.textContent.includes('고객의 소리(VOC) 바로가기')).href);
 await p.goto(link);console.log('login',JSON.stringify(await observePage(p,f,'login',{maxChars:1500,linksLimit:5})));console.log(await p.snapshot());
}
{
 const t=await taskSpace(4),p=t.page('p1'),f='26_1113/이슈_테무 회원탈퇴/웹조사';
 await mark(p,f,'02_app','p',"2. '설정'을 클릭",{width:1000,height:550});
 await mark(p,f,'03_web','p',"1. 계정에 로그인하고 화면 우측",{width:1000,height:550});
 await mark(p,f,'04_term','p','계정 영구 삭제를 요청하면',{width:1000,height:550});
}
