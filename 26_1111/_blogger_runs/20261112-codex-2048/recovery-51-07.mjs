const task=await taskSpace(21); const page=task.page('p1');
await page.focus('@397'); await page.keyboard.press('Space');
console.log((await page.snapshot()).slice(-2500));
