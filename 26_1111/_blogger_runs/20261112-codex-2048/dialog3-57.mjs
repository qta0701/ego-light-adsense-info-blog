const p=(await taskSpace(27)).page('p1');let s=(await p.snapshot({scope:'full_page'})).split('\n');let i=s.findIndex(x=>x.includes('dialog'));console.log(s.slice(i,i+25).join('\n'));
