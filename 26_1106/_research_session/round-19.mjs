import {mobile,capture,root} from './capture.mjs';const fs=await import('node:fs/promises');const t=await taskSpace(1);const p=t.page('p1');const q=t.page('p3');const s=t.page('p4');
await mobile(p);console.log('LOGIN STATE',await p.snapshot());
await capture(p,'앱사용_코레일 분실물 센터','13_분실신고_로그인단계');
await s.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await s.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r(true)))));
await s.evaluate(()=>[...document.querySelectorAll('p')].find(e=>e.textContent.includes('[2026-10-12]')).scrollIntoView({block:'center',behavior:'instant'}));
await capture(s,'앱사용_카카오톡 무료 이모티콘','06_카드뽑기_공식기간확인');
await q.goto('https://www.korail.com/ticket/guest/lost/register');await mobile(q);await q.waitForSelector('a[href="#address"]');await q.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
await capture(q,'앱사용_코레일 분실물 센터','02_코레일_모바일신고안내',[{text:'철도고객센터 1588-7788,주요역 유실물 센터',label:'철도고객센터 1588-7788'},{selector:'a[href="#address"]',label:'역별 연락처로 이동'}]);
await p.goto('https://minwon24.police.go.kr/main.do');await mobile(p);console.log('HOME',await p.snapshot());
