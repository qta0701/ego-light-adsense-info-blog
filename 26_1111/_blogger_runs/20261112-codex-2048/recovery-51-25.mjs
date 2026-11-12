const task=await taskSpace(21);const page=task.page('p1');
console.log(await page.evaluate(()=>[...document.querySelectorAll('a')].filter(e=>e.href.includes('/post/edit/7162964317827704236/3570757390590737972')).map(e=>{let p=e.closest('[role=listitem]');return {rect:p?.getBoundingClientRect().toJSON(),text:p?.innerText,html:p?.outerHTML.slice(-3500)};})));
