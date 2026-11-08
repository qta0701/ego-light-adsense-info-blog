const spaces=await listTaskSpaces();
for (const row of [53,54]) {
 const s=spaces.find(x=>x.name===`codex-20261108-netflix-${row}`); const task=await taskSpace(s.id); const page=task.page('p1');
 console.log(JSON.stringify({row,spaceId:s.id,listing:await page.evaluate(()=>({text:document.body.innerText.slice(-3500),links:[...document.querySelectorAll('a[href*="/blog/post/edit/"]')].map(a=>({title:a.closest('li')?.innerText?.slice(0,300),href:a.href}))}))}));
}
