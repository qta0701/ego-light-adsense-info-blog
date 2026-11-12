const task=await taskSpace(21); const page=task.page('p1');
console.log(await page.evaluate(()=>[...document.querySelectorAll('a')].filter(e=>(e.href||'').includes('3570757390590737972')).map(e=>({href:e.href,outer:e.outerHTML,role:e.parentElement?.getAttribute('role')}))));
