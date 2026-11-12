const p=(await taskSpace(27)).page('p1');
console.log((await p.snapshot()).split('\n').slice(-75).join('\n'));
