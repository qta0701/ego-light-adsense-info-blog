const t=await taskSpace(10),p=t.page('p1');
await p.goto('https://www.google.com/search?q='+encodeURIComponent('site:terms.baemin.com/content/BAEMINCLUB_658 배민클럽 이용약관'));
console.log(JSON.stringify({info:await p.info(),links:await p.evaluate(()=>Array.from(document.querySelectorAll('a:has(h3)')).slice(0,8).map(a=>({title:a.innerText,href:a.href,id:a.querySelector('h3').id}))),snapshot:(await p.snapshot()).slice(-7000)}));
