import {capture} from '../../tools/research_browser.mjs';
import {observePage} from '../../tools/research_observe.mjs';
const t=await taskSpace(2), p=t.page('p1'), folder='26_1113/이슈_앱스토어 로그아웃/웹조사';
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
const u=await p.evaluate(()=>{const a=[...document.querySelectorAll('a')].find(x=>x.querySelector('h3')?.innerText.includes('가족의 공유 앱')); if(!a)throw Error('result absent'); a.setAttribute('data-research-target','yes'); a.scrollIntoView({block:'center'}); return a.href;});
console.log('capture',JSON.stringify(await capture(p,folder,'01_search',['a[data-research-target="yes"]'],{width:1280,height:1000})));
await p.goto(u);
console.log('visit',JSON.stringify(await observePage(p,folder,'apple-family',{maxChars:1500,linksLimit:5})));
console.log('snapshot',await p.snapshot());
