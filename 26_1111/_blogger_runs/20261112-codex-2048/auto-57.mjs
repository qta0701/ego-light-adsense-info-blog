const p=(await taskSpace(27)).page('p1');
await p.click('text="퍼머링크"');
await p.focus('loc=css:div[role="radio"][aria-label^="자동 퍼머링크"]');
await p.press('loc=css:div[role="radio"][aria-label^="자동 퍼머링크"]','Space');
await p.click('loc=role:button[name="옵션 더보기"]');
await p.click('loc=role:menuitem[name="저장"]');
console.log(JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('[role=radio][aria-label*="퍼머링크"]')].map(e=>({label:e.getAttribute('aria-label'),checked:e.getAttribute('aria-checked')})))));
