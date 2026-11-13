const task=await taskSpace(47),page=task.page('p1');
console.log(JSON.stringify({url:await page.url(),info:await page.info(),snapshot:await page.snapshot()}));
