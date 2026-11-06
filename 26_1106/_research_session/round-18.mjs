import {mobile,capture,root} from './capture.mjs';const fs=await import('node:fs/promises');const t=await taskSpace(1);const s=t.page('p4');const q=t.page('p3');const p=t.page('p1');
await s.goto('https://www.kakaocorp.com/page/detail/12159');console.log('EVENT',await s.evaluate(()=>({url:location.href,text:document.body.innerText.slice(0,6000)})));
await fs.writeFile(root+'앱사용_카카오톡 무료 이모티콘/웹조사/카드뽑기_종료일_공식근거.json',JSON.stringify(await s.evaluate(()=>({url:location.href,text:document.body.innerText.slice(0,6500)})),null,2));
await mobile(s);await capture(s,'앱사용_카카오톡 무료 이모티콘','06_카드뽑기_공식기간확인');
await mobile(q);await q.evaluate(()=>document.querySelector('a[href="/ticket/guest/lost/register"] span.s_tit').scrollIntoView({block:'center',behavior:'instant'}));
await capture(q,'앱사용_코레일 분실물 센터','10_코레일_홈유실물메뉴',[{selector:'a[href="/ticket/guest/lost/register"]:has(span.s_tit)',label:'종합이용 가이드에서 유실물'}]);
await mobile(p);await capture(p,'앱사용_코레일 분실물 센터','12_경찰민원24_분실신고안내',[{text:'신고하기',label:'신고 전에 서비스 안내 확인'}]);
await fs.writeFile(root+'앱사용_코레일 분실물 센터/웹조사/분실신고안내_공식근거.json',JSON.stringify(await p.evaluate(()=>({url:location.href,text:document.body.innerText})),null,2));
await p.click('loc=role:button[name="신고하기"]',{label:'신고 로그인 단계 확인'});console.log('REPORT LOGIN',await p.snapshot());
