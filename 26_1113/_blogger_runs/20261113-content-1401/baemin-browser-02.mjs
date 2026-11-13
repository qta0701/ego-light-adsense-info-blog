import {capture} from '../../../tools/research_browser.mjs';
const task = await taskSpace(27);
const page = task.page('p1');
await page.goto('https://terms.baemin.com/content/BAEMINCLUB_658');
console.log((await page.snapshot({scope:'full_page'})).slice(-8500));
console.log(await capture(page, '26_1113/노하우2_배민클럽 환불/웹조사', '08_terms_recheck', [], {width:1100,height:900}));
