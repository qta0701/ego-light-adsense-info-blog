import {mobile,capture} from './capture.mjs';
const t=await taskSpace(1);const p=t.page('p2');const q=t.page('p3');
await mobile(p); await p.evaluate(()=>scrollTo(0,0));
await capture(p,'앱사용_카카오톡 무료 이모티콘','02_이모티콘3종선택',[{selector:'button[aria-label="짱 가까운 우리 사이(슈야 ver.) 선택 해제"]',label:'1. 원하는 이모티콘 3종 선택'},{selector:'button[aria-label="존댓말 톡 17 선택 해제"]',label:'2. 노란 체크 확인'},{text:'다음주에받기',label:'3. 다음주에 받기'}]);
await p.click('loc=role:button[name*="다음주에"]',{label:'로그인 필요 단계 확인'});console.log('KAKAO',await p.snapshot());
await mobile(q);await q.evaluate(()=>scrollTo(0,0));
await capture(q,'앱사용_코레일 분실물 센터','02_코레일_모바일신고안내',[{text:'철도고객센터 1588-7788,주요역 유실물 센터',label:'철도고객센터 1588-7788'},{selector:'a[href="#address"]',label:'역별 연락처로 이동'}]);
await q.click('loc=href:/ticket/guest/lost/register#address',{label:'역별 유실물 연락처 찾기'});console.log('CONTACT',await q.snapshot());
const s=t.page('p1');await s.goto('https://minwon24.police.go.kr/');console.log('POLICE', (await s.snapshot()).slice(0,15000));
