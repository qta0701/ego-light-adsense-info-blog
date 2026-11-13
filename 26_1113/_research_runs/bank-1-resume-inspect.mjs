for(const id of [11,12,13]){
 const t=await taskSpace(id); const tabs=await t.tabs(); console.log(JSON.stringify({id,tabs:tabs.map(({label,title,url,active,openedBy})=>({label,title,url,active,openedBy}))}));
 for(const tab of tabs){if(tab.url.startsWith('http') && !tab.url.includes('google.com/search')){let p=tab.label?t.page(tab.label):await t.adopt(tab.page); console.log(JSON.stringify({id,label:p.label,snapshot:(await p.snapshot({scope:'full_page'})).slice(0,16000)}));}}
}
