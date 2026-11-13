import {capture} from '../../tools/research_browser.mjs';
import {observePage} from '../../tools/research_observe.mjs';
for(const [id,keyword,phrase] of [[5,'앱스토어 국가변경','Apple 계정 국가 변경'],[6,'코레일 승차권 조회','로그인>코레일 승차권예매'],[7,'모바일 티머니 환불','[FAQ] LG유플러스 USIM 교체']]) {
 const t=await taskSpace(id),p=t.page('p1'),folder=`26_1113/노하우_${keyword}/웹조사`;
 try{
  await p.cdp('Emulation.setDeviceMetricsOverride',{width:1100,height:800,deviceScaleFactor:1,mobile:false});
  const u=await p.evaluate(phrase=>{const a=[...document.querySelectorAll('a')].find(x=>x.querySelector('h3')?.innerText.includes(phrase));if(!a)throw Error('result missing');a.dataset.researchTarget='yes';a.scrollIntoView({block:'center'});return a.href;},phrase);
  console.log(keyword,JSON.stringify(await capture(p,folder,'01_search',['a[data-research-target="yes"]'],{width:1100,height:800})));
  await p.goto(u);
  console.log(keyword,JSON.stringify(await observePage(p,folder,'official',{maxChars:1500,linksLimit:5})));
  console.log(keyword,'snapshot',await p.snapshot({scope:'full_page'}));
 }catch(e){console.log(keyword,'ERROR',String(e));}
}
