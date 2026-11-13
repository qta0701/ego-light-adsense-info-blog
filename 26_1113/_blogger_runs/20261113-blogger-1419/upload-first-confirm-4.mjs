const fs=await import('node:fs/promises'), p='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/노하우_앱스토어 국가변경/웹조사/evidence/blogger-state.json';
const task=await taskSpace(46),page=task.page('p1');
await page.click('@328'); await page.click('@334');
await page.waitForFunction(()=>[...document.querySelectorAll('.CodeMirror')].some(x=>x.CodeMirror?.getValue().includes('02_02_conditions')),undefined,{timeout:20000});
const value=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror)?.CodeMirror.getValue());
const urls=[...value.matchAll(/https:\/\/[^"\s<>]+/g)].map(x=>x[0]);
const s=JSON.parse(await fs.readFile(p,'utf8')); s.images[0].url=urls.find(x=>x.includes('02_02_conditions')); if(!s.images[0].url) throw Error('URL not identified'); s.images[0].uploadedAt=new Date().toISOString(); s.stage='uploading'; await fs.writeFile(p,JSON.stringify(s,null,2));
console.log(JSON.stringify({id:s.images[0].id,url:s.images[0].url,code:value}));
