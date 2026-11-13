const task=await taskSpace(46),page=task.page('p1');
await page.click('text="퍼머링크"'); await page.waitForSelector('input[aria-label^="맞춤 퍼머링크"]',{state:'attached',timeout:10000});
await page.focus('input[aria-label^="맞춤 퍼머링크"]'); await page.press('input[aria-label^="맞춤 퍼머링크"]','Space');
console.log((await page.snapshot()).slice(-2200));
console.log(JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('input')].filter(e=>e.offsetParent!==null).map(e=>e.outerHTML))));
