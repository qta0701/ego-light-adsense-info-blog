const page=(await taskSpace(40)).page('p1');console.log((await page.snapshot()).slice(0,2500));console.log((await page.snapshot()).slice(-1200));
