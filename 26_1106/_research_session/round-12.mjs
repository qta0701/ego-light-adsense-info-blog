import {mobile,capture,root} from './capture.mjs';const fs=await import('node:fs/promises');const t=await taskSpace(1);const p=t.page('p1');const k=t.page('p2');const q=t.page('p3');
await mobile(k);console.log('KAKAO',await k.snapshot());
console.log('FILTER DOM',await p.evaluate(()=>({text:document.body.innerText.slice(0,4500),controls:[...document.querySelectorAll('input,select,button')].filter(e=>e.closest('[role="region"]')).map(e=>({html:e.outerHTML.slice(0,700)}))})));
await mobile(p);await p.evaluate(()=>[...document.querySelectorAll('button')].find(e=>e.textContent.trim()==='검색 필터').scrollIntoView({block:'start',behavior:'instant'}));
await capture(p,'앱사용_코레일 분실물 센터','07_경찰민원24_검색필터',[{text:'검색 필터',label:'검색 조건 펼치기'}]);
await fs.writeFile(root+'앱사용_코레일 분실물 센터/웹조사/경찰민원24_검색_참고기록.json',JSON.stringify(await p.evaluate(()=>({url:location.href,text:document.body.innerText.slice(0,6500),links:[...document.querySelectorAll('a')].map(e=>({text:e.innerText,url:e.href}))})),null,2));
await mobile(q);await q.evaluate(()=>document.querySelector('input.searchBox').scrollIntoView({block:'center',behavior:'instant'}));
console.log('TABLE',await q.evaluate(()=>[...document.querySelectorAll('td,li')].filter(e=>e.textContent.includes('02-755-7108')).map(e=>e.outerHTML.slice(0,1500)).slice(-3)));
await capture(q,'앱사용_코레일 분실물 센터','03_역별연락처_서울검색',[{selector:'input.searchBox',label:'서울 입력 후 돋보기'},{text:'서울02-755-7108',label:'서울역 공식 연락처'}]);
