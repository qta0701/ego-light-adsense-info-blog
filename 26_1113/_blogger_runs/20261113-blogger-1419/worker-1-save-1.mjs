const task=await taskSpace(35),page=task.page('p1');
await page.fill('input[aria-label="맞춤 퍼머링크 입력"]','app-store-sign-out-guide');await page.keyboard.press('Tab');
await page.click('loc=role:button[name="옵션 더보기"]');
console.log((await page.snapshot()).slice(0,2500));
