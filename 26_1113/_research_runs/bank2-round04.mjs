import {observePage} from '../../tools/research_observe.mjs';
const fs=await import('node:fs/promises');
const root='Y:/antigravity-project/ego-light-adsense-info-blog/';
const m=JSON.parse(await fs.readFile(root+'26_1113/_research_runs/bank-2-manifest.json','utf8'));
for(const [row,title] of [[17,'신한간편서비스'],[18,'환전가이드-환전이용안내'],[19,'환율/외화예금 금리']]){
  const job=m.rows.find(x=>x.row===row), task=await taskSpace(job.spaceId), p=task.page('p1');
  const result=await p.click(`loc=css:a:has-text("${title}")`);
  console.log(JSON.stringify({row,receipt:result,tabs:await task.tabs()}));
  const pages=await task.pages(); const active=pages[pages.length-1];
  console.log(JSON.stringify({row, page:active.label, snapshot:(await active.snapshot()).slice(0,6500)}));
  console.log(JSON.stringify({row,evidence:await observePage(active,job.folder,'official-1',{maxChars:1500,linksLimit:5})}));
}
