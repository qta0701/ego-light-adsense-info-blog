const task=await taskSpace(34),page=task.page('p1');
await page.click('text="퍼머링크"');await page.waitForSelector('div[role=radio][aria-label^="맞춤 퍼머링크"]',{timeout:10000});
await page.focus('div[role=radio][aria-label^="맞춤 퍼머링크"]');await page.press('div[role=radio][aria-label^="맞춤 퍼머링크"]','Space');
await page.waitForSelector('input[aria-label="맞춤 퍼머링크 입력"]',{timeout:10000});await page.fill('input[aria-label="맞춤 퍼머링크 입력"]','jinhakapply-sign-up-guide');await page.press('input[aria-label="맞춤 퍼머링크 입력"]','Tab');
console.log(JSON.stringify(await page.evaluate(()=>({radio:document.querySelector('div[role=radio][aria-label^="맞춤 퍼머링크"]')?.getAttribute('aria-checked'),value:document.querySelector('input[aria-label="맞춤 퍼머링크 입력"]')?.value}))));
