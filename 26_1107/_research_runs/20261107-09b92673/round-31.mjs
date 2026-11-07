const t=await taskSpace(1),p=t.page('p1');await p.goto('https://www.google.com/search?q='+encodeURIComponent('"81949585" 넷플릭스'));
console.log(JSON.stringify({text:(await p.evaluate(()=>document.body.innerText)).slice(0,3000),links:await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,6).map(a=>({text:a.innerText,href:a.href})))}));
