// Run observePage through ego-browser nodejs. Saved evidence never supplies action refs.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {inside} from './research_browser.mjs';
const ROOT=fileURLToPath(new URL('../',import.meta.url));
function evidencePath(folder,name){
  if(!/^[\w가-힣-]{1,80}$/u.test(name))throw Error('Unsafe evidence name');
  return inside(ROOT,folder+'/evidence/'+name+'.page.json');
}
function rangeOptions({offset=0,maxChars=1500,linksLimit=5}={}){
  if(!Number.isInteger(offset)||offset<0)throw Error('Invalid offset');
  if(!Number.isInteger(maxChars)||maxChars<1||maxChars>6000)throw Error('maxChars must be 1..6000');
  if(!Number.isInteger(linksLimit)||linksLimit<0||linksLimit>10)throw Error('linksLimit must be 0..10');
  return {offset,maxChars,linksLimit};
}
function excerpt(saved,file,options,unchanged=false){
  const {offset,maxChars,linksLimit}=rangeOptions(options);
  const text=unchanged?'':saved.text.slice(offset,offset+maxChars);
  return {file:path.relative(ROOT,file).split(path.sep).join('/'),url:saved.url,title:saved.title,
    checkedAt:saved.checkedAt,sha256:saved.sha256,unchanged,offset,
    totalChars:saved.text.length,returnedChars:text.length,
    hasMore:offset+text.length<saved.text.length,text,
    links:unchanged?[]:saved.links.slice(0,linksLimit)};
}
export async function readPageEvidence(folder,name,options={}){
  const file=evidencePath(folder,name),saved=JSON.parse(await fs.readFile(file,'utf8'));
  return {...excerpt(saved,file,options),savedEvidence:true}; // No browser call; not live state.
}
export async function observePage(page,folder,name,options={}){
  rangeOptions(options);
  const selector=options.selector??'body'; // Use a selector observed in the current Page.
  if(typeof selector!=='string'||!selector.trim())throw Error('Invalid selector');
  const file=evidencePath(folder,name);
  let previous;try{previous=JSON.parse(await fs.readFile(file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
  const data=await page.evaluate(selector=>{
    const nodes=document.querySelectorAll(selector);
    if(nodes.length!==1)throw Error('Evidence target is missing or ambiguous: '+selector);
    const node=nodes[0];
    const visible=el=>!!el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden'&&getComputedStyle(el).display!=='none';
    if(!visible(node))throw Error('Evidence target is hidden');
    return {url:location.href,title:document.title.slice(0,300),text:node.innerText,
      links:[...node.querySelectorAll('a[href]')].filter(visible).slice(0,10)
        .map(a=>({title:a.innerText.trim().slice(0,220),url:a.href})).filter(a=>/^https?:/.test(a.url))};
  },selector);
  if(typeof data.text!=='string')throw Error('Evidence target has no rendered text');
  const sha256=createHash('sha256').update(JSON.stringify({selector,...data})).digest('hex');
  const saved={...data,selector,sha256,checkedAt:new Date().toISOString()};
  await fs.mkdir(path.dirname(file),{recursive:true});
  await fs.writeFile(file,JSON.stringify(saved,null,2),'utf8');
  return excerpt(saved,file,options,previous?.sha256===sha256&&options.repeat!==true);
}
