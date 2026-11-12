const p=(await taskSpace(27)).page('p1');
console.log((await p.snapshot({scope:'full_page'})).split('\n').filter(x=>/애플 환불 요청 방법과 처리 기간|5702284435751296131/.test(x)).join('\n'));
