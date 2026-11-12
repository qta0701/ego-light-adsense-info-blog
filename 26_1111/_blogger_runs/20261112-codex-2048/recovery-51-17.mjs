const task=await taskSpace(21); const page=task.page('p1');
console.log(await page.evaluate(()=>{let a=[...document.querySelectorAll('a[href*="3570757390590737972"]')];return a.map(e=>({outer:e.outerHTML, parent:e.closest('[role=listitem]')?.innerText}));}));
await page.hover('loc=href:/blog/post/edit/7162964317827704236/3570757390590737972');
console.log((await page.snapshot()).split('\n').filter((x,i,a)=>x.includes('번개장터 카드 결제')||x.includes('blog-post_565')||x.includes('3570757390590737972')||x.includes('게시됨')).slice(0,35).join('\n'));
console.log(await page.evaluate(()=>{const a=document.querySelector('a[href*="/post/edit/7162964317827704236/3570757390590737972"]');const p=a?.closest('[role=listitem]');return {text:p?.innerText, links:[...p?.querySelectorAll('a')||[]].map(x=>({href:x.href,label:x.getAttribute('aria-label')})),html:p?.outerHTML.slice(0,6000)};}));
