const k=(await taskSpace(3)).page('p1');await k.click('a[href="/ticket/myticket/list"]');console.log(JSON.stringify({id:3,url:await k.url(),snap:(await k.snapshot()).slice(0,4500)}));
const d=(await taskSpace(4)).page('p1');await d.click('@112');console.log(JSON.stringify({id:4,url:await d.url(),snap:(await d.snapshot()).slice(0,5000)}));
