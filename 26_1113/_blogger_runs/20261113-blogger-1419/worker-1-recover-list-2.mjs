const task=await taskSpace(37),page=task.page('p1');
await page.reload({waitUntil:'domcontentloaded',timeout:30000});
const s=await page.snapshot({scope:'full_page'});console.log(JSON.stringify({url:await page.url(),lines:s.split('\n').filter(x=>x.includes('코레일 민원접수')||x.includes('6033282310404400433')||x.includes('게시됨')).slice(0,15)}));
