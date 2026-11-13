const task = await taskSpace(26);
const page = task.page('p1');
await page.goto('https://www.busanbank.co.kr/ib20/mnu/FPMFRX189002011');
console.log((await page.snapshot({scope:'full_page'})).slice(0,22000));
