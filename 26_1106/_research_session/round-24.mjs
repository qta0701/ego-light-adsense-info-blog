import {mobile,capture} from './capture.mjs';const t=await taskSpace(1);const p=t.page('p1');await mobile(p);console.log((await p.snapshot()).slice(-1900));
await p.click('button:text-is("닫기")');await p.waitForSelector('button:text-is("닫기")',{state:'hidden'});
await p.evaluate(()=>document.querySelector('a[href="/cvlcpt/cvlcptAply.do?cvlcptId=MW-201"]').scrollIntoView({block:'center',behavior:'instant'}));
await capture(p,'앱사용_코레일 분실물 센터','06_경찰민원24_습득물검색메뉴',[{selector:'a[href="/cvlcpt/cvlcptAply.do?cvlcptId=MW-201"]',label:'1. 습득물 검색'},{selector:'a[href="/cvlcpt/cvlcptGdInfo.do?cvlcptId=MW-001"]',label:'2. 없으면 분실물 신고'}]);
