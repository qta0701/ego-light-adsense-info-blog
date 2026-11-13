const page=(await taskSpace(40)).page('p1');
await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');
await page.waitForSelector('text=찾아보기',{timeout:15000});
console.log(await page.snapshot());
