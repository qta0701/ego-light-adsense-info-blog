const task = await taskSpace('appstore-logout-content-20261113-1401');
const page = task.page('p1');
console.log('spaceId', task.spaceId);
await page.goto('https://www.google.com/search?q=%EC%95%B1%EC%8A%A4%ED%86%A0%EC%96%B4+%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83');
console.log(await page.snapshot({scope:'full_page'}));
