const task = await taskSpace('korail-ticket-35-content-1401');
console.log('spaceId',task.spaceId);
const page=task.page('p1');
await page.goto('https://www.google.com/search?q=%EC%BD%94%EB%A0%88%EC%9D%BC%20%EC%8A%B9%EC%B0%A8%EA%B6%8C%20%EC%A1%B0%ED%9A%8C');
console.log((await page.snapshot()).slice(0,14000));
