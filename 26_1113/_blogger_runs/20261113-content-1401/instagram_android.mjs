const task = await taskSpace(25);
const page = task.page('p1');
await page.click('loc=role:tab[name="Android 앱 도움말"]');
console.log((await page.snapshot({scope:'full_page'})).slice(0,13500));
