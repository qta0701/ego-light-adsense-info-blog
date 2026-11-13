const task=await taskSpace(36),page=task.page('p1');console.log((await page.snapshot()).slice(-3000));
