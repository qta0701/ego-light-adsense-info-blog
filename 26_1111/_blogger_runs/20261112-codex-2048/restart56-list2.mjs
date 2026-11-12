const p=(await taskSpace(26)).page('p1');const s=await p.snapshot({scope:'full_page'});const a=s.split('\n');const i=a.findIndex(x=>x.includes('스팀 환불 방법｜'));console.log(a.slice(i-5,i+35).join('\n'));
