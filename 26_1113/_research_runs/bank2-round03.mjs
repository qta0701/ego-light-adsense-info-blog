import {observePage} from '../../tools/research_observe.mjs';
const fs = await import('node:fs/promises');
const root = 'Y:/antigravity-project/ego-light-adsense-info-blog/';
const manifestFile = root+'26_1113/_research_runs/bank-2-manifest.json';
const manifest = JSON.parse(await fs.readFile(manifestFile,'utf8'));
manifest.runManifest='26_1113/_research_runs/20261113-8e1eba35/manifest.json';
for (const row of manifest.rows) {
  row.folder=`26_1113/은행_재테크_${row.keyword}/웹조사`;
  await fs.writeFile(root+row.folder+'/evidence/browser.json',JSON.stringify({spaceId:row.spaceId,page:'p1',status:'searching'},null,2),'utf8');
}
await fs.writeFile(manifestFile,JSON.stringify(manifest,null,2),'utf8');
const results = await Promise.all(manifest.rows.map(async row => {
  const task=await taskSpace(row.spaceId); const page=task.page('p1');
  if(row.row!==17) await page.goto('https://www.google.com/search?q='+encodeURIComponent(row.keyword));
  const evidence=await observePage(page,row.folder,'search-1',{maxChars:1200,linksLimit:0});
  const candidates=await page.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,8).map(a=>({title:a.innerText.slice(0,160),url:a.href})));
  await fs.writeFile(root+row.folder+'/evidence/search-candidates.json',JSON.stringify(candidates,null,2),'utf8');
  return {row:row.row,evidence,candidates};
}));
console.log(JSON.stringify(results));
