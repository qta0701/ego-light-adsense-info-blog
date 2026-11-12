// Run through ego-browser nodejs, not plain Node. Import is safe for unit tests.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const ROOT=fileURLToPath(new URL('../',import.meta.url));
export function inside(base,relative){
  if(path.isAbsolute(relative)||/^[A-Za-z]:/.test(relative)) throw Error('Relative path required');
  const p=path.resolve(base,relative), rel=path.relative(base,p);
  if(rel==='..'||rel.startsWith('..'+path.sep)) throw Error('Path escapes workspace');
  return p;
}
async function read(p){return JSON.parse(await fs.readFile(p,'utf8'));}
async function write(p,data){await fs.mkdir(path.dirname(p),{recursive:true});await fs.writeFile(p+'.tmp',JSON.stringify(data,null,2),'utf8');await fs.rename(p+'.tmp',p);}
export async function pool(items,limit,worker){
  let next=0;const results=[];
  await Promise.all(Array.from({length:Math.min(limit,items.length)},async()=>{
    while(next<items.length){const i=next++;results[i]=await worker(items[i],i);}
  }));return results;
}

// Keep the same TaskSpace window; CDP may be constrained by the window manager.
// Emulation is scoped to the current CDP session, so call again in each round.
export async function ensureSheetsMenuWidth(page,width=2150){
  if(!Number.isInteger(width)||width<1000||width>4000)throw Error('Invalid menu width');
  const initial=await page.cdp('Browser.getWindowForTarget',{});
  if(initial.bounds.windowState!=='normal'){
    await page.cdp('Browser.setWindowBounds',{windowId:initial.windowId,bounds:{windowState:'normal'}});
  }
  await page.cdp('Browser.setWindowBounds',{windowId:initial.windowId,bounds:{width}});
  await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r(true)))));
  const actual=await page.cdp('Browser.getWindowForTarget',{});
  if(actual.windowId!==initial.windowId)throw Error('TaskSpace window changed');
  let viewport=await page.evaluate(()=>({width:innerWidth,height:innerHeight,outerWidth}));
  if(viewport.width>=width)return {mode:'window',requestedWidth:width,bounds:actual.bounds,viewport};
  await page.cdp('Emulation.setDeviceMetricsOverride',{width,height:Math.max(600,viewport.height),deviceScaleFactor:1,mobile:false});
  viewport=await page.evaluate(()=>({width:innerWidth,height:innerHeight,outerWidth}));
  if(viewport.width!==width)throw Error('Could not set Sheets menu viewport width');
  return {mode:'emulated',requestedWidth:width,bounds:actual.bounds,viewport};
}
export async function startBatch(manifestUrl){
  const manifestPath=fileURLToPath(manifestUrl), manifest=await read(manifestPath);
  const runDir=path.dirname(manifestPath), lock=path.join(runDir,'start.lock');
  const handle=await fs.open(lock,'wx'); // Explicit recovery required after abrupt process death.
  try{
    const active=[];
    for(const job of manifest.jobs){
      const stateFile=inside(ROOT,job.folder+'/evidence/browser.json');
      let state={};try{state=await read(stateFile);}catch(e){if(e.code!=='ENOENT')throw e;}
      if(state.status!=='finished') active.push({job,state,stateFile});
    }
    // One wave: do not leave dozens of pending research spaces open.
    const wave=active.slice(0,manifest.concurrency);
    const results=await pool(wave,manifest.concurrency,async({job,state,stateFile})=>{
      if(state.status==='search_ready'||state.status==='blocked')return {row:job.row,...state};
      let task;
      try{
        task=await taskSpace(state.spaceId??job.spaceName);
        state={spaceId:task.spaceId,page:'p1',status:'searching'};
        await write(stateFile,state); // Persist identity before any navigation.
        const p=task.page('p1');
        const results=[];
        for(const [index,query] of (job.queries??[job.keyword]).entries()){
          await p.goto('https://www.google.com/search?q='+encodeURIComponent(query));
          const snapshot=await p.snapshot();
          const excerpt=await p.evaluate(()=>({url:location.href,title:document.title,
            text:document.body.innerText.slice(0,5000),
            candidates:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3'))
              .slice(0,10).map(a=>({title:a.innerText.slice(0,220),url:a.href}))}));
          // Candidates still require agent review for ads and source authority.
          await fs.writeFile(inside(ROOT,job.folder+`/evidence/search-${index+1}.snapshot.txt`),snapshot,'utf8');
          await write(inside(ROOT,job.folder+`/evidence/search-${index+1}.json`),{query,...excerpt});
          results.push({query,candidates:excerpt.candidates.slice(0,5)});
        }
        state.status='search_ready';await write(stateFile,state);
        return {row:job.row,keyword:job.keyword,...state,results};
      }catch(e){
        state.status='blocked';state.error=String(e.message).slice(0,500);
        await write(stateFile,state);return {row:job.row,...state};
      }
    });
    console.log(JSON.stringify({wave:results,queued:Math.max(0,active.length-wave.length)}));
  }finally{await handle.close();await fs.unlink(lock);}
}

// DOM boxes are CSS pixels. Screenshots may use a different scale because of
// browser zoom, device emulation or OS scaling; measure the PNG, never assume 1:1.
export function pngSize(bytes){
  if(bytes.length<24||!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||bytes.toString('ascii',12,16)!=='IHDR')throw Error('Invalid screenshot PNG');
  const width=bytes.readUInt32BE(16),height=bytes.readUInt32BE(20);
  if(!width||!height)throw Error('Empty screenshot PNG');
  return {width,height};
}
function captureState(selectors){
  const v=window.visualViewport;
  const visual={x:v?.offsetLeft??0,y:v?.offsetTop??0,width:v?.width??innerWidth,height:v?.height??innerHeight,scale:v?.scale??1};
  const scrollbar={width:Math.max(0,innerWidth-document.documentElement.clientWidth),height:Math.max(0,innerHeight-document.documentElement.clientHeight)};
  return {url:location.href,title:document.title,width:innerWidth,height:innerHeight,scrollX,scrollY,devicePixelRatio,visual,scrollbar,
    targets:selectors.map(selector=>{
      const nodes=document.querySelectorAll(selector);
      if(nodes.length!==1)throw Error('Target is missing or ambiguous: '+selector);
      const r=nodes[0].getBoundingClientRect();
      const box=[r.x-visual.x,r.y-visual.y,r.width,r.height];
      if(box[2]<=0||box[3]<=0||box[0]<0||box[1]<0||box[0]+box[2]>visual.width||box[1]+box[3]>visual.height)throw Error('Target outside viewport: '+selector);
      return [r.x,r.y,r.width,r.height];
    })};
}
export function screenshotGeometry(before,after,pixels){
  const numbers=s=>[s.width,s.height,s.scrollX,s.scrollY,s.devicePixelRatio,...Object.values(s.visual),...Object.values(s.scrollbar??{}),...s.targets.flat()];
  const a=numbers(before),b=numbers(after);
  if(before.url!==after.url||a.length!==b.length||a.some((n,i)=>!Number.isFinite(n)||!Number.isFinite(b[i])||Math.abs(n-b[i])>0.01))throw Error('Page changed during capture');
  const v=before.visual;
  if(v.width<=0||v.height<=0||pixels.width<=0||pixels.height<=0)throw Error('Invalid capture dimensions');
  // Chromium's visual viewport excludes classic scrollbars; its PNG includes
  // them. innerWidth/clientWidth are integer CSS values, so allow raster rounding.
  const raster={width:v.width+(before.scrollbar?.width??0)/v.scale,height:v.height+(before.scrollbar?.height??0)/v.scale};
  const sx=pixels.width/raster.width,sy=pixels.height/raster.height;
  // Allow subpixel/integer raster rounding, but reject a crop or wrong surface.
  const tolerance=Math.max(sx,sy)*2+1;
  if(Math.abs(pixels.height-raster.height*sx)>tolerance||Math.abs(pixels.width-raster.width*sy)>tolerance)throw Error('Screenshot aspect does not match visual viewport');
  const boxes=before.targets.map(([x,y,w,h])=>{
    const left=Math.floor((x-v.x)*sx),top=Math.floor((y-v.y)*sy);
    const right=Math.ceil((x-v.x+w)*sx),bottom=Math.ceil((y-v.y+h)*sy);
    if(left<0||top<0||right>pixels.width||bottom>pixels.height||right<=left||bottom<=top)throw Error('Target outside screenshot');
    return [left,top,right-left,bottom-top];
  });
  return {boxes,pixelSize:pixels,pixelScale:{x:sx,y:sy},rasterViewport:raster};
}

let captureQueue=Promise.resolve();
export function capture(page,folder,name,selectors=[],viewport={width:390,height:844}){
  // Share this module instance across workers; no simultaneous capture/viewport changes.
  const work=async()=>{
    if(!/^[\w가-힣-]{1,80}$/u.test(name))throw Error('Unsafe capture name');
    const dir=inside(ROOT,folder), raw=path.join(dir,'raw');await fs.mkdir(raw,{recursive:true});
    const research=await read(path.join(dir,'research.json'));
    const limit=research.multiIntent===true&&research.exceptionReason?.trim()?14:12;
    if((await fs.readdir(raw)).filter(x=>/\.(png|jpg|webp)$/i.test(x)).length>=limit)throw Error(`Capture budget ${limit} reached; curate existing evidence`);
    const {windowId,bounds}=await page.cdp('Browser.getWindowForTarget',{});
    if(bounds.windowState==='minimized'){
      await page.cdp('Browser.setWindowBounds',{windowId,bounds:{windowState:'normal'}});
      const restored=await page.cdp('Browser.getWindowForTarget',{});
      if(restored.windowId!==windowId||restored.bounds.windowState==='minimized'){
        throw Error('Could not restore the same TaskSpace window before capture');
      }
    }
    await page.cdp('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:viewport.width<600});
    await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r(true)))));
    const meta=await page.evaluate(captureState,selectors);
    const shot=await page.cdp('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});
    const after=await page.evaluate(captureState,selectors);
    const bytes=Buffer.from(shot.data,'base64');
    const geometry=screenshotGeometry(meta,after,pngSize(bytes));
    await fs.writeFile(path.join(raw,name+'.png'),bytes,{flag:'wx'});
    await write(path.join(dir,'evidence',name+'.json'),{...meta,requestedViewport:viewport,...geometry,coordinateSpace:'png-pixels',checkedAt:new Date().toISOString()});
    return {file:'raw/'+name+'.png',boxes:geometry.boxes,url:meta.url};
  };
  const result=captureQueue.then(work);captureQueue=result.catch(()=>{});return result;
}

export async function finishJob(folder){
  const dir=inside(ROOT,folder), stateFile=path.join(dir,'evidence/browser.json');
  const state=await read(stateFile);
  if(state.status==='finished')return;
  const validation=await read(path.join(dir,'validation.json'));
  const digest=createHash('sha256').update(await fs.readFile(path.join(dir,'research.json'))).digest('hex');
  if(validation.status!=='ready_for_sheet'||validation.researchSha256!==digest)throw Error('Pack and visually review current research.json before finish');
  if(!Object.keys(validation.artifactHashes??{}).length)throw Error('Missing validated artifacts');
  for(const [file,hash] of Object.entries(validation.artifactHashes??{})){
    if(createHash('sha256').update(await fs.readFile(inside(dir,file))).digest('hex')!==hash)throw Error('Pack output changed: '+file);
  }
  const task=await taskSpace(state.spaceId);await task.finish({keep:[]});
  await write(stateFile,{...state,status:'finished'});
}
