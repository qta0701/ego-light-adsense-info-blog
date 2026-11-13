const task = await taskSpace(30);
const page = task.page('p1');
await page.goto('https://www.google.com/search?q='+encodeURIComponent('site:kbstar.com KB스타뱅킹 통장사본 저장'));
console.log(JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('a')].filter(a => a.querySelector('h3')).slice(0,8).map(a=>({title:a.innerText,url:a.href})))));
await page.goto('https://obank.kbstar.com/quics?page=C040611');
console.log('OFFICIAL', (await page.snapshot()).slice(0,4500));
