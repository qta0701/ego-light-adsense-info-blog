const task=await taskSpace(21); const page=task.page('p1');
await page.click('loc=role:menuitem[name="초안으로 되돌리기"]');
console.log((await page.snapshot()).slice(-4500));
