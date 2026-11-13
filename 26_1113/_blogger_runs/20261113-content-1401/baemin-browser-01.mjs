const task = await taskSpace('baemin-refund-content-20261113');
const page = task.page('p1');
console.log('spaceId', task.spaceId);
await page.goto('https://www.google.com/search?q=%EB%B0%B0%EB%AF%BC%ED%81%B4%EB%9F%BD+%ED%99%98%EB%B6%88');
console.log((await page.snapshot({scope:'full_page'})).slice(0,12000));
