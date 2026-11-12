const t=await taskSpace(27), p=t.page('p1');
await p.fill('loc=css:input[aria-label="검색"]','애플 환불');
await p.press('loc=css:input[aria-label="검색"]','Enter');
console.log(await p.snapshot());
