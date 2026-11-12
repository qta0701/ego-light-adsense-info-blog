const fs=await import('node:fs/promises'),run='Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/_blogger_runs/20261112-codex-2048';
for(const [row,id,title,desc,labels] of [[51,21,'번개장터 카드 결제 방법｜앱·PC, 할부와 수수료','번개장터 카드 결제를 앱과 PC에서 하는 방법을 정리했습니다. 간편결제 카드 등록, 무이자 표시, 구매자 수수료를 확인하세요.','번개장터, 중고거래, 앱사용'],[52,22,'넷플릭스 해지방법｜PC·휴대폰에서 자동결제 끄기','넷플릭스 해지방법을 PC·모바일 웹 화면 순서로 안내합니다. 해지 버튼이 없을 때 결제처 확인과 남은 시청 기간도 알아보세요.','앱사용, 넷플릭스, 구독 해지'],[53,23,'넷플릭스 TV 로그아웃 방법｜리모컨과 원격 로그아웃','넷플릭스 TV에서 리모컨으로 로그아웃하는 법과 휴대폰으로 숙소 TV 한 대만 원격 로그아웃하는 법을 확인하세요.','넷플릭스, 스마트 TV, 앱사용']]) {
 const t=await taskSpace(id),p=t.page('p1'),html=await fs.readFile(`${run}/publish-${row}.html`,'utf8');
 await p.fill('loc=css:input[aria-label="제목"]',title); await p.evaluate(h=>{const cm=document.querySelector('.CodeMirror')?.CodeMirror;if(!cm)throw Error('no editor');cm.setValue(h);cm.save()},html);
 await p.fill('loc=css:textarea[aria-label="쉼표로 라벨을 구분하세요."]',labels);await p.press('loc=css:textarea[aria-label="쉼표로 라벨을 구분하세요."]','Comma');await p.press('loc=css:textarea[aria-label="쉼표로 라벨을 구분하세요."]','Tab');
 await p.click('text="검색 설명"');await p.fill('loc=css:textarea[aria-label="검색 설명 입력"]',desc);await p.click('text="퍼머링크"');console.log('ROW',row,(await p.snapshot()).split('\n').slice(-48).join('\n'));
}
