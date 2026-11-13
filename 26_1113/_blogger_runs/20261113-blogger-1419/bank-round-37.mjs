const p=(await taskSpace(42)).page('p1');const s=await p.snapshot();const i=s.indexOf('국민은행 통장사본 출력 방법:');console.log(s.slice(i,i+2400));
