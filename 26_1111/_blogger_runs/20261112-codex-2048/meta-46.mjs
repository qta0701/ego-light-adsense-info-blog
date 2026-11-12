const t=await taskSpace(17);const p=t.page('p1');
await p.fill('@180','korail-naeilro-pass');await p.press('@180','Tab');
await p.click('@169');await p.fill('loc=css:textarea[aria-label="쉼표로 라벨을 구분하세요."]','코레일, 내일로 패스, KTX, 기차여행');await p.press('loc=css:textarea[aria-label="쉼표로 라벨을 구분하세요."]','Comma');await p.press('loc=css:textarea[aria-label="쉼표로 라벨을 구분하세요."]','Tab');
console.log((await p.snapshot()).split('\n').slice(-60).join('\n'));
