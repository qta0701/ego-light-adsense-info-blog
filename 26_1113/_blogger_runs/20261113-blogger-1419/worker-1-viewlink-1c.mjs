const task=await taskSpace(35),page=task.page('p1');
await page.hover('text="앱스토어 로그아웃 방법: 아이폰·아이패드와 맥에서 계정 바꾸기"');await page.waitForTimeout(500);
console.log((await page.snapshot()).slice(2500,5300));
console.log(JSON.stringify(await page.evaluate(()=>{const a=document.querySelector('a[href^="/blog/post/edit/694192108971227039/4970818560955615714"]');let p=a;const rows=[];for(let i=0;i<5&&p;i++,p=p.parentElement)rows.push({tag:p.tagName,role:p.getAttribute('role'),text:p.innerText?.slice(0,300),links:[...p.querySelectorAll('a')].map(x=>({href:x.href,label:x.getAttribute('aria-label'),title:x.title}))});return rows;})));
