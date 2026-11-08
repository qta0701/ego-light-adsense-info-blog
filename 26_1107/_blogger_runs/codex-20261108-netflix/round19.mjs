const task=await taskSpace(7);const page=task.page('p1');console.log((await page.snapshot()).slice(-2200));
