const task = await taskSpace('korail-voc-20261113-31');
console.log('spaceId', task.spaceId);
const page = task.page('p1');
await page.goto('https://www.google.com/search?q='+encodeURIComponent('코레일 민원접수'));
console.log((await page.snapshot({scope:'full_page'})).slice(0,10000));
