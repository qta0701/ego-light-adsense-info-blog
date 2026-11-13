const task = await taskSpace('busan-exchange-content-20261113-1401');
console.log('SPACE', task.spaceId);
const page = task.page('p1');
await page.goto('https://www.google.com/search?q='+encodeURIComponent('부산은행 환전'));
console.log((await page.snapshot()).slice(0,12000));
