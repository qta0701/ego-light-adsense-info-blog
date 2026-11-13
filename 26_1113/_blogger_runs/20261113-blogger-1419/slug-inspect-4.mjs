const task=await taskSpace(46),page=task.page('p1');
console.log((await page.snapshot()).slice(-2500));
console.log(JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('[role=radio],input')].filter(e=>/퍼머링크/.test(e.getAttribute('aria-label')||'')).map(e=>e.outerHTML))));
