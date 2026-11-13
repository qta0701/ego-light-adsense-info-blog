for(const [id,phrases] of [[5,['남아 있는 Apple 계정 잔액 사용하기','설정에서 사용자의 이름을 탭합니다','결제 방법을 선택하고 새로운 결제 정보','개인 정보']], [6,['로그인 후 사용 가능합니다','회원번호','승차권 확인']], [7,['모바일티머니 앱→왼쪽상단','후불청구형 해지 경로','충전한 이전 USIM이 없다면']]]){
 const t=await taskSpace(id),p=t.page('p1');
 console.log(id,JSON.stringify(await p.evaluate(phrases=>phrases.map(s=>({phrase:s,els:[...document.querySelectorAll('body *')].filter(e=>e.textContent.includes(s)&&![...e.children].some(c=>c.textContent.includes(s))).slice(0,4).map(e=>({tag:e.tagName,html:e.outerHTML.slice(0,500)}))})),phrases)));
}
