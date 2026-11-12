for (const [row,id,query] of [[44,15,'카카오톡 광고'],[45,16,'카카오톡 대화'],[46,17,'내일로']]) {
  const task=await taskSpace(id); const page=task.page('p1');
  await page.fill('loc=css:input[aria-label="검색"]',query);
  await page.press('loc=css:input[aria-label="검색"]','Enter');
  console.log('ROW',row,await page.snapshot());
}
