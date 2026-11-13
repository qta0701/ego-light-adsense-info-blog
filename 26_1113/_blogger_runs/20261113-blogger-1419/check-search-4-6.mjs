const fs = await import('node:fs/promises');
const root = 'Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
for (const order of [4,5,6]) {
  try {
    const {spaceId}=JSON.parse(await fs.readFile(`${root}/space-${order}.json`,'utf8'));
    const task=await taskSpace(spaceId), page=task.page('p1');
    await page.waitForFunction(() => !document.body.innerText.includes('로드 중...'),undefined,{timeout:30000});
    const snap=await page.snapshot();
    const data={order,spaceId,at:new Date().toISOString(),url:await page.url(),snapshot:snap};
    await fs.writeFile(`${root}/duplicate-${order}.json`,JSON.stringify(data,null,2));
    console.log(JSON.stringify(data));
  } catch(e) {console.log(JSON.stringify({order,error:String(e)}));}
}
