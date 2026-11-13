const page=(await taskSpace(40)).page('p1');
await page.focus('div[role="radio"][aria-label^="맞춤 퍼머링크"]');await page.press('div[role="radio"][aria-label^="맞춤 퍼머링크"]','Space');await page.fill('input[aria-label="맞춤 퍼머링크 입력"]','busan-bank-currency-exchange');await page.press('input[aria-label="맞춤 퍼머링크 입력"]','Tab');
await page.click('text="검색 설명"');await page.fill('textarea[aria-label="검색 설명 입력"]','부산은행 ONE환전의 이용대상과 한도, 영업점 수령 및 현찰배달 조건을 확인하세요.');await page.press('textarea[aria-label="검색 설명 입력"]','Tab');
await page.click('text="라벨"');await page.fill('textarea[aria-label="쉼표로 라벨을 구분하세요."]','부산은행, 환전, 외화');await page.keyboard.type(',');await page.press('textarea[aria-label="쉼표로 라벨을 구분하세요."]','Tab');
await page.click('loc=role:button[name="옵션 더보기"]');console.log((await page.snapshot()).slice(-2500));
