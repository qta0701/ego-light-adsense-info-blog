import {capture} from '../../tools/research_browser.mjs';
const t=await taskSpace(2),p=t.page('p1'),folder='26_1113/이슈_앱스토어 로그아웃/웹조사';
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1000,height:700,deviceScaleFactor:1,mobile:false});
for (const [name,tag,phrase] of [['02_iphone','li',"'미디어 및 구입 항목'을 탭합니다."],['03_signout','li',"'로그아웃'을 탭한 다음 '확인'을 탭합니다."],['04_mac','li',"메뉴 막대에서 '스토어'를 선택한 다음 '로그아웃'을 클릭합니다."]]) {
 await p.evaluate(({tag,phrase})=>{document.querySelectorAll('[data-research-target]').forEach(e=>e.removeAttribute('data-research-target')); const e=[...document.querySelectorAll(tag)].find(x=>x.textContent.trim()===phrase); if(!e)throw Error('missing '+phrase);e.setAttribute('data-research-target','yes'); e.scrollIntoView({block:'center'});},{tag,phrase});
 console.log(name,JSON.stringify(await capture(p,folder,name,['[data-research-target="yes"]'],{width:1000,height:700})));
}
