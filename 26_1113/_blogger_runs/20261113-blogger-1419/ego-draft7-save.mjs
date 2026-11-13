const task=await taskSpace(34),page=task.page('p1');
await page.fill('textarea[aria-label="검색 설명 입력"]','진학어플라이 회원가입 화면에서 통합회원과 단일회원의 차이, 약관 동의와 정보 입력 순서를 확인하세요.');
await page.click('loc=role:button[name="옵션 더보기"]'); console.log((await page.snapshot()).slice(0,4000));
