const task=await taskSpace(46),page=task.page('p1');console.log(JSON.stringify({url:await page.url(),snapshot:(await page.snapshot()).slice(0,2500)}));
