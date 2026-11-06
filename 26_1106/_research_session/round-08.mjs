import {mobile,capture,root} from './capture.mjs';const fs=await import('node:fs/promises');
const t=await taskSpace(1);console.log('TABS',await t.tabs());
const q=t.page('p3'); await mobile(q);console.log('CONTACT DOM',await q.evaluate(()=>({text:document.body.innerText.slice(-8000),inputs:[...document.querySelectorAll('input')].map(i=>({id:i.id,placeholder:i.placeholder})),buttons:[...document.querySelectorAll('button')].map(i=>({text:i.innerText,cls:i.className,id:i.id})).slice(-15)})));
await q.fill('loc=css:input[placeholder="검색어를 입력하세요."]','서울');await q.press('loc=css:input[placeholder="검색어를 입력하세요."]','Enter');console.log('SEARCH',await q.snapshot());
const p=t.page('p1');await p.click('loc=role:button[name="닫기"]');await mobile(p);
await capture(p,'앱사용_코레일 분실물 센터','05_경찰민원24_모바일첫화면');
await p.evaluate(()=>document.querySelector('a[href="/cvlcpt/cvlcptAply.do?cvlcptId=MW-201"]').scrollIntoView({block:'center'}));
await capture(p,'앱사용_코레일 분실물 센터','06_경찰민원24_습득물검색메뉴',[{selector:'a[href="/cvlcpt/cvlcptAply.do?cvlcptId=MW-201"]',label:'습득물 검색'},{selector:'a[href="/cvlcpt/cvlcptGdInfo.do?cvlcptId=MW-001"]',label:'분실물 신고'}]);
await p.click('loc=href:/cvlcpt/cvlcptAply.do?cvlcptId=MW-201',{label:'습득물 검색 조건 확인'});console.log('POLICE FIND',await p.snapshot());
