const fs=await import('node:fs/promises'),file='Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/앱사용_타오바오 탈퇴 방법/웹조사/evidence/blogger-state.json',p=(await taskSpace(24)).page('p1');
await p.waitForFunction(()=>!!document.querySelector('[aria-label="변경사항이 저장되었습니다."]')||!!document.querySelector('[title="변경사항이 저장되었습니다."]'),undefined,{timeout:10000}).catch(()=>{});
console.log((await p.snapshot()).split('\n').filter(x=>/저장|게시/.test(x)).slice(0,6).join('\n'));
await p.click('loc=role:button[name="게시"]');console.log((await p.snapshot()).split('\n').slice(-35).join('\n'));
