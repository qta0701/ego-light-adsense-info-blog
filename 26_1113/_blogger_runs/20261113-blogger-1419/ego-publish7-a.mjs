const task=await taskSpace(34),page=task.page('p1');await page.click('loc=role:button[name="게시"]');console.log((await page.snapshot()).slice(-2500));
