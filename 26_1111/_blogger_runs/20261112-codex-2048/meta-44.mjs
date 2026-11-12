const t=await taskSpace(15);const p=t.page('p1');
await p.fill('loc=css:textarea[aria-label="쉼표로 라벨을 구분하세요."]','앱사용, 카카오톡');await p.press('loc=css:textarea[aria-label="쉼표로 라벨을 구분하세요."]','Comma');await p.press('loc=css:textarea[aria-label="쉼표로 라벨을 구분하세요."]','Tab');
await p.click('text="검색 설명"');await p.fill('loc=css:textarea[aria-label="검색 설명 입력"]','카카오톡 채널 광고 차단, Android·아이폰 배너 숨김, 카카오 맞춤형 광고 설정을 순서대로 확인하세요.');
await p.click('text="퍼머링크"');await p.waitForSelector('loc=role:radio[name="맞춤 퍼머링크"]');console.log((await p.snapshot()).split('\n').slice(-50).join('\n'));
