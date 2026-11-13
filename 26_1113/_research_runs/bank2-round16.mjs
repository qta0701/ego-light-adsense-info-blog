import {capture} from '../../tools/research_browser.mjs';
const viewport={width:1280,height:900};
async function configure(p){await p.cdp('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:false});}
async function take(p,folder,name,selector){
 await configure(p); if(selector)await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),selector);
 console.log(JSON.stringify({name,...await capture(p,folder,name,selector?[selector]:[],viewport)}));
}
{
 const t=await taskSpace(14),p=t.page('p2'),f='26_1113/은행_재테크_신한은행 간편조회/웹조사';
 await take(p,f,'02_login','#btn_certLoginCloud');
 await take(p,f,'03_eligibility','#wq_uuid_429');
 await p.reload(); await p.waitForLoadState();
 console.log((await p.snapshot()).slice(-3000));
}
{
 const t=await taskSpace(15),p=t.page('p2'),f='26_1113/은행_재테크_신한은행 환전 방법/웹조사';
 await take(p,f,'02_login','#btn_certLoginCloud');
 await p.goto('https://bank.shinhan.com/index.jsp#020502010000'); await p.waitForLoadState();
 console.log((await p.snapshot()).slice(0,4000));
}
