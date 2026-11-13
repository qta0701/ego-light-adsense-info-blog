const task=await taskSpace(46),page=task.page('p1');
await page.click('text="퍼머링크"'); await page.click('text="검색 설명"');
console.log(await page.snapshot());
