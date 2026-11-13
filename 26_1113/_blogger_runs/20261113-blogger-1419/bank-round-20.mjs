const page=(await taskSpace(40)).page('p1');
await page.click('text="퍼머링크"');
console.log((await page.snapshot()).slice(-2200));
