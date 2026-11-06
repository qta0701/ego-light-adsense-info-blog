const spaces = await Promise.all([taskSpace(3), taskSpace(4)]);
for (const task of spaces) {
  const page = task.page('p1');
  console.log(JSON.stringify({space:task.spaceId, snap:(await page.snapshot()).slice(0,9000), links:await page.evaluate(() => [...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).map(a=>({title:a.innerText.slice(0,100),href:a.href,outer:a.outerHTML.slice(0,350)})).slice(0,10))}));
}
