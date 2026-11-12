const task=await taskSpace(21); const page=task.page('p1');
await page.waitForSelector('loc=css:input[aria-label="맞춤 퍼머링크 입력"]',{state:'visible',timeout:10000}).catch(e=>console.log(e.message));
console.log((await page.snapshot()).slice(-2400));
console.log(await page.evaluate(()=>[...document.querySelectorAll('[role=radio],input[aria-label*="퍼머링크"]')].map(e=>({tag:e.tagName,role:e.getAttribute('role'),label:e.getAttribute('aria-label'),checked:e.getAttribute('aria-checked'),value:e.value}))));
