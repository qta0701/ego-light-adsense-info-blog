const task=await taskSpace(21); const page=task.page('p1');
await page.fill('loc=css:input[aria-label="검색"]','번개장터 카드 결제'); await page.press('loc=css:input[aria-label="검색"]','Enter');
await page.waitForTimeout(2000); console.log((await page.snapshot()).slice(-6500));
