import {capture} from '../../tools/research_browser.mjs';
const t=await taskSpace(9),p=t.page('p2'),f='26_1113/노하우2_인스타그램 탈퇴방법/웹조사';
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
for(const [name,index] of [['02_export',0],['03_manage',1],['04_account',2],['05_wait',3]]){
 try{
  let sel=await p.evaluate(i=>{const items=[[...document.querySelectorAll('h2')].find(e=>e.innerText==='내 정보 내보내기'),document.querySelectorAll('ol')[0],document.querySelectorAll('ol')[1],[...document.querySelectorAll('div')].find(e=>e.textContent.startsWith('프로필 삭제 요청 후 30일')&&e.textContent.length<450)];let e=items[i];if(!e)return null;e.id='codex-capture-target';e.scrollIntoView({block:'center'});return '#codex-capture-target'},index);
  console.log(JSON.stringify({name,sel,result:await capture(p,f,name,[sel],{width:1280,height:1000})}));
 }catch(e){console.log(JSON.stringify({name,error:String(e)}));}
 await p.evaluate(()=>document.querySelector('#codex-capture-target')?.removeAttribute('id'));
}
