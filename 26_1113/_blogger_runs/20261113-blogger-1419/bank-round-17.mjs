const page=(await taskSpace(40)).page('p1');
await page.click('text="퍼머링크"');
await page.click('text="검색 설명"');
console.log(await page.snapshot());
