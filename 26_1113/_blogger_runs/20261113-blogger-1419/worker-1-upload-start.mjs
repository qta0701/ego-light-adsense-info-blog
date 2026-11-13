const task=await taskSpace(35),page=task.page('p1');
await page.click('loc=role:button[name="이미지 삽입"]');
console.log(await page.snapshot());
