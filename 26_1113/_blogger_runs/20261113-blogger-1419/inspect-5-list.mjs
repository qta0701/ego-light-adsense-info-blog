const task=await taskSpace(47),page=task.page('p1');
await page.goto('https://www.blogger.com/blog/posts/1872124715220437079?hl=ko',{waitUntil:'domcontentloaded',timeout:30000});
await page.waitForFunction(()=>!document.body.innerText.includes('로드 중...'),undefined,{timeout:30000});
console.log(JSON.stringify({url:await page.url(),rows:await page.evaluate(()=>[...document.querySelectorAll('[role="listitem"]')].map(e=>({text:e.innerText,link:e.querySelector('a[href*="/blog/post/edit/"]')?.href})).filter(e=>e.text.includes('임시')))}));
console.log(await page.snapshot());
