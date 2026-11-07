import {capture} from '../../../tools/research_browser.mjs';
import {observePage} from '../../../tools/research_observe.mjs';
const folder='26_1107/앱사용_11월 넷플릭스 드라마 순위/웹조사';
try{
 const t=await taskSpace(6),p=t.page('p1'),s='a[href="https://www.netflix.com/tudum/top10/south-korea/tv"]:has(h3)';
 await p.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
 await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),s);
 console.log('CAPTURE6',JSON.stringify(await capture(p,folder,'01-search',[s],{width:1280,height:900})));
 await p.goto('https://www.netflix.com/tudum/top10/south-korea/tv');
 console.log('NETFLIX',JSON.stringify(await observePage(p,folder,'official-1',{maxChars:5000})));
 console.log('NETSNAP',await p.snapshot());
}catch(e){console.log('ERROR6',String(e));}
try{
 const t=await taskSpace(5),p=t.page('p1');
 console.log('BUNJANG',JSON.stringify(await p.evaluate(()=>({title:document.title,html:document.body.innerText,htmlPart:document.body.innerHTML.slice(0,1500)}))));
 console.log('BUNSNAP',await p.snapshot());
}catch(e){console.log('ERROR5',String(e));}
try{
 const t=await taskSpace(4),p=t.page('p1');
 console.log('DAANGN',JSON.stringify(await capture(p,'26_1107/앱사용_당근마켓 전국검색/웹조사','02-search-field',['input[name="q"]'],{width:1280,height:900})));
 await p.click('button[aria-label^="지역 선택"]');
 console.log('DAANGNSNAP',await p.snapshot());
}catch(e){console.log('ERROR4',String(e));}
