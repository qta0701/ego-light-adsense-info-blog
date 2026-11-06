import {mobile,capture,root} from './capture.mjs';const fs=await import('node:fs/promises');const t=await taskSpace(1);const q=t.page('p3');const p=t.page('p1');const k=t.page('p2');
const imgs=JSON.parse(await fs.readFile(root+'앱사용_카카오톡 무료 이모티콘/웹조사/참고이미지_출처.json','utf8'));
for(let i=0;i<imgs.length;i++){const res=await fetch(imgs[i].src);if(!res.ok)throw Error(res.status);await fs.writeFile(root+'앱사용_카카오톡 무료 이모티콘/웹조사/참고이미지_공식이모티콘_'+(i+1)+'.png',Buffer.from(await res.arrayBuffer()));console.log('ASSET',i,res.headers.get('content-type'));}
await mobile(q);await q.evaluate(()=>[...document.querySelectorAll('p')].find(e=>e.textContent.trim()==='유실물 수령').scrollIntoView({block:'start',behavior:'instant'}));
await capture(q,'앱사용_코레일 분실물 센터','04_본인대리수령_준비물',[{text:'유실물 수령',label:'본인 수령은 신분증 지참'},{selector:'a[href="/file/cubedata/COMMON/file/lost_form.hwp"]',label:'대리수령 위임장 서식'}]);
await q.goto('https://www.korail.com/ticket/main');await mobile(q);console.log('HOME',await q.snapshot());
await p.cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
await p.selectOption('#pkupPlcSeCd',{label:'기차'});await p.fill('#kpngPlcNm','서울역');
await p.evaluate(()=>document.querySelector('#pkupCmdtyLclsfCd').scrollIntoView({block:'start',behavior:'instant'}));
await capture(p,'앱사용_코레일 분실물 센터','08_경찰민원24_PC검색조건',[{selector:'#pkupPlcSeCd',label:'습득장소: 기차'},{selector:'#kpngPlcNm',label:'보관장소: 역 이름'},{selector:'button[onclick="fn_gridSearch_4(1)"]',label:'조건 확인 후 검색하기'}]);
const s=await t.newPage();await s.goto('https://www.google.com/search?q='+encodeURIComponent('site.kakaocorp.com 카카오톡 미니 이모티콘 무료 3종'));console.log('SOURCE SEARCH',s.label,await s.evaluate(()=>({text:document.body.innerText.slice(0,7000),links:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).map(a=>({title:a.innerText,url:a.href}))})));
