const p=(await taskSpace(24)).page('p1');await p.focus('loc=css:div[role="radio"][aria-label^="자동 퍼머링크"]');await p.press('loc=css:div[role="radio"][aria-label^="자동 퍼머링크"]','Space');await p.click('loc=role:button[name="옵션 더보기"]');await p.click('loc=role:menuitem[name="저장"]');
console.log((await p.snapshot()).split('\n').filter(x=>/저장|퍼머링크/.test(x)).slice(-12).join('\n'));
