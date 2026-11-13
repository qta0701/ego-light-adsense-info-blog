const task=await taskSpace(35),page=task.page('p1');
console.log(await page.snapshot({scope:'full_page'}));
console.log(JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('input[type=file]')].map(x=>({outer:x.outerHTML,rect:x.getBoundingClientRect().toJSON()})))));
