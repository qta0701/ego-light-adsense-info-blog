const task = await taskSpace('research-20261113-bank2-row17');
console.log(JSON.stringify({spaceId:task.spaceId, ownership:task.ownership}));
const page = task.page('p1');
await page.goto('https://www.google.com/search?q='+encodeURIComponent('신한은행 간편조회'));
console.log(await page.snapshot());
