const task=await taskSpace(35),page=task.page('p1');
console.log((await page.snapshot()).slice(-2400));
console.log(JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('[role="radio"]')].map(x=>({outer:x.outerHTML.slice(0,450)})))));
