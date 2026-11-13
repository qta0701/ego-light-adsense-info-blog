const task=await taskSpace(37),page=await task.newPage();console.log(JSON.stringify({spaceId:task.spaceId,page:page.label}));
await page.goto('https://www.blogger.com/blog/posts/694192108971227039?hl=ko',{waitUntil:'domcontentloaded',timeout:30000});
console.log((await page.snapshot()).slice(0,4000));
