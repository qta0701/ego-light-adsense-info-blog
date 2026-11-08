const task=await taskSpace(7); const page=task.page('p1');
await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');
await page.waitForSelector('input[type=file]',{state:'attached',timeout:15000});
console.log(await page.snapshot());
