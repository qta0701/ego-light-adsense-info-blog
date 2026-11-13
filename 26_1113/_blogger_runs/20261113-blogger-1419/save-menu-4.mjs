const task=await taskSpace(46),page=task.page('p1'); console.log((await page.snapshot()).slice(-1800));
