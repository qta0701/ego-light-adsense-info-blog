const t=await taskSpace(16),p=t.page('p1');await p.goto('https://www.blogger.com/blog/posts/7162964317827704236?hl=ko');console.log((await p.snapshot()).split('\n').slice(0,60).join('\n'));
