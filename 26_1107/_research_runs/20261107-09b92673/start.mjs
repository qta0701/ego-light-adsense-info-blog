import { startBatch } from '../../../tools/research_browser.mjs';
await startBatch(new URL('./manifest.json', import.meta.url));
