const task=await taskSpace(21); const page=task.page('p1');
await page.click('@427'); console.log((await page.snapshot()).slice(-2200));
