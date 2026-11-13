const task = await taskSpace('kb-passbook-content-20261113-1401');
console.log('SPACE', task.spaceId);
const page = task.page('p1');
await page.goto('https://www.google.com/search?q='+encodeURIComponent('국민은행 통장사본 출력'));
console.log((await page.snapshot()).slice(0,9000));
