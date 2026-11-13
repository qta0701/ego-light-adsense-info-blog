const task = await taskSpace(18);
const page = task.page('p1');
console.log(await page.evaluate(() => { const e=[...document.querySelectorAll('h2')].find(e=>e.innerText.includes('가족 공유 설정')); return e.parentElement.outerHTML.slice(0,3500); }));
