const task=await taskSpace(25), page=task.page('p1');
await page.click('loc=role:button[name="채팅 닫기"]');
console.log(await page.evaluate(()=>{let e=document.querySelector('[data-capture-android]');for(let p=e.parentElement;p;p=p.parentElement){if(p.style.outline)p.style.outline='';}e.scrollIntoView({block:'center'});return e.innerText}));
const {capture}=await import('file:///Y:/antigravity-project/ego-light-adsense-info-blog/tools/research_browser.mjs');
console.log(await capture(page,'26_1113/노하우2_인스타그램 탈퇴방법/웹조사','07_android',['[data-capture-android="yes"]'],{width:1280,height:1000}));
