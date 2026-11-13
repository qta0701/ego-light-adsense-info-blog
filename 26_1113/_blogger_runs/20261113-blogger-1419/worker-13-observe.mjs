const task=await taskSpace(43), page=task.page('p1');
console.log(JSON.stringify({url:await page.url(),snapshot:await page.snapshot()}));
