import {capture} from '../../tools/research_browser.mjs';
import {observePage} from '../../tools/research_observe.mjs';
for(const [id,keyword,phrase] of [[3,'코레일 민원접수','한국철도 고객의 소리'],[4,'테무 회원탈퇴','내 Temu 계정을 영구적으로 삭제']]){
 const t=await taskSpace(id),p=t.page('p1'),folder='26_1113/이슈_'+keyword+'/웹조사';
 await p.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
 const u=await p.evaluate(phrase=>{const a=[...document.querySelectorAll('a')].find(e=>e.querySelector('h3')?.innerText.includes(phrase)); if(!a)throw Error('missing search result');a.dataset.researchTarget='yes';a.scrollIntoView({block:'center'});return a.href;},phrase);
 console.log(keyword,'search',JSON.stringify(await capture(p,folder,'01_search',['a[data-research-target="yes"]'],{width:1280,height:900})));
 try {await p.goto(u);console.log(keyword,'visit',JSON.stringify(await observePage(p,folder,'official',{maxChars:1500,linksLimit:5})));console.log('snapshot',await p.snapshot());} catch(e){console.log(keyword,'error',String(e));}
}
