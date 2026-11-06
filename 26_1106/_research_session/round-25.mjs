const t=await taskSpace(1);const p=t.page('p4');await p.cdp('Emulation.clearDeviceMetricsOverride');
await p.goto('https://docs.google.com/spreadsheets/d/1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s/edit#gid=2121839224&range=A46:I47');
console.log((await p.snapshot()).slice(0,10000));
