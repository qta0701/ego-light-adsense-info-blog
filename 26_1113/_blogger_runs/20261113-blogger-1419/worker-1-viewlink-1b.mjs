const task=await taskSpace(35),page=task.page('p1');
await page.hover('@659');await page.waitForTimeout(500);
console.log((await page.snapshot()).slice(2500,5200));
console.log(JSON.stringify(await page.evaluate(()=>{const a=document.querySelector('a[href^="/blog/post/edit/694192108971227039/4970818560955615714"]');let p=a;for(let i=0;i<5&&p;i++,p=p.parentElement){if(p.querySelector('a[aria-label*="보기"]'))return {text:p.innerText,links:[...p.querySelectorAll('a')].map(x=>({href:x.href,label:x.getAttribute('aria-label'),title:x.title}))};}return {anchor:a?.outerHTML};})));
