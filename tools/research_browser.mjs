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

let captureQueue=Promise.resolve();
export function capture(page,folder,name,selectors=[],viewport={width:390,height:844}){
  // Share this module instance across workers; no simultaneous capture/viewport changes.
  const work=async()=>{
    if(!/^[\w가-힣-]{1,80}$/u.test(name))throw Error('Unsafe capture name');
    const dir=inside(ROOT,folder), raw=path.join(dir,'raw');await fs.mkdir(raw,{recursive:true});
    const research=await read(path.join(dir,'research.json'));
    const limit=research.multiIntent===true&&research.exceptionReason?.trim()?14:12;
    if((await fs.readdir(raw)).filter(x=>/\.(png|jpg|webp)$/i.test(x)).length>=limit)throw Error(`Capture budget ${limit} reached; curate existing evidence`);
    await page.cdp('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:viewport.width<600});
    await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r(true)))));
    const meta=await page.evaluate(selectors=>({url:location.href,title:document.title,width:innerWidth,height:innerHeight,scrollX,scrollY,
      targets:selectors.map(selector=>{const nodes=document.querySelectorAll(selector);
        if(nodes.length!==1)throw Error('Target is missing or ambiguous: '+selector);
        const r=nodes[0].getBoundingClientRect();
        if(r.width<=0||r.height<=0||r.x<0||r.y<0||r.right>innerWidth||r.bottom>innerHeight)throw Error('Target outside viewport: '+selector);
        return [r.x,r.y,r.width,r.height];})}),selectors);
    if(meta.width!==viewport.width||meta.height!==viewport.height)throw Error('Viewport changed');
    const shot=await page.cdp('Page.captureScreenshot',{format:'png'});
    await fs.writeFile(path.join(raw,name+'.png'),Buffer.from(shot.data,'base64'),{flag:'wx'});
    await write(path.join(dir,'evidence',name+'.json'),{...meta,checkedAt:new Date().toISOString()});
    return {file:'raw/'+name+'.png',boxes:meta.targets,url:meta.url};
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
