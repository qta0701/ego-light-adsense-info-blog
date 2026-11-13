const task=await taskSpace(43),page=task.page('p1');await page.click('@303');await page.waitForTimeout(200);console.log((await page.snapshot()).slice(-2000));
