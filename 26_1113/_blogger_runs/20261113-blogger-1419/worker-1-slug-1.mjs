const task=await taskSpace(35),page=task.page('p1');
await page.focus('@552');await page.keyboard.press('Space');
console.log((await page.snapshot()).slice(-2500));
