import {capture} from 'file:///Y:/antigravity-project/ego-light-adsense-info-blog/tools/research_browser.mjs';
const task=await taskSpace(26); const page=task.page('p1');
await page.cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
console.log(await page.evaluate(()=>{const rows=[...document.querySelectorAll('tr')];const r=rows.find(x=>x.innerText.includes('배송 건당 10,000원'));r.scrollIntoView({block:'center'});return {text:r.innerText, selector:'table tr:nth-child('+([...r.parentElement.children].indexOf(r)+1)+')',parent:r.parentElement.outerHTML.slice(0,150)};}));
console.log(await capture(page,'26_1113/은행_재테크_부산은행 환전/웹조사','06_delivery',['#conA1 table:nth-of-type(1) tr:nth-child(15)'],{width:1440,height:900}));
