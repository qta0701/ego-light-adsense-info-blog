import {capture} from '../../tools/research_browser.mjs';
const t=await taskSpace(10),p=t.page('p2'),f='26_1113/노하우2_배민클럽 환불/웹조사';
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
for(const [name,selector] of [['06_entry','ol.kte-steps > li:nth-child(1)'],['07_confirm','ol.kte-steps > li:nth-child(5)']]){
 try{await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),selector);await p.waitForTimeout(2000);console.log(JSON.stringify({name,result:await capture(p,f,name,[selector],{width:1280,height:1000})}));}catch(e){console.log(JSON.stringify({name,error:String(e)}));}
}
