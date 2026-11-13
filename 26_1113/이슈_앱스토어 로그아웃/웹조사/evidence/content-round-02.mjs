const task = await taskSpace(18);
const page = task.page('p1');
await page.goto('https://support.apple.com/ko-kr/108911');
console.log((await page.evaluate(() => document.body.innerText)).slice(0,14000));
