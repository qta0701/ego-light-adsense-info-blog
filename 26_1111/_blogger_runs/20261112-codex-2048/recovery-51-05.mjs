const task=await taskSpace(21); const page=task.page('p1');
console.log(await page.info()); console.log(await page.evaluate(() => [...document.querySelectorAll('[role=dialog], [role=alertdialog]')].map(e=>e.innerText)));
console.log((await page.snapshot()).slice(0,3500));
