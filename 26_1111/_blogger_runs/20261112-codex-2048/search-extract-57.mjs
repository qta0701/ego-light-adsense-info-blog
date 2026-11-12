const p=(await taskSpace(27)).page('p1');
console.log('URL',await p.url());
console.log(JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('a[href*="/blog/post/edit/"]')].filter(a=>new URL(a.href).pathname.startsWith('/blog/post/edit/')).map(a=>a.parentElement.innerText.slice(0,200)))));
