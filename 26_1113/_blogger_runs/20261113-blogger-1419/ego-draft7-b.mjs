const task=await taskSpace(34),page=task.page('p1');
await page.focus('input[aria-label^="맞춤 퍼머링크"]'); await page.press('input[aria-label^="맞춤 퍼머링크"]','Space');
await page.click('text="검색 설명"');
const snap=await page.snapshot(); console.log(snap.slice(-7000));
