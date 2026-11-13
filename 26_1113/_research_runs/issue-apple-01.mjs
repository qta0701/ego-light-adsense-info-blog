const t=await taskSpace(2); const p=t.page('p1');
await p.goto('https://www.google.com/search?q='+encodeURIComponent('site:support.apple.com/ko-kr App Store 로그아웃 미디어 및 구입 항목'));
console.log(await p.snapshot());
console.log(JSON.stringify(await p.evaluate(()=>({url:location.href,links:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,8).map(a=>({text:a.innerText,url:a.href}))}))));
