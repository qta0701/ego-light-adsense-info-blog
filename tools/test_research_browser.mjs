import assert from 'node:assert/strict';
import {pool,inside,startBatch,finishJob} from './research_browser.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {randomUUID,createHash} from 'node:crypto';
let running=0,peak=0;
const result=await pool([1,2,3,4],2,async n=>{
  running++;peak=Math.max(peak,running);
  await new Promise(r=>setTimeout(r,15));running--;return n*2;
});
assert.deepEqual(result,[2,4,6,8]);assert.equal(peak,2);
assert.throws(()=>inside(process.cwd(),'../outside'));
assert.throws(()=>inside(process.cwd(),'C:/old-machine/file'));
const root=fileURLToPath(new URL('../',import.meta.url));
const relative='.test-research-browser-'+randomUUID(), temp=inside(root,relative);
const previous=globalThis.taskSpace, originalLog=console.log;
let spaces=0, navigations=0, finishes=0;
const output=[];
try{
  await fs.mkdir(temp);
  globalThis.taskSpace=async name=>({spaceId:typeof name==='number'?name:++spaces,
    page:()=>({goto:async()=>{navigations++;},snapshot:async()=>'mock snapshot',
      evaluate:async()=>({url:'https://example.com',candidates:[]})}),
    finish:async()=>{finishes++;}});
  console.log=s=>output.push(JSON.parse(s));
  const jobs=[1,2,3].map(n=>({row:n+1,keyword:'fixture '+n,spaceName:'space-'+n,folder:relative+'/job'+n}));
  jobs[2].queries=['당근마켓 카드 결제 구매 방법','당근마켓 판매 수수료 정산'];
  const manifest=path.join(temp,'manifest.json');
  await fs.writeFile(manifest,JSON.stringify({concurrency:2,jobs}));
  await startBatch(pathToFileURL(manifest));
  assert.equal(spaces,2);assert.equal(navigations,2);assert.equal(output[0].queued,1);
  const a=JSON.parse(await fs.readFile(path.join(temp,'job1/evidence/browser.json')));
  const b=JSON.parse(await fs.readFile(path.join(temp,'job2/evidence/browser.json')));
  assert.notEqual(a.spaceId,b.spaceId);
  await startBatch(pathToFileURL(manifest));
  assert.equal(spaces,2);assert.equal(navigations,2); // Resume does not recreate or repeat search.
  const d=path.join(temp,'job1'), artifact='verified content', research='{}';
  const hash=s=>createHash('sha256').update(s).digest('hex');
  await fs.writeFile(path.join(d,'research.json'),research);
  await fs.writeFile(path.join(d,'artifact.md'),artifact);
  await fs.writeFile(path.join(d,'validation.json'),JSON.stringify({status:'ready_for_sheet',
    researchSha256:hash(research),artifactHashes:{'artifact.md':hash(artifact)}}));
  await fs.writeFile(path.join(d,'artifact.md'),'changed');
  await assert.rejects(finishJob(jobs[0].folder),/output changed/);
  assert.equal(finishes,0);
  await fs.writeFile(path.join(d,'artifact.md'),artifact);
  await finishJob(jobs[0].folder);await finishJob(jobs[0].folder);
  assert.equal(finishes,1);
  await startBatch(pathToFileURL(manifest));
  assert.equal(spaces,3);assert.equal(navigations,4); // One Space, two sequential searches in next wave.
}finally{
  globalThis.taskSpace=previous;console.log=originalLog;
  // Resolve and check the exact workspace-contained test directory before recursive cleanup.
  if(path.dirname(path.resolve(temp))!==path.resolve(root)||!path.basename(temp).startsWith('.test-research-browser-'))throw Error('Unsafe cleanup');
  await fs.rm(temp,{recursive:true,force:true});
}
console.log('PASS: concurrency, path containment, isolated spaces, resume, queued wave, artifact integrity, finish once');
