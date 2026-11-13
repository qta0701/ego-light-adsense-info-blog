const task=await taskSpace(35),page=task.page('p1');
await page.fill('textarea[aria-label="검색 설명 입력"]','앱스토어 로그아웃을 위한 아이폰·아이패드 설정 경로와 맥 메뉴, 가족 공유 계정 확인 사항을 정리했습니다.');
await page.click('text="퍼머링크"');
const snap=await page.snapshot({scope:'full_page'});console.log(snap.slice(-4000));
