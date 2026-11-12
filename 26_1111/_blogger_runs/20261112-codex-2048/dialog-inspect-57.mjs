const p=(await taskSpace(27)).page('p1');
console.log((await p.snapshot({scope:'full_page'})).split('\n').filter((x,i,a)=>/게시 확인|게시하시겠습니까|확인|취소|dialog/.test(x)).slice(0,40).join('\n'));
