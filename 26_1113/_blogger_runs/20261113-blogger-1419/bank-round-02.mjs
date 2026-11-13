const fs=await import('node:fs/promises');
const root='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
for (const [order,spaceId,keyword] of [[10,40,'부산은행 환전'],[11,41,'국민은행 환전신청'],[12,42,'국민은행 통장사본 출력']]) {
  const page=(await taskSpace(spaceId)).page('p1');
  try {
    await page.fill('input[aria-label="검색"]',keyword);
    await page.press('input[aria-label="검색"]','Enter');
    await page.waitForFunction((k)=>new URL(location.href).searchParams.get('q')?.includes(k),keyword,{timeout:15000});
    const snapshot=await page.snapshot({scope:'full_page'});
    await fs.writeFile(`${root}/duplicate-${order}.txt`,snapshot);
    console.log(JSON.stringify({order,url:await page.url(),snapshot}));
  } catch(e) {console.log(JSON.stringify({order,error:String(e),snapshot:await page.snapshot()}));}
}
