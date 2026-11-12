const task=await taskSpace(21); const page=await task.newPage();
await page.goto('https://app.supportimes.com/2026/11/blog-post_565.html',{waitUntil:'domcontentloaded',timeout:30000});
console.log({url:await page.url(),title:await page.title(),sample:(await page.snapshot()).slice(0,1800)});
await page.close();
