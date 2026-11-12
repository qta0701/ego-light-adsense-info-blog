const task=await taskSpace(21);const page=task.page('p1');const s=await page.snapshot();let i=s.indexOf('번개장터 카드 결제 방법');console.log(s.slice(i-300,i+2600));
