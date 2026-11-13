import fs from 'node:fs/promises';
const t=await taskSpace(13),p=t.page('p1');console.log(JSON.stringify(await p.click('a:has(h3) >> nth=3')));console.log(JSON.stringify((await t.tabs()).map(({label,url,title})=>({label,url,title}))));
