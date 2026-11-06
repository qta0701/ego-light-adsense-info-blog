import {finishJob} from '../../../tools/research_browser.mjs';
for(const folder of ['26_1106/앱사용_코레일 승차권 전달/웹조사','26_1106/앱사용_당근마켓 채팅 걸기/웹조사']){await finishJob(folder);console.log(JSON.stringify({folder,status:'finished'}));}
