const p=(await taskSpace(25)).page('p1');await p.fill('loc=css:input[aria-label="검색"]','네이버');await p.press('loc=css:input[aria-label="검색"]','Enter');console.log('URL',await p.url());
