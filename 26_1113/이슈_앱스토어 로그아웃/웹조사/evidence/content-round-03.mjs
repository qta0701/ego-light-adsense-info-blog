const task = await taskSpace(18);
const page = task.page('p1');
console.log(await page.evaluate(() => [...document.querySelectorAll('h2,h3')].map(e=>({tag:e.tagName,id:e.id,text:e.innerText})).filter(x=>x.text.includes('가족 공유 설정')||x.text.includes('미디어 및 구입'))));
