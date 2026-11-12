const t=await taskSpace(24),p=t.page('p1');
await p.waitForFunction(()=>!document.body.innerText.includes('추가 글 로드 중...'),undefined,{timeout:30000});
console.log(await p.snapshot());
