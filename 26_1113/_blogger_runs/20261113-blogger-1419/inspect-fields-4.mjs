const task=await taskSpace(46),page=task.page('p1');
console.log(JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('input,textarea,[role=radio]')].filter(e=>e.offsetParent!==null).map(e=>({tag:e.tagName,role:e.getAttribute('role'),type:e.getAttribute('type'),aria:e.getAttribute('aria-label'),placeholder:e.getAttribute('placeholder'),outer:e.outerHTML.slice(0,500)})))));
console.log((await page.snapshot()).slice(-3500));
