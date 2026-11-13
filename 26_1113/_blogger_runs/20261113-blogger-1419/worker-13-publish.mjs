const fs=await import('node:fs/promises'),base='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
const ok=JSON.parse(await fs.readFile(`${base}/publish-ok-13.json`,'utf8'));if(ok.postId!=='6771303869321967945'||!ok.serialized||ok.H!=='blank')throw Error('publish approval mismatch');
const task=await taskSpace(43),page=task.page('p1');await page.click('loc=role:button[name="게시"]');await page.waitForTimeout(500);console.log((await page.snapshot()).slice(-2500));
