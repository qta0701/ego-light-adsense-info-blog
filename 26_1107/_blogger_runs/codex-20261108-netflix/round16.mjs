const task=await taskSpace(7);const page=task.page('p1');await page.click('text="퍼머링크"');
console.log((await page.snapshot()).slice(-2000));
console.log(JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('[role=radio],input[aria-label^="맞춤"]')].filter(x=>x.getBoundingClientRect().width).map(x=>({tag:x.tagName,role:x.getAttribute('role'),label:x.getAttribute('aria-label'),checked:x.getAttribute('aria-checked'),outer:x.outerHTML.slice(0,400)})))));
