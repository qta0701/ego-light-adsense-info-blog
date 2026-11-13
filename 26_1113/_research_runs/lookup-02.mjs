import {ensureSheetsMenuWidth} from '../../tools/research_browser.mjs';
const task = await taskSpace(4);
const page = task.page('p1');
console.log(await ensureSheetsMenuWidth(page));
console.log(await page.snapshot());
