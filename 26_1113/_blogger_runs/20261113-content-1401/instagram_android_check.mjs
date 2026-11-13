const task = await taskSpace(25);
const page = task.page('p1');
console.log('URL',await page.url());
console.log((await page.snapshot({scope:'full_page'})).slice(0,11000));
