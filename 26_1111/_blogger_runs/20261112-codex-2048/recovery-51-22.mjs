const task=await taskSpace(21);const page=task.page('p1');
console.log(await page.evaluate(()=>{const a=[...document.querySelectorAll('a')].find(e=>(e.getAttribute('href')||'').includes('/blog/post/edit/7162964317827704236/3570757390590737972')); const p=a?.closest('[role=listitem]');return {text:p?.innerText,html:p?.outerHTML.slice(-6500)};}));
