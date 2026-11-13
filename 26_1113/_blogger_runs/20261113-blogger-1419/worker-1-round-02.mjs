const fs = await import('node:fs/promises');
const base='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
for (const [order,id,keyword] of [[1,35,'앱스토어 로그아웃'],[2,37,'코레일 민원접수'],[3,38,'테무 회원탈퇴']]) {
 try {
  const task=await taskSpace(id), page=task.page('p1');
  await page.fill('input[aria-label="검색"]',keyword);
  await page.press('input[aria-label="검색"]','Enter');
  await page.waitForFunction(k=>decodeURIComponent(location.href).includes(k),keyword,{timeout:15000});
  const snapshot=await page.snapshot({scope:'full_page'});
  await fs.writeFile(`${base}/duplicate-${order}.txt`,snapshot,'utf8');
  console.log(JSON.stringify({order,url:await page.url(),snapshot:snapshot.slice(0,6000)}));
 } catch(e) {console.log(JSON.stringify({order,error:String(e)}));}
}
