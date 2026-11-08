const task=await taskSpace(7);const page=task.page('p1');await page.click('loc=role:menuitem[name="저장"]');
await page.waitForSelector('text="변경사항이 저장되었습니다."',{state:'visible',timeout:30000});
console.log(JSON.stringify({row:53,saved:true}));
