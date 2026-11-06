const t=await taskSpace(1);const p=t.page('p2');const q=t.page('p3');
await p.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await p.reload();
await p.screenshot({path:'Y:/antigravity-project/ego-light-adsense-info-blog/26_1106/앱사용_카카오톡 무료 이모티콘/웹조사/01_월이무_모바일첫화면_원본.png'});
console.log('KAKAO SNAP',await p.snapshot({scope:'full_page'}));
const url=await q.evaluate(()=>[...document.querySelectorAll('a')].find(a=>a.querySelector('h3')&&a.innerText.startsWith('유실물신고안내')).href);
await q.goto(url);console.log('KORAIL',await q.url());console.log((await q.snapshot()).slice(0,16000));
