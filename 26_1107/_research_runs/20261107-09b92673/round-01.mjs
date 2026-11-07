const spaces = await Promise.all([1,2,3].map(id => taskSpace(id)));
console.log(JSON.stringify(await Promise.all(spaces.map(async t => {
  const p=t.page('p1');
  return {id:t.spaceId,url:await p.url(),snapshot:await p.snapshot({scope:'full_page'}), links:await p.evaluate(()=>Array.from(document.querySelectorAll('a')).filter(a=>a.querySelector('h3')).slice(0,12).map(a=>({text:a.innerText,href:a.href}))) };
}))));
