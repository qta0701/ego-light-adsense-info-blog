const task=await taskSpace(25), page=task.page('p1');
const found=await page.evaluate(()=>{document.querySelector('[data-capture-android]')?.removeAttribute('data-capture-android');const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(n.textContent.includes('Android에서 Instagram 앱을 사용하는 경우')){let e=document.createElement('span');e.dataset.captureAndroid='yes';e.style.outline='4px solid red';n.parentNode.insertBefore(e,n);e.appendChild(n);e.scrollIntoView({block:'center'});return e.innerText;}}return null});
console.log(found);
const {capture}=await import('file:///Y:/antigravity-project/ego-light-adsense-info-blog/tools/research_browser.mjs');
console.log(await capture(page,'26_1113/노하우2_인스타그램 탈퇴방법/웹조사','06_android',['[data-capture-android="yes"]'],{width:1280,height:1000}));
