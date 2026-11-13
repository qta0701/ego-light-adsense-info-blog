const task=await taskSpace(43),page=task.page('p1');
await page.goto('https://www.blogger.com/blog/posts/3013546958093270596?hl=ko');
console.log(await page.snapshot());
