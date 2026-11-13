const task=await taskSpace(35),page=task.page('p1');
console.log(JSON.stringify({url:await page.url(),snapshot:(await page.snapshot()).slice(0,5500)}));
