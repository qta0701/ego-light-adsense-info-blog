const task = await taskSpace(4);
const page = task.page('p1');
await page.click('loc=role:link[name="로그인"]');
console.log(await page.snapshot());
await task.handOff();
console.log('Handed off the existing lookup space for Google sign-in.');
