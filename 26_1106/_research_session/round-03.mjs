const t=await taskSpace(1); const p=t.page('p2');const q=t.page('p3');const fs=await import('node:fs/promises');
const base='Y:/antigravity-project/ego-light-adsense-info-blog/26_1106/';
console.log('PAGES',await t.pages());
const k=await p.evaluate(()=>({url:location.href,text:document.body.innerText,links:[...document.querySelectorAll('a')].map(a=>({text:a.innerText,url:a.href})),images:[...document.images].map(i=>({alt:i.alt,src:i.currentSrc}))}));
await fs.writeFile(base+'앱사용_카카오톡 무료 이모티콘/웹조사/공식이벤트_참고기록.json',JSON.stringify(k,null,2));console.log('KAKAO',k);
console.log('GOOGLE CORAIL',await q.evaluate(()=>({text:document.body.innerText.slice(0,6500),links:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).map(a=>({title:a.innerText,url:a.href}))})));
console.log('HELP');help('page.screenshot');
