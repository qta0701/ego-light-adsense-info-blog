const t=await taskSpace(17);const p=t.page('p1');
console.log(await p.evaluate(()=>({title:document.querySelector('input[aria-label="제목"]')?.value, description:document.querySelector('textarea[aria-label="검색 설명 입력"]')?.value, cm:document.querySelector('.CodeMirror')?.innerText.slice(0,500), radio:[...document.querySelectorAll('input[type=radio]')].map(e=>e.outerHTML.slice(0,350))})));
console.log(await p.snapshot());
