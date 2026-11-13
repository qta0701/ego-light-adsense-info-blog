const task=await taskSpace(35),page=task.page('p1');
await page.hover('a[href*="/blog/post/edit/694192108971227039/4970818560955615714"]');
console.log(JSON.stringify(await page.evaluate(()=>{const a=document.querySelector('a[href*="/blog/post/edit/694192108971227039/4970818560955615714"]');const row=a?.closest('li')||a?.parentElement;return {text:row?.innerText,links:[...row?.querySelectorAll('a')||[]].map(x=>({href:x.href,label:x.getAttribute('aria-label'),title:x.getAttribute('title')}))}})));
console.log((await page.snapshot()).slice(2500,5500));
