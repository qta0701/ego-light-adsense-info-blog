const page=(await taskSpace(40)).page('p1');
console.log(JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('input,textarea,[role=radio]')].map(e=>({tag:e.tagName,aria:e.getAttribute('aria-label'),role:e.getAttribute('role'),type:e.type,outer:e.outerHTML.slice(0,500)})))));
