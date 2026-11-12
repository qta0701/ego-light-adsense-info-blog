const task=await taskSpace(21); const page=task.page('p1');
await page.click('loc=role:button[name="옵션 더보기"]');
console.log((await page.snapshot()).slice(-1500));
