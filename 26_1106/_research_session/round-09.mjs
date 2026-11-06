const t=await taskSpace(1);const p=t.page('p1');const q=t.page('p3');const k=t.page('p2');
console.log('POLICE', (await p.snapshot()).slice(-12000));
console.log('KAKAO INFO',await k.info());console.log('KAKAO DOM',await k.evaluate(()=>({text:document.body.innerText.slice(-2500),buttons:[...document.querySelectorAll('button')].slice(-2).map(e=>({html:e.outerHTML}))})));
console.log('CORAIL',await q.evaluate(()=>({text:document.body.innerText.slice(-6000),inputs:[...document.querySelectorAll('input')].map(i=>i.outerHTML),btns:[...document.querySelectorAll('button')].filter(e=>e.closest('li')?.textContent.includes('코레일 주요')).map(e=>e.outerHTML)})));
