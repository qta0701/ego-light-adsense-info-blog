import assert from 'node:assert/strict';
import {pool,inside,startBatch,finishJob,capture,pngSize,screenshotGeometry,ensureSheetsMenuWidth} from './research_browser.mjs';
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
const state=(width,height,targets=[[100,100,200,50]],extra={})=>({url:'https://example.com',width,height,scrollX:0,scrollY:0,devicePixelRatio:1,
  visual:{x:0,y:0,width,height,scale:1},targets,...extra});
const normal=state(1100,900);
assert.deepEqual(screenshotGeometry(normal,normal,{width:1100,height:900}).boxes,[[100,100,200,50]]);
const zoomed=state(1000,818,undefined,{devicePixelRatio:1.1});
assert.deepEqual(screenshotGeometry(zoomed,zoomed,{width:1100,height:900}).boxes,[[110,110,220,56]]);
const mobile=state(980,2120,[[100,100,200,50]]);
assert.deepEqual(screenshotGeometry(mobile,mobile,{width:390,height:844}).boxes,[[39,39,81,21]]);
const highDpi=state(800,600,undefined,{devicePixelRatio:2});
assert.deepEqual(screenshotGeometry(highDpi,highDpi,{width:1600,height:1200}).boxes,[[200,200,400,100]]);
for(const scale of [1.25,1.5]){
  assert.deepEqual(screenshotGeometry(highDpi,highDpi,{width:800*scale,height:600*scale}).boxes,[[100*scale,100*scale,200*scale,Math.ceil(50*scale)]]);
}
const scrollbar=state(1000,818,undefined,{visual:{x:0,y:0,width:986.1818237304688,height:818.1818237304688,scale:1},scrollbar:{width:14,height:0}});
assert.deepEqual(screenshotGeometry(scrollbar,scrollbar,{width:1100,height:900}).boxes,[[109,109,221,56]]);
const pinch=state(1000,800,[[125,80,100,50]],{visual:{x:25,y:30,width:500,height:400,scale:2}});
assert.deepEqual(screenshotGeometry(pinch,pinch,{width:1000,height:800}).boxes,[[200,100,200,100]]);
assert.throws(()=>screenshotGeometry(normal,{...normal,scrollY:1},{width:1100,height:900}),/changed/);
assert.throws(()=>screenshotGeometry(normal,{...normal,width:1200},{width:1100,height:900}),/changed/);
assert.throws(()=>screenshotGeometry(normal,{...normal,devicePixelRatio:1.5},{width:1100,height:900}),/changed/);
assert.throws(()=>screenshotGeometry(normal,{...normal,url:'https://other.example'},{width:1100,height:900}),/changed/);
assert.throws(()=>screenshotGeometry(normal,{...normal,targets:[[101,100,200,50]]},{width:1100,height:900}),/changed/);
assert.throws(()=>screenshotGeometry(normal,normal,{width:1100,height:700}),/aspect/);
assert.throws(()=>pngSize(Buffer.from('invalid')),/PNG/);
let menuWidth=888, menuWindowWidth=915;
const menuCalls=[];
const menuPage={
  cdp:async(method,params)=>{
    menuCalls.push([method,params]);
    if(method==='Browser.getWindowForTarget')return {windowId:7,bounds:{windowState:'normal',width:menuWindowWidth}};
    if(method==='Emulation.setDeviceMetricsOverride')menuWidth=params.width;
  },
  evaluate:async(fn)=>fn.toString().includes('requestAnimationFrame')?true:{width:menuWidth,height:900,outerWidth:menuWindowWidth}
};
assert.equal((await ensureSheetsMenuWidth(menuPage)).mode,'emulated');
assert.equal(menuWidth,2150);
assert.equal(menuCalls.at(-1)[0],'Emulation.setDeviceMetricsOverride');
await assert.rejects(ensureSheetsMenuWidth(menuPage,999),/Invalid menu width/);
const relative='.test-research-browser-'+randomUUID(), temp=inside(root,relative);
const previous=globalThis.taskSpace, originalLog=console.log;
let spaces=0, navigations=0, finishes=0;
const output=[];
try{
  await fs.mkdir(temp);
  // Mock CDP raster header: exercise capture's CSS-to-PNG contract and wx guard.
  const png=Buffer.alloc(24);Buffer.from([137,80,78,71,13,10,26,10]).copy(png);png.write('IHDR',12);png.writeUInt32BE(1100,16);png.writeUInt32BE(900,20);
  let states=0;
  const cdpCalls=[];
  let windowState='normal', restoreWindow=true;
  const mockPage={
    cdp:async(method,params)=>{
      cdpCalls.push([method,params]);
      if(method==='Browser.getWindowForTarget')return {windowId:42,bounds:{windowState}};
      if(method==='Browser.setWindowBounds'&&restoreWindow)windowState=params.bounds.windowState;
      if(method==='Page.captureScreenshot')return {data:png.toString('base64')};
    },
    evaluate:async(fn,arg)=>arg?zoomed:true
  };
  const captureFolder=relative+'/capture';await fs.mkdir(path.join(temp,'capture'));
  await fs.writeFile(path.join(temp,'capture/research.json'),'{}');
  const captured=await capture(mockPage,captureFolder,'zoom',[],{width:1100,height:900});
  assert.deepEqual(captured.boxes,[[110,110,220,56]]);
  assert.deepEqual(cdpCalls.map(([method])=>method),[
    'Browser.getWindowForTarget','Emulation.setDeviceMetricsOverride','Page.captureScreenshot'
  ]);
  const saved=JSON.parse(await fs.readFile(path.join(temp,'capture/evidence/zoom.json')));
  assert.equal(saved.coordinateSpace,'png-pixels');assert.equal(saved.width,1000);assert.equal(saved.pixelSize.width,1100);
  cdpCalls.length=0;windowState='minimized';
  const restored=await capture(mockPage,captureFolder,'restored',[],{width:1100,height:900});
  assert.deepEqual(restored.boxes,captured.boxes);
  assert.deepEqual(cdpCalls.slice(0,3),[
    ['Browser.getWindowForTarget',{}],
    ['Browser.setWindowBounds',{windowId:42,bounds:{windowState:'normal'}}],
    ['Browser.getWindowForTarget',{}]
  ]);
  assert.deepEqual(cdpCalls.slice(3).map(([method])=>method),[
    'Emulation.setDeviceMetricsOverride','Page.captureScreenshot'
  ]);
  cdpCalls.length=0;windowState='minimized';restoreWindow=false;
  await assert.rejects(capture(mockPage,captureFolder,'still-minimized'),/Could not restore/);
  assert.equal(cdpCalls.length,3);
  await assert.rejects(fs.stat(path.join(temp,'capture/raw/still-minimized.png')),/ENOENT/);
  windowState='normal';restoreWindow=true;
  await assert.rejects(capture(mockPage,captureFolder,'zoom'),/EEXIST/);
  const unstable={...mockPage,evaluate:async(fn,arg)=>arg?(states++===0?zoomed:{...zoomed,scrollY:10}):true};
  await assert.rejects(capture(unstable,captureFolder,'moving'),/changed/);
  await assert.rejects(fs.stat(path.join(temp,'capture/raw/moving.png')),/ENOENT/);
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
console.log('PASS: concurrency, path containment, isolated spaces, resume, queued wave, artifact integrity, finish once, window restoration, zoom/DPI/mobile/scrollbar coordinates, capture metadata, motion rejection, overwrite protection');
