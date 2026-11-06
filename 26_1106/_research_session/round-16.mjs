import {mobile,capture,root} from './capture.mjs';const fs=await import('node:fs/promises');const t=await taskSpace(1);const s=t.page('p4');const q=t.page('p3');const p=t.page('p1');
const img=await s.evaluate(()=>[...document.images].find(e=>e.alt==='미니 이모티콘 참고이미지').currentSrc);const resp=await fetch(img);await fs.writeFile(root+'앱사용_카카오톡 무료 이모티콘/웹조사/참고이미지_미니이모티콘_공식보도자료.webp',Buffer.from(await resp.arrayBuffer()));await fs.writeFile(root+'앱사용_카카오톡 무료 이모티콘/웹조사/미니이모티콘_이미지출처.json',JSON.stringify({page:await s.url(),image:img},null,2));
await s.goto('https://e.kakao.com/mini_open');await mobile(s);console.log('MINI LIVE',await s.snapshot());
console.log('KORAIL MENU',await q.evaluate(()=>({text:document.body.innerText.slice(0,7500),buttons:[...document.querySelectorAll('#header button')].map(e=>e.outerHTML)})));
console.log('POLICE RESULT',await p.evaluate(()=>({text:document.body.innerText.slice(0,6000),url:location.href})));
