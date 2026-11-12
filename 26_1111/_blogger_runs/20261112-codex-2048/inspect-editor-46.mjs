const t=await taskSpace(17);const p=t.page('p1');
console.log(await p.evaluate(()=>[...document.querySelectorAll('textarea, input, [contenteditable], [role=textbox]')].map(e=>({tag:e.tagName,outer:e.outerHTML.slice(0,600)}))));
await p.click('text="퍼머링크"'); await p.click('text="검색 설명"'); console.log(await p.snapshot());
