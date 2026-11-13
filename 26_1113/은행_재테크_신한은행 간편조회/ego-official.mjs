const task = await taskSpace(29);
const page = task.page('p1');
await page.goto('https://bank.shinhan.com/rib/easy/index.jsp#210000000000');
console.log(await page.snapshot({scope:'full_page'}));
