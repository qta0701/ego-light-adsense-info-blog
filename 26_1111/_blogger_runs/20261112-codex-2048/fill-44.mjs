const fs=await import('node:fs/promises');const t=await taskSpace(15);const p=t.page('p1');await p.waitForSelector('loc=css:input[aria-label="제목"]');
const html=await fs.readFile('Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/_blogger_runs/20261112-codex-2048/publish-44.html','utf8');
await p.fill('loc=css:input[aria-label="제목"]','카카오톡 광고 차단 방법｜채널 메시지·배너·맞춤형 광고');
console.log(await p.evaluate(html=>{const cm=document.querySelector('.CodeMirror')?.CodeMirror;if(!cm)return 'missing editor';cm.setValue(html);cm.save();return {length:cm.getValue().length}},html));
console.log((await p.snapshot()).split('\n').slice(-40).join('\n'));
