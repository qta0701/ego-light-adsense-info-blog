for(const [row,id,terms] of [[44,15,['카카오톡 채널 차단','카카오톡 광고']], [45,16,['카카오톡 복구방법','카카오톡 백업']]]){
const t=await taskSpace(id),p=t.page('p1');
const data=await p.evaluate(terms=>[...document.querySelectorAll('[id^="post-title-"]')].filter(e=>terms.some(t=>e.innerText.includes(t))).map(e=>{const item=e.closest('.rb4Lrd');return {title:e.innerText,id:e.id,edit:item?.querySelector('a[href*="/blog/post/edit/"]')?.href,view:item?.querySelector('a[aria-label="보기"]')?.href,time:item?.querySelector('[data-tooltip*="게시일"]')?.getAttribute('data-tooltip')}}),terms);console.log('row',row,data);
}
