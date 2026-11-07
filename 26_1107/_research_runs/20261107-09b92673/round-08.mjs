import {capture} from '../../../tools/research_browser.mjs';
const jobs=[
 {id:1,query:'site:netflix.com/tudum/top10 south korea films netflix top 10',href:'https://www.netflix.com/tudum/top10/south-korea',folder:'26_1107/앱사용_11월 넷플릭스 한국영화 순위/웹조사'},
 {id:2,query:'site:netflix.com/tudum/top10 netflix top 10 weekly',href:'https://www.netflix.com/tudum/top10',folder:'26_1107/앱사용_11월 넷플릭스 오리지널 순위/웹조사'},
 {id:3,query:'넷플릭스 성인인증 방법',href:'https://help.netflix.com/ko/node/41299',folder:'26_1107/앱사용_넷플릭스 성인인증 방법/웹조사'}
];
await Promise.all(jobs.map(async j=>{const t=await taskSpace(j.id);j.page=t.page('p1');await j.page.goto('https://www.google.com/search?q='+encodeURIComponent(j.query));}));
for(const j of jobs){
 const p=j.page, sel='a[href="'+j.href+'"]';
 await p.cdp('Emulation.setDeviceMetricsOverride',{width:1100,height:850,deviceScaleFactor:1,mobile:false});
 console.log('target',j.id,JSON.stringify(await p.evaluate(s=>[...document.querySelectorAll(s)].map(e=>({text:e.innerText,rect:e.getBoundingClientRect().toJSON()})),sel)));
 await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center',behavior:'instant'}),sel);
 console.log('capture',j.id,JSON.stringify(await capture(p,j.folder,'search-official',[sel],{width:1100,height:850})));
}
