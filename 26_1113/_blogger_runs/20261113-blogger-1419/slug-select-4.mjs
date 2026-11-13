const task=await taskSpace(46),page=task.page('p1');
await page.focus('div[role="radio"][aria-label^="맞춤 퍼머링크"]'); await page.press('div[role="radio"][aria-label^="맞춤 퍼머링크"]','Space');
await page.waitForSelector('input[aria-label="맞춤 퍼머링크 입력"]',{state:'visible',timeout:10000});
await page.fill('input[aria-label="맞춤 퍼머링크 입력"]','change-app-store-country');
console.log((await page.snapshot()).slice(-2200));
