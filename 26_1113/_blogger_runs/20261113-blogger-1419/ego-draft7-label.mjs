const task=await taskSpace(34),page=task.page('p1');console.log((await page.snapshot()).slice(-3000));
