import {capture} from '../../../tools/research_browser.mjs';
const t=await taskSpace(3),p=t.page('p1'),folder='26_1107/앱사용_넷플릭스 성인인증 방법/웹조사',vp={width:900,height:600};
const base='body > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > section:nth-of-type(2)';
const jobs=[{name:'guide-entry',sel:[base+' > p:nth-of-type(1)']},{name:'guide-renew',sel:[base+' > p:nth-of-type(3)']},{name:'guide-details',sel:[base+' > ul:nth-of-type(1) > li:nth-of-type(1) > p',base+' > ul:nth-of-type(1) > li:nth-of-type(2) > p']},{name:'guide-error',sel:['a[href="https://help.netflix.com/ko/node/109172"]']}];
await p.cdp('Emulation.setDeviceMetricsOverride',{...vp,deviceScaleFactor:1,mobile:false});
for(const j of jobs){await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center',behavior:'instant'}),j.sel[0]);console.log(j.name,JSON.stringify(await capture(p,folder,j.name,j.sel,vp)));}
