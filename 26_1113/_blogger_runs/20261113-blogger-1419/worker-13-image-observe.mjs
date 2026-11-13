const task=await taskSpace(43),page=task.page('p1');
await page.waitForSelector('input[type=file]',{state:'attached',timeout:20000});
console.log(await page.snapshot());
