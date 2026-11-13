const t=await taskSpace(2),p=t.page('p1');
console.log(JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('h2,h3,p,li')].filter(e=>/미디어 및 구입 항목|로그아웃|iPhone 또는 iPad의 경우/.test(e.textContent)).map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,180)})).slice(-18))));
