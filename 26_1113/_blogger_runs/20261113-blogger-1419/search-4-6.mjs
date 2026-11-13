const fs = await import('node:fs/promises');
const root = 'Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
for (const [order, keyword] of [[4,'앱스토어 국가변경'],[5,'코레일 승차권 조회'],[6,'모바일 티머니 환불']]) {
  try {
    const {spaceId} = JSON.parse(await fs.readFile(`${root}/space-${order}.json`,'utf8'));
    const task = await taskSpace(spaceId); const page = task.page('p1');
    await page.fill('input[aria-label="검색"]',keyword);
    await page.press('input[aria-label="검색"]','Enter');
    await page.waitForFunction((k) => decodeURIComponent(location.href).includes(k),keyword,{timeout:15000});
    const snapshot = await page.snapshot({scope:'full_page'});
    await fs.writeFile(`${root}/duplicate-${order}.json`,JSON.stringify({order,keyword,spaceId,at:new Date().toISOString(),url:await page.url(),snapshot},null,2));
    console.log(JSON.stringify({order,spaceId,url:await page.url(),snapshot}));
  } catch(e) { console.log(JSON.stringify({order,error:String(e)})); }
}
