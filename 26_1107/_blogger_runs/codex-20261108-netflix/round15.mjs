const task=await taskSpace(7);const page=task.page('p1');
await page.focus('input[aria-label^="맞춤 퍼머링크"]');await page.press('input[aria-label^="맞춤 퍼머링크"]','Space');
console.log((await page.snapshot()).slice(-2500));
