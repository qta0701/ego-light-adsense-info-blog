import {capture} from '../../tools/research_browser.mjs';
import {observePage} from '../../tools/research_observe.mjs';
async function mark(p,folder,name,tag,phrase){
 const vp={width:1100,height:800};await p.cdp('Emulation.setDeviceMetricsOverride',{...vp,deviceScaleFactor:1,mobile:false});
 await p.evaluate(({tag,phrase})=>{document.querySelectorAll('[data-research-target]').forEach(e=>e.removeAttribute('data-research-target'));const e=[...document.querySelectorAll(tag)].find(x=>x.textContent.includes(phrase));if(!e)throw Error('missing '+phrase);e.dataset.researchTarget='yes';e.scrollIntoView({block:'center'});},{tag,phrase});
 console.log(name,JSON.stringify(await capture(p,folder,name,['[data-research-target="yes"]'],vp)));
}
for(const [id,keyword,items] of [[5,'앱스토어 국가변경',[['02_conditions','p','국가 또는 지역 변경을 차단하는 구독 취소하기'],['03_iphone','p','설정에서 사용자의 이름을 탭합니다'],['04_payment','p','결제 방법을 선택하고 새로운 결제 정보']]], [7,'모바일 티머니 환불',[['02_refund','div','모바일티머니 앱→왼쪽상단'],['03_postpaid','b','후불청구형 해지 경로'],['04_usim','div','충전한 이전 USIM이 없다면']]]]){
 const p=(await taskSpace(id)).page('p1'),f=`26_1113/노하우_${keyword}/웹조사`;
 for(const item of items)try{await mark(p,f,...item);}catch(e){console.log(keyword,item[0],String(e));}
}
{
 const p=(await taskSpace(6)).page('p1'),f='26_1113/노하우_코레일 승차권 조회/웹조사';
 try{await p.click('loc=role:button[name="확인"]');}catch(e){console.log('dialog',String(e));}
 try{await mark(p,f,'02_login','p','철도회원');}catch(e){console.log('login',String(e));}
 await p.goto('https://www.google.com/search?q='+encodeURIComponent('코레일 승차권 조회'));
 const href=await p.evaluate(()=>[...document.querySelectorAll('a')].find(a=>a.querySelector('h3')?.innerText.includes('비회원 예매>코레일 승차권예매'))?.href);
 console.log('nonmember result',href);if(href){await p.goto(href);console.log(JSON.stringify(await observePage(p,f,'nonmember',{maxChars:1500,linksLimit:5})));console.log(await p.snapshot({scope:'full_page'}));}
}
