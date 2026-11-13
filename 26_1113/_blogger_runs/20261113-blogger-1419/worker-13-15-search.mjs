const fs = await import('node:fs/promises');
const base = 'Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
for (const [order,spaceId,keyword] of [[13,43,'신한은행 간편조회'],[14,44,'신한은행 환전'],[15,45,'하나은행 환율조회']]) {
 const task = await taskSpace(spaceId);
 const page = task.page('p1');
 await page.fill('loc=css:input[aria-label="검색"]',keyword);
 await page.press('loc=css:input[aria-label="검색"]','Enter');
 await page.waitForTimeout(1500);
 const snap = await page.snapshot({scope:'full_page'});
 await fs.writeFile(`${base}/duplicate-${order}.txt`,snap);
 console.log(JSON.stringify({order,url:await page.url(),snapshot:snap}));
}
