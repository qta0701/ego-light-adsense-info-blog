const task = await taskSpace(20);
const page = task.page('p1');
await page.goto('https://info.korail.com/info/contents.do?key=818');
console.log((await page.snapshot({scope:'full_page'})).slice(0,15000));
