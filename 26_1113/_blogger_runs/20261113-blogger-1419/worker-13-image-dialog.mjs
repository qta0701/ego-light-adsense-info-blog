const task=await taskSpace(43),page=task.page('p1');
await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');
console.log(await page.snapshot());
