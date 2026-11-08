const spaces = await listTaskSpaces();
for (const [row,query] of [[53,'넷플릭스 한국 인기 영화'],[54,'넷플릭스 오리지널 역대 영화']]) {
  const s=spaces.find(x=>x.name===`codex-20261108-netflix-${row}`);
  const task=await taskSpace(s.id); const page=task.page('p1');
  await page.fill('input[aria-label="검색"]',query);
  await page.press('input[aria-label="검색"]','Enter');
  await page.waitForFunction(q=>decodeURIComponent(location.href).includes(q),query,{timeout:15000});
  console.log(JSON.stringify({row,spaceId:s.id,url:await page.url(),snapshot:await page.snapshot()}));
}
