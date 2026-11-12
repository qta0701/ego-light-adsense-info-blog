for(const [row,id,q] of [[51,21,'카드 결제'],[52,22,'넷플릭스 해지'],[53,23,'넷플릭스 로그아웃']]) {
 const t=await taskSpace(id),p=t.page('p1'); await p.fill('loc=css:input[aria-label="검색"]',q); await p.press('loc=css:input[aria-label="검색"]','Enter');
 console.log('ROW',row,'URL',await p.url(),await p.snapshot());
}
