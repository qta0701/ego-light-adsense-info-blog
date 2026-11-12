const p=(await taskSpace(27)).page('p1');
console.log(JSON.stringify(await p.evaluate(()=>({matches:[...document.querySelectorAll('a[href*="/blog/post/edit/"]')].map(a=>a.parentElement.innerText).filter(s=>/애플|Apple|App Store|앱스토어/i.test(s)),body:document.body.innerText.slice(-1200)}))));
