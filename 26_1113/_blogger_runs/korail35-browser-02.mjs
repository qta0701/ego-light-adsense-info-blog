const task=await taskSpace(23); const page=task.page('p1');
await page.goto('https://www.korail.com/ticket/main');
console.log((await page.snapshot({scope:'full_page'})).slice(0,16000));
