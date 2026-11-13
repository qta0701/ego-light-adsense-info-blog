const task=await taskSpace(35),page=task.page('p1');
let snap=await page.snapshot({scope:'full_page'});if(!snap.includes('radiobutton "자동 퍼머링크"')){await page.click('text="퍼머링크"');}
await page.focus('loc=role:radio[name="자동 퍼머링크"]');await page.keyboard.press('Space');await page.keyboard.press('Tab');
await page.click('loc=role:button[name="옵션 더보기"]');await page.waitForTimeout(500);await page.click('loc=role:menuitem[name="저장"]');
await page.waitForSelector('[aria-label="변경사항이 저장되었습니다."]',{timeout:30000});
await page.reload({waitUntil:'domcontentloaded',timeout:30000});await page.waitForSelector('input[aria-label="제목"]',{timeout:30000});
await page.click('text="퍼머링크"');
console.log(JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('[role="radio"]')].map(x=>({label:x.getAttribute('aria-label'),checked:x.getAttribute('aria-checked')})))));
