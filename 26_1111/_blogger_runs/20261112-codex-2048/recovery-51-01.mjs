const task=await taskSpace(21); const page=task.page('p1');
console.log({spaceId:task.spaceId,url:await page.url(),tabs:await task.tabs()});
console.log(await page.snapshot());
