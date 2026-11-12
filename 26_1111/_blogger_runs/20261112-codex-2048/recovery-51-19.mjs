const task=await taskSpace(21); const page=task.page('p1');
await page.hover('text="번개장터 카드 결제 방법｜앱·PC, 할부와 수수료"');
const s=await page.snapshot();const i=s.indexOf('번개장터 카드 결제 방법');console.log(s.slice(i-250,i+2700));
