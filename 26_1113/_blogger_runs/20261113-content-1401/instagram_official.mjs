const task = await taskSpace(25);
const page = task.page('p1');
await page.goto('https://help.instagram.com/370452623149242/?helpref=hc_fnav&locale=ko_KR');
console.log((await page.snapshot({scope:'full_page'})).slice(0,18000));
