import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
import vm from 'node:vm';
import {observePage,readPageEvidence} from './research_observe.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const folder='.test-research-observe-'+randomUUID(),dir=path.join(root,folder);
let calls=0,url='https://example.com/guide',matches=1;
const text='공식 안내와 조건을 확인합니다. '.repeat(1000);
const node={innerText:text,getClientRects:()=>[{}],querySelectorAll:()=>[
  {innerText:'공식 문서',href:'https://example.com/source',getClientRects:()=>[{}]},
  {innerText:'숨김',href:'https://example.com/hidden',getClientRects:()=>[]} ]};
const page={evaluate:async(fn,arg)=>{
  calls++;
  return vm.runInNewContext('('+fn.toString()+')(selector)',{selector:arg,
    location:{href:url},document:{title:'공식 안내',querySelectorAll:()=>Array(matches).fill(node)},
    getComputedStyle:()=>({visibility:'visible',display:'block'})});
}};
try{
  const first=await observePage(page,folder,'guide',{selector:'main',maxChars:500});
  assert.equal(first.returnedChars,500);assert.equal(first.totalChars,text.length);assert.equal(first.hasMore,true);
  assert.equal(first.links.length,1);assert.equal(first.unchanged,false);
  const before=calls,more=await readPageEvidence(folder,'guide',{offset:500,maxChars:500});
  assert.equal(calls,before);assert.equal(more.text,text.slice(500,1000));assert.equal(more.savedEvidence,true);
  assert.equal((await observePage(page,folder,'guide',{selector:'main'})).returnedChars,0);
  assert.equal((await observePage(page,folder,'guide',{selector:'main',repeat:true,maxChars:123})).returnedChars,123);
  url='https://example.com/other';
  assert.equal((await observePage(page,folder,'guide',{selector:'main'})).unchanged,false); // URL is part of identity.
  matches=2;await assert.rejects(observePage(page,folder,'guide'),/ambiguous/);
  assert.equal((await readPageEvidence(folder,'guide')).url,url); // Failed reads preserve evidence.
  await assert.rejects(observePage(page,'../escape','guide'),/escapes/);
  await assert.rejects(observePage(page,folder,'../bad'),/Unsafe/);
  await assert.rejects(observePage(page,folder,'guide',{maxChars:6001}),/maxChars/);
  await assert.rejects(readPageEvidence(folder,'guide',{offset:-1}),/offset/);
  console.log(JSON.stringify({pass:true,fullBodyChars:text.length,returnedBodyChars:first.returnedChars,
    duplicateBodyChars:0,checks:'rendered DOM extraction, hidden links, budgets, pagination without browser, URL identity, ambiguity, paths'}));
}finally{
  if(path.dirname(path.resolve(dir))!==path.resolve(root)||!path.basename(dir).startsWith('.test-research-observe-'))throw Error('Unsafe cleanup');
  await fs.rm(dir,{recursive:true,force:true});
}
