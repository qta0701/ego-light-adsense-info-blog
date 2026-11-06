import {mobile,capture,root} from './capture.mjs';const fs=await import('node:fs/promises');const t=await taskSpace(1);const p=t.page('p1');const k=t.page('p2');const q=t.page('p3');
await mobile(p);console.log('POLICE',await p.snapshot());
await p.click('loc=role:button[name="검색 필터"]',{label:'습득물 검색 필터 펼치기'});console.log('FILTER',await p.snapshot());
await k.goto('https://e.kakao.com/weekly_event?s=2mdzha');await mobile(k);await k.waitForSelector('loc=css:button[aria-label="짱 가까운 우리 사이(슈야 ver.) 선택"]');await k.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
await capture(k,'앱사용_카카오톡 무료 이모티콘','01_월이무_모바일첫화면',[{selector:'button[aria-label="짱 가까운 우리 사이(슈야 ver.) 선택"]',label:'이모티콘 선택 시작'},{text:'이모티콘 3개를 골라주세요',label:'3개 선택 전 버튼 확인'}]);
for(const name of ['짱 가까운 우리 사이(슈야 ver.)','짱 가까운 우리 사이(토야 ver.)','존댓말 톡 17']) await k.click('loc=css:button[aria-label="'+name+' 선택"]');
await k.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await capture(k,'앱사용_카카오톡 무료 이모티콘','02_이모티콘3종선택',[{selector:'button[aria-label="짱 가까운 우리 사이(슈야 ver.) 선택 해제"]',label:'1. 원하는 이모티콘 3종 선택'},{text:'다음주에받기',label:'2. 다음주에 받기'}]);
await k.evaluate(()=>[...document.querySelectorAll('h1,h2,h3,h4')].find(e=>e.textContent==='유의사항').scrollIntoView({block:'start',behavior:'instant'}));
await capture(k,'앱사용_카카오톡 무료 이모티콘','04_월이무_지급시점과유의사항',[{text:'어떻게 쓰나요?',label:'사용기간 72시간 확인'},{text:'참고해 주세요',label:'계정당 주 1회·중복 제한 확인'}]);
const imgs=await k.evaluate(()=>[...document.images].filter(i=>i.currentSrc.includes('item.kakaocdn.net')).slice(0,3).map(i=>({src:i.currentSrc,alt:i.alt})));
for(let i=0;i<imgs.length;i++){const res=await k.fetch(imgs[i].src,{saveAs:root+'앱사용_카카오톡 무료 이모티콘/웹조사/참고이미지_공식이모티콘_'+(i+1)+'.png'}); console.log('ASSET',i,res.status);}
await fs.writeFile(root+'앱사용_카카오톡 무료 이모티콘/웹조사/참고이미지_출처.json',JSON.stringify(imgs,null,2));
await mobile(q);console.log('TABLE',await q.evaluate(()=>[...document.querySelectorAll('td,li')].filter(e=>e.textContent.includes('02-755-7108')).map(e=>e.outerHTML.slice(0,1800)).slice(-3)));
