const task=await taskSpace(35),page=task.page('p1');
console.log((await page.snapshot({scope:'full_page'})).slice(-2200));
