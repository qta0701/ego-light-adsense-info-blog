const fs=await import('node:fs/promises');const run='Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/_blogger_runs/20261112-codex-2048';
const p=(await taskSpace(24)).page('p1'),html=await fs.readFile(`${run}/prepared-54/publish.html`,'utf8');
await p.fill('loc=css:input[aria-label="제목"]','타오바오 탈퇴 방법｜앱에서 계정 삭제하는 순서');
await p.evaluate(h=>{const cm=document.querySelector('.CodeMirror')?.CodeMirror;if(!cm)throw Error('no editor');cm.setValue(h);cm.save()},html);
await p.fill('loc=css:textarea[aria-label="쉼표로 라벨을 구분하세요."]','앱사용, 타오바오, 계정 탈퇴');await p.press('loc=css:textarea[aria-label="쉼표로 라벨을 구분하세요."]','Comma');await p.press('loc=css:textarea[aria-label="쉼표로 라벨을 구분하세요."]','Tab');
await p.click('text="검색 설명"');await p.fill('loc=css:textarea[aria-label="검색 설명 입력"]','타오바오 탈퇴 방법을 앱 메뉴 순서대로 안내합니다. 주문·환불·미납 조건과 탈퇴 메뉴가 없을 때 문의할 곳도 확인하세요.');
await p.click('text="퍼머링크"');await p.focus('loc=css:div[role="radio"][aria-label^="맞춤 퍼머링크"]');await p.press('loc=css:div[role="radio"][aria-label^="맞춤 퍼머링크"]','Space');await p.fill('loc=css:input[aria-label="맞춤 퍼머링크 입력"]','taobao-account-deletion');await p.press('loc=css:input[aria-label="맞춤 퍼머링크 입력"]','Tab');
await p.click('loc=role:button[name="옵션 더보기"]');console.log(await p.snapshot());
