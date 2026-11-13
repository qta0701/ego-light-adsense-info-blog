const task = await taskSpace(20);
const page = task.page('p1');
console.log(await page.evaluate(() => [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(e=>e.textContent.includes('서면')).map(e=>({html:e.outerHTML, parent:e.parentElement.outerHTML.slice(0,2500)}))));
