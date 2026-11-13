const jobs = [[7, '진학어플라이 회원가입'], [8, '인스타그램 탈퇴방법'], [9, '배민클럽 환불']];
for (const [order, keyword] of jobs) {
  try {
    const task = await taskSpace(`20261113-blogger-1419-order-${order}`);
    const page = task.page('p1');
    await page.fill('loc=css:input[aria-label="검색"]', keyword);
    await page.press('loc=css:input[aria-label="검색"]', 'Enter');
    console.log(JSON.stringify({order, spaceId: task.spaceId, at: new Date().toISOString(), snapshot: await page.snapshot()}));
  } catch (error) { console.log(JSON.stringify({order, error: String(error)})); }
}
