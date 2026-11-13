const task=await taskSpace(37);console.log(JSON.stringify(await task.tabs()));
const page=task.page('p1');console.log(JSON.stringify({url:await page.url(),snapshot:(await page.snapshot()).slice(0,2000)}));
