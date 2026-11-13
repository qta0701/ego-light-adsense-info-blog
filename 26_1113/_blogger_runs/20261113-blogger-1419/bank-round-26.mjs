for(const [order,space] of [[11,41],[12,42]]){const p=(await taskSpace(space)).page('p1');console.log(JSON.stringify({order,tail:(await p.snapshot()).slice(-1500)}));}
