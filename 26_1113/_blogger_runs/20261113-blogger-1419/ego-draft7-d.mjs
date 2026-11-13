const task=await taskSpace(34),page=task.page('p1');
await page.fill('input[aria-label="맞춤 퍼머링크 입력"]','jinhakapply-sign-up-guide');
await page.click('text="검색 설명"'); console.log((await page.snapshot()).slice(-2000));
