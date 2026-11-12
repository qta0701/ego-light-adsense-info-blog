const task=await taskSpace(21); const page=task.page('p1');
await page.focus('loc=css:input[aria-label="맞춤 퍼머링크 입력"]');
await page.keyboard.press('ControlOrMeta+A'); await page.keyboard.type('bunjang-card-payment-guide'); await page.keyboard.press('Tab');
console.log((await page.snapshot()).slice(-2200));
