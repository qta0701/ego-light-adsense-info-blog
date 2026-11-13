const task=await taskSpace(25), page=task.page('p1');
await page.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
const found=await page.evaluate(()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(n.textContent.includes('Android에서 Instagram 앱을 사용하는 경우')){const el=n.parentElement;el.setAttribute('data-capture-android','yes');el.scrollIntoView({block:'center'});el.style.outline='4px solid red';return {text:el.innerText,tag:el.tagName};}}return null});
console.log(found);
const {capture}=await import('file:///Y:/antigravity-project/ego-light-adsense-info-blog/tools/research_browser.mjs');
console.log(await capture(page,'26_1113/노하우2_인스타그램 탈퇴방법/웹조사','06_android',['[data-capture-android="yes"]'],{width:1280,height:1000}));
