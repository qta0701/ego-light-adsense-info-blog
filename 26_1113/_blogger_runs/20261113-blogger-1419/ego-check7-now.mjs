const task=await taskSpace(34),page=task.page('p1');console.log(JSON.stringify({url:await page.url(),snap:(await page.snapshot()).slice(0,3500)}));
