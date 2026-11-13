import {capture} from 'file:///Y:/antigravity-project/ego-light-adsense-info-blog/tools/research_browser.mjs';
const task=await taskSpace(26); const page=task.page('p1');
await page.cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
console.log(await page.evaluate(()=>{const r=[...document.querySelectorAll('tr')].find(x=>x.innerText.includes('배송 건당 10,000원'));r.scrollIntoView({block:'center'});return document.querySelectorAll('#conA1 > div > table:nth-child(13) tbody tr:nth-child(13)').length}));
console.log(await capture(page,'26_1113/은행_재테크_부산은행 환전/웹조사','06_delivery',['#conA1 > div > table:nth-child(13) tbody tr:nth-child(13)'],{width:1440,height:900}));
