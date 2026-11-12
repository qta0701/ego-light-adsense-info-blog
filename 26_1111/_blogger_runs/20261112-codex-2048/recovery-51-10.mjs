const task=await taskSpace(21); const page=task.page('p1');
await page.click('loc=role:menuitem[name="저장"]');
await page.waitForFunction(()=>document.body.innerText.includes('변경사항이 저장되었습니다'),undefined,{timeout:20000}).catch(e=>console.log('save wait:',e.message));
await page.goto('https://www.blogger.com/blog/post/edit/7162964317827704236/3570757390590737972?hl=ko',{waitUntil:'domcontentloaded',timeout:30000});
console.log((await page.snapshot()).slice(-2200));
