const task=await taskSpace(46),page=task.page('p1');await page.hover('a[href*="/blog/post/edit/1872124715220437079/7673303939056881825"]');
console.log(JSON.stringify(await page.evaluate(()=>{const a=document.querySelector('a[href*="/blog/post/edit/1872124715220437079/7673303939056881825"]');const row=a.closest('[role=listitem]');return {text:row.innerText,links:[...row.querySelectorAll('a')].map(x=>({href:x.href,aria:x.getAttribute('aria-label'),title:x.getAttribute('title')}))}})));
console.log((await page.snapshot()).slice(0,4500));
