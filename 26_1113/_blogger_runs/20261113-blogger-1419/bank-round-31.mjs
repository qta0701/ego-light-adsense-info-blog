const p=(await taskSpace(40)).page('p1');console.log(JSON.stringify({url:await p.url(),snapshot:(await p.snapshot()).slice(0,9000)}));
