const task=await taskSpace(43),page=task.page('p1');
await page.fill('textarea[aria-label="검색 설명 입력"]','신한은행 간편조회에서 계좌조회 로그인 방법과 회원별 이용 범위, 기타조회 메뉴를 확인하세요.');
await page.click('text="퍼머링크"');await page.waitForTimeout(300);console.log((await page.snapshot()).slice(-5000));
