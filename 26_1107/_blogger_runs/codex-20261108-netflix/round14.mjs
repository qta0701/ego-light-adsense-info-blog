const task=await taskSpace(7);const page=task.page('p1');
await page.click('text="퍼머링크"');await page.click('text="검색 설명"');
const snap=await page.snapshot();console.log(snap.slice(snap.lastIndexOf('text "글 설정"')));
