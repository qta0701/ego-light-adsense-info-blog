const task = await taskSpace('instagram-delete-content-20261113-1401');
console.log('SPACE', task.spaceId);
const page = task.page('p1');
await page.goto('https://www.google.com/search?q='+encodeURIComponent('인스타그램 탈퇴방법'));
console.log((await page.snapshot()).slice(0,12000));
