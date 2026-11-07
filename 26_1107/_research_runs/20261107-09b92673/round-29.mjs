const t=await taskSpace(1),p=t.page('p1');await p.goto('https://www.google.com/search?q='+encodeURIComponent('site:netflix.com "끝장수사"'));
console.log(JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,10).map(a=>({text:a.innerText,href:a.href})))));
