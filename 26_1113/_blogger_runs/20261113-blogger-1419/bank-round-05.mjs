const page=(await taskSpace(40)).page('p1');
await page.click('loc=role:button[name="이미지 삽입"]');
console.log(await page.snapshot());
