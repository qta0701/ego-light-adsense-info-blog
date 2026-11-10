// Use only inside the installed ego-browser SDK, after observing the current DOM.
// These helpers do not publish. Preserve checkpoint state after every mutation.
import fs from 'node:fs/promises';
import path from 'node:path';

export async function withEditorLease(projectRoot, owner, action) {
  const directory = path.join(projectRoot, '.session', 'naver-workflow');
  await fs.mkdir(directory, {recursive: true});
  const leasePath = path.join(directory, 'editor-clipboard.lock');
  // Never steal a lock: another chat may be using the native clipboard.
  const lease = await fs.open(leasePath, 'wx');
  try {
    await lease.writeFile(JSON.stringify({owner, createdAt: new Date().toISOString()}));
    return await action();
  } finally {
    await lease.close();
    // Windows can briefly retain a handle after close. Retry only our own
    // cleanup; acquiring a lock still uses wx and never steals another lease.
    for(let attempt=0; ; attempt++) {
      try { await fs.unlink(leasePath); break; }
      catch(error) {
        if(!['EBUSY','EPERM','EACCES'].includes(error.code)||attempt>=5)throw error;
        await new Promise(resolve=>setTimeout(resolve,100));
      }
    }
  }
}

export async function focusEmptyTail(page) {
  await page.info();
  const point = await page.evaluate(() => {
    const last = [...document.querySelectorAll('.se-component')].at(-1);
    if (!last?.classList.contains('se-text')) throw new Error('Expected final text component');
    const paragraph = [...last.querySelectorAll('p')].at(-1);
    const actual = paragraph?.cloneNode(true);
    actual?.querySelectorAll('.se-placeholder').forEach(e=>e.remove());
    if (!paragraph || actual.textContent.trim()) throw new Error('Expected empty final paragraph');
    paragraph.scrollIntoView({block: 'center', behavior: 'instant'});
    const rect = paragraph.getBoundingClientRect();
    if (!rect.width || !rect.height) throw new Error('Final paragraph is not visible');
    return {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2};
  });
  await page.mouse.click(point.x, point.y);
  await page.snapshot();
  // SmartEditor inherits the preceding heading/caption's toggle state.
  // An explicit normal span plus a neutral caret prevents accidental all-bold text.
  const bold = await page.evaluate(() => document.querySelector('button[data-name="bold"]')?.textContent.includes('굵기 해제'));
  if (bold) {
    await page.click('button[data-name="bold"] >> nth=0');
    await page.waitForFunction(()=>!document.querySelector('button[data-name="bold"]')?.classList.contains('se-is-selected'),undefined,{timeout:5000});
  }
}

export async function appendRich(page, chunk) {
  await focusEmptyTail(page);
  const cleaned = await page.evaluate(html => {
    const box = document.createElement('div');
    box.innerHTML = html;
    while (box.firstElementChild && !box.firstElementChild.textContent.trim()) box.firstElementChild.remove();
    while (box.lastElementChild && !box.lastElementChild.textContent.trim()) box.lastElementChild.remove();
    return box.innerHTML;
  }, chunk.html);
  await page.keyboard.paste({html: cleaned, text: chunk.text.trim()});
  const tail = await page.evaluate(() => [...document.querySelectorAll('.se-component.se-text p')].at(-1)?.textContent || '');
  if (tail.trim()) {
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');
  }
}

export async function appendOpenGraph(page, url) {
  await focusEmptyTail(page);
  return insertOpenGraphAtCaret(page, url);
}

export async function selectMarker(page, marker) {
  const id=await page.evaluate(marker=>{
    const matches=[...document.querySelectorAll('.se-component.se-text p')].filter(p=>p.textContent.trim()===marker);
    if(matches.length!==1)throw new Error('Marker must be unique: '+marker);
    return matches[0].id;
  },marker);
  await page.info();
  const point=await page.evaluate(id=>{const p=document.getElementById(id);p.scrollIntoView({block:'center',behavior:'instant'});const r=p.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+Math.min(10,r.height/2)};},id);
  await page.mouse.click(point.x,point.y,{clickCount:3});
  await page.waitForFunction(id=>document.getElementById(id)?.classList.contains('se-is-text-paragraph-block-selected'),id,{timeout:5000});
  return id;
}

export function fullRichDocument(data) {
  return {html:data.chunks.map(c=>c.kind==='html'?c.html:'<p style="font-weight:400;color:#000;font-size:16px"><span style="font-weight:400">'+c.marker+'</span></p>').join(''),text:data.chunks.map(c=>c.text||c.marker).join('\n')};
}

export async function insertOpenGraphAtCaret(page, url) {
  const count=await page.evaluate(()=>document.querySelectorAll('.se-component.se-oglink').length);
  await page.keyboard.paste(url);await page.keyboard.press('Enter');
  await page.waitForFunction(n=>document.querySelectorAll('.se-component.se-oglink').length===n+1,count,{timeout:20000});
  await page.waitForFunction(()=>{const i=[...document.querySelectorAll('.se-component.se-oglink')].at(-1)?.querySelector('img');return i?.complete&&i.naturalWidth>0;},undefined,{timeout:20000});
  const id=await page.evaluate(url=>[...document.querySelectorAll('.se-component.se-text p')].find(p=>p.textContent.trim()===url)?.id,url);
  if(!id)throw new Error('Raw URL paragraph not found; inspect before removal');
  await page.click('[id="'+id+'"]');
  await page.keyboard.press('Home');await page.keyboard.press('Shift+End');await page.keyboard.press('Backspace');
  for(let step=0;step<4;step++){
    const previous=await page.evaluate(()=>{const all=[...document.querySelectorAll('.se-component')],og=all.filter(e=>e.classList.contains('se-oglink')).at(-1),prev=all[all.indexOf(og)-1];return{table:prev?.classList.contains('se-table'),empty:prev?.classList.contains('se-text')&&!prev.textContent.trim()};});
    if(previous.table)return;
    if(!previous.empty)throw new Error('CTA/OG adjacency requires inspection');
    await page.keyboard.press('Backspace');
  }
  throw new Error('Empty text component remains before OG');
}

export async function convertedChunks(page, plan) {
  // Read the visible converter preview. Preserve real URLs through conversion.
  return page.evaluate(plan => {
    const preview = document.querySelector('#preview-content');
    if (!preview?.textContent.trim()) throw new Error('Converter preview is empty');
    const chunks = [], expected = [], nodes = [...preview.children];
    let buffer = [], linkIndex = 0;
    const flush = () => {
      while (buffer.length && !buffer[0].textContent.trim()) buffer.shift();
      while (buffer.length && !buffer.at(-1).textContent.trim()) buffer.pop();
      if (buffer.length) chunks.push({kind:'html', html:buffer.map(n=>n.outerHTML).join(''), text:buffer.map(n=>n.textContent).join('\n')});
      buffer = [];
    };
    for (const source of nodes) {
      const text = source.textContent.trim();
      const image = plan.images.find(i=>i.marker===text);
      const link = plan.links[linkIndex];
      if (image || (link && text===link.url)) {
        flush();
        chunks.push(image ? {kind:'image',...image} : {kind:'og',...link});
        if (!image) linkIndex++;
        continue;
      }
      const clone=source.cloneNode(true);
      // Freeze effective text styles at each text leaf. A normal <p> alone is
      // insufficient when the native rich editor has bold active at the caret.
      const originals=[source,...source.querySelectorAll('*')];
      const copies=[clone,...clone.querySelectorAll('*')];
      originals.forEach((el,index)=>{
        const style=getComputedStyle(el),copy=copies[index];
        const weight=style.fontWeight;
        copy.style.fontWeight=weight;
        [...copy.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim()).forEach(n=>{
          const span=document.createElement('span');
          span.style.fontWeight=weight;span.style.color=style.color;span.style.fontSize=style.fontSize;
          n.replaceWith(span);span.append(n);
        });
      });
      if(source.tagName==='P'&&text&&originals.every(e=>Number(getComputedStyle(e).fontWeight)<600)) {
        const lines=source.cloneNode(true);
        lines.querySelectorAll('br').forEach(br=>br.replaceWith('\n'));
        expected.push(...lines.textContent.split('\n').map(s=>s.trim()).filter(Boolean));
      }
      buffer.push(clone);
    }
    flush();
    if(linkIndex!==plan.links.length) throw new Error('Converted URL boundaries do not match plan');
    return {chunks,normalParagraphs:expected};
  },plan);
}

export async function repairNormalParagraphs(page, expected) {
  const ids=await page.evaluate(expected=>{
    const norm=s=>s.replace(/\s+/g,' ').trim(),normal=new Set(expected.map(norm));
    return [...document.querySelectorAll('.se-component.se-text p')].filter(p=>normal.has(norm(p.textContent))&&p.querySelector('b,strong')).map(p=>p.id);
  },expected);
  for(const id of ids){
    const point=await page.evaluate(id=>{const p=document.getElementById(id);p.scrollIntoView({block:'center'});const r=p.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+Math.min(10,r.height/2)};},id);
    await page.mouse.click(point.x,point.y,{clickCount:3});
    await page.snapshot();
    const bold=await page.evaluate(()=>document.querySelector('button[data-name="bold"]')?.classList.contains('se-is-selected'));
    if(!bold)throw new Error('Paragraph selection is not uniformly bold; inspect '+id);
    await page.click('button[data-name="bold"] >> nth=0');
    await page.waitForFunction(id=>!document.getElementById(id)?.querySelector('b,strong'),id,{timeout:5000});
  }
  return ids.length;
}

export async function auditStyles(page, expected) {
  return page.evaluate(expected=>{
    const d=document.querySelector('.se-component')?document:document.querySelector('iframe')?.contentDocument;
    if(!d)throw new Error('No Naver article DOM');
    const w=d.defaultView,norm=s=>s.replace(/\s+/g,' ').trim();
    const leaves=e=>{const result=[],walker=d.createTreeWalker(e,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode())if(n.textContent.trim()){const s=w.getComputedStyle(n.parentElement);result.push({text:n.textContent.trim().slice(0,55),weight:s.fontWeight,color:s.color,size:s.fontSize});}return result;};
    const paragraphs=[...d.querySelectorAll('.se-component.se-text p')];
    const components=[...d.querySelectorAll('.se-component')];
    return {
      cta:[...d.querySelectorAll('.se-component.se-table td')].filter(e=>e.textContent.includes('👇'))
        .map(e=>({background:w.getComputedStyle(e).backgroundColor,text:leaves(e)})),
      normal:expected.map(text=>{
        const p=paragraphs.find(p=>norm(p.textContent)===norm(text));
        return {source:text,found:!!p,bold:p?leaves(p).some(s=>Number(s.weight)>=600):null};
      }),
      images:[...d.querySelectorAll('.se-component.se-image')].map(e=>({
        loaded:!!e.querySelector('img')?.naturalWidth,
        caption:[...e.querySelectorAll('.se-caption p')].map(p=>p.textContent).join('\n')
      })),
      og:components.filter(e=>e.classList.contains('se-oglink')).map(e=>({
        thumbnail:!!e.querySelector('img')?.naturalWidth,
        previousTable:components[components.indexOf(e)-1]?.classList.contains('se-table'),
        links:[...e.querySelectorAll('a[href]')].map(a=>a.href)
      })),
      tables:components.filter(e=>e.classList.contains('se-table')).length,
      markers:paragraphs.filter(p=>/^NAVER(?:IMG|OG)\d+$/.test(p.textContent.trim())).length,
      rawUrls:paragraphs.filter(p=>/^https?:\/\//.test(p.textContent.trim())).length
    };
  },expected);
}

export function assertStyleAudit(audit, plan, {publicPage=false, expectedTables}={}) {
  const norm=s=>(s||'').replace(/\s+/g,' ').trim();
  const failures=[];
  if(audit.cta.length!==plan.links.length)failures.push('CTA count');
  if(audit.cta.some(c=>c.background!=='rgb(255, 248, 178)'||!c.text.length||c.text.some(t=>
    t.color!=='rgb(27, 27, 248)'||t.size!=='19px'||Number(t.weight)<600)))failures.push('CTA style');
  if(!audit.normal.length||audit.normal.some(p=>!p.found||p.bold))failures.push('Normal body missing/bold');
  if(audit.images.length!==plan.images.length||audit.images.some((im,i)=>
    !im.loaded||norm(im.caption)!==norm(plan.images[i]?.caption)))failures.push('Image/caption');
  if(audit.og.length!==plan.links.length||audit.og.some((og,i)=>!og.thumbnail||!og.previousTable||
    (publicPage&&(!og.links.length||og.links.some(url=>url!==plan.links[i].url)))))failures.push('OG');
  if(audit.rawUrls!==0||audit.markers!==0)failures.push('URL/marker residue');
  if(expectedTables!==undefined&&audit.tables!==expectedTables)failures.push('Table count');
  if(failures.length)throw new Error('Naver preflight failed: '+failures.join(', '));
  return true;
}

export async function uploadImage(page, absolutePath) {
  const count = await page.evaluate(() => document.querySelectorAll('.se-component.se-image').length);
  const waiting = page.waitForFileChooser({timeout: 10000});
  // Consume a possible chooser rejection even if the button itself fails.
  waiting.catch(() => {});
  await page.click('button[data-name="image"]');
  const chooser = await waiting;
  const receipt = await chooser.setFiles(absolutePath);
  if (receipt?.dialog) throw new Error('Upload dialog requires inspection');
  await page.waitForFunction(n => document.querySelectorAll('.se-component.se-image').length === n + 1, count, {timeout: 20000});
  await page.waitForFunction(() => [...document.querySelectorAll('.se-component.se-image')].every(element => {
    const image = element.querySelector('img');
    return !element.querySelector('.se-is-progress') && image?.complete && image.naturalWidth > 0;
  }), undefined, {timeout: 30000});
  return count + 1;
}

export async function addCaption(page, caption) {
  const id = await page.evaluate(() => [...document.querySelectorAll('.se-component.se-image')].at(-1).id);
  // Tall screenshots can extend beyond the viewport. Click their visible center,
  // then reveal the caption separately instead of relying on animated scrolling.
  const imagePoint=await page.evaluate(id=>{const e=document.getElementById(id).querySelector('img');e.scrollIntoView({block:'center',behavior:'instant'});const r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:Math.max(180,Math.min(innerHeight-80,r.y+r.height/2))};},id);
  await page.mouse.click(imagePoint.x,imagePoint.y);
  await page.waitForFunction(id=>document.getElementById(id).querySelector('.se-caption p')?.getBoundingClientRect().height>0,id,{timeout:5000});
  const captionPoint=await page.evaluate(id=>{const e=document.getElementById(id).querySelector('.se-caption p');e.scrollIntoView({block:'center',behavior:'instant'});const r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2};},id);
  await page.mouse.click(captionPoint.x,captionPoint.y);
  await page.keyboard.paste(caption);
  await page.waitForFunction(({id,caption})=>document.getElementById(id).querySelector('.se-caption p')?.textContent.replace(/\s+/g,' ').trim()===caption.replace(/\s+/g,' ').trim(),{id,caption},{timeout:5000});
}
