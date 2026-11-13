const task=await taskSpace(34),page=task.page('p1');
console.log(JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('[role=radio],input,textarea')].filter(e=>e.offsetParent).map(e=>({tag:e.tagName,role:e.getAttribute('role'),aria:e.getAttribute('aria-label'),outer:e.outerHTML.slice(0,600)})))));
console.log((await page.snapshot()).slice(-2200));
