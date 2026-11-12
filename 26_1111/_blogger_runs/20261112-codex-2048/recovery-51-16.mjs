const task=await taskSpace(21); const page=task.page('p1');
console.log({url:await page.url()}); console.log((await page.snapshot()).slice(0,10000));
