import {capture} from '../../../tools/research_browser.mjs';
import {observePage} from '../../../tools/research_observe.mjs';
const jobs=[
 {id:3,folder:'26_1106/앱사용_코레일 승차권 전달/웹조사',selector:'a[jsname="UWckNb"][href*="nttNo=27005"]',url:'https://info.korail.com/info/selectBbsNttView.do?key=911&bbsNo=199&nttNo=27005&searchCtgry=&searchCnd=all&searchKrwd=&pageIndex=2&integrDeptCode=%3Cbr%3E%3Cbr%3E%EB%B3%B4%EB%8F%84%EC%9E%90%EB%A3%8C%EB%8A%94'},
 {id:4,folder:'26_1106/앱사용_당근마켓 채팅 걸기/웹조사',selector:'a[jsname="UWckNb"][href="https://www.daangn.com/wv/faqs/24"]',url:'https://www.daangn.com/wv/faqs/24'}
];
for(const j of jobs){
 const task=await taskSpace(j.id);const p=task.page('p1');
 try {
 await p.cdp('Emulation.setDeviceMetricsOverride',{width:1100,height:900,deviceScaleFactor:1,mobile:false});
 await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),j.selector);
 console.log(JSON.stringify({id:j.id,capture:await capture(p,j.folder,'01_search',[j.selector],{width:1100,height:900})}));
 } catch(e){console.log(JSON.stringify({id:j.id,captureError:String(e)}));}
}
await Promise.all(jobs.map(async j=>{try{const task=await taskSpace(j.id),p=task.page('p1');await p.goto(j.url);console.log(JSON.stringify({id:j.id,observation:await observePage(p,j.folder,'official',{selector:'body',maxChars:1500,linksLimit:5}),snapshot:(await p.snapshot()).slice(0,7000)}));}catch(e){console.log(JSON.stringify({id:j.id,error:String(e)}));}}));
