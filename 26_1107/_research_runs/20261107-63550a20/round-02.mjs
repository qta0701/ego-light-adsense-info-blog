for(const id of [4,5,6]){
 const t=await taskSpace(id),p=t.page('p1');
 console.log('PAGE',id,JSON.stringify(await p.evaluate(()=>({url:location.href,links:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,10).map(a=>({text:a.innerText.slice(0,120),attr:a.getAttribute('href'),href:a.href}))}))));
}
