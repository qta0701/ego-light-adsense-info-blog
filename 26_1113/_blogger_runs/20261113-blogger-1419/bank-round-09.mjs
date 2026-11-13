const page=(await taskSpace(40)).page('p1');
console.log(await page.snapshot());
