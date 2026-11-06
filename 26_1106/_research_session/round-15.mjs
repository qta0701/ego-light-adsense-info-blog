import {mobile,capture,root} from './capture.mjs';const fs=await import('node:fs/promises');const t=await taskSpace(1);const s=t.page('p4');const q=t.page('p3');const p=t.page('p1');
await s.goto('https://www.kakaocorp.com/page/detail/10949');console.log('MINI',await s.evaluate(()=>({url:location.href,text:document.body.innerText.slice(0,11000),links:[...document.querySelectorAll('a')].filter(e=>e.href.includes('mini')).map(e=>({text:e.innerText,url:e.href})),images:[...document.images].map(e=>({alt:e.alt,src:e.currentSrc}))})));
await fs.writeFile(root+'앱사용_카카오톡 무료 이모티콘/웹조사/미니이모티콘_보도자료_참고기록.json',JSON.stringify(await s.evaluate(()=>({url:location.href,text:document.body.innerText})),null,2));
await mobile(q);await q.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await capture(q,'앱사용_코레일 분실물 센터','09_코레일_모바일홈',[{selector:'header button',label:'오른쪽 위 전체 메뉴'}]);
await q.click('loc=css:#header button',{label:'코레일 전체 메뉴 열기'});console.log('MENU',await q.snapshot());
await p.click('loc=css:button[onclick="fn_gridSearch_4(1)"]',{label:'기차와 서울역 조건 검색'});console.log('SEARCH RESULTS',await p.snapshot());
