const fs=await import('node:fs/promises');
const base='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
for (const [order,id] of [[1,35],[2,37],[3,38]]) {
 const task=await taskSpace(id),page=task.page('p1');
 const snapshot=await page.snapshot({scope:'full_page'});
 await fs.writeFile(`${base}/duplicate-settled-${order}.txt`,snapshot,'utf8');
 console.log(JSON.stringify({order,url:await page.url(),snapshot:snapshot.slice(-5000)}));
}
