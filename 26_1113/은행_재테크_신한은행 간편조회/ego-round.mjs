const task = await taskSpace('shinhan-easy-20261113-content-1401');
const page = task.page('p1');
console.log({spaceId:task.spaceId});
await page.goto('https://www.google.com/search?q=%EC%8B%A0%ED%95%9C%EC%9D%80%ED%96%89%20%EA%B0%84%ED%8E%B8%EC%A1%B0%ED%9A%8C');
console.log(await page.snapshot());
