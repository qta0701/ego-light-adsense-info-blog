import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const task = await taskSpace("google-capture-20261112");
const page = task.page("p1");
await page.goto("https://www.google.com/search?q=" + encodeURIComponent("애플 환불 요청"), { timeout: 15000 });
console.log({ spaceId: task.spaceId, url: await page.url(), title: await page.title() });
const probe = async (name, run) => {
  const started = Date.now();
  try {
    const result = await run();
    console.log({ name, ms: Date.now() - started, result });
  } catch (error) {
    console.log({ name, ms: Date.now() - started, error: error.message });
  }
};
await probe("page visibility and size", () => page.evaluate(() => ({
  visibility: document.visibilityState, focus: document.hasFocus(),
  viewport: [innerWidth, innerHeight], dpr: devicePixelRatio, title: document.title,
})));
await probe("window", () => page.cdp("Browser.getWindowForTarget", {}, { timeout: 2000 }));
for (const [name, opts] of [
  ["surface", { fromSurface: true, captureBeyondViewport: false }],
  ["view", { fromSurface: false, captureBeyondViewport: false }],
]) {
  await probe(name, async () => {
    const result = await page.cdp("Page.captureScreenshot", { format: "png", ...opts }, { timeout: 4000 });
    const png = Buffer.from(result.data, "base64");
    await fs.writeFile(fileURLToPath(new URL(name + ".probe.png", import.meta.url)), png);
    return { width: png.readUInt32BE(16), height: png.readUInt32BE(20), bytes: png.length };
  });
}
await probe("bring page to front", () => page.cdp("Page.bringToFront", {}, { timeout: 2500 }));
await probe("window after bringToFront", () => page.cdp("Browser.getWindowForTarget", {}, { timeout: 2000 }));
await probe("surface after bringToFront", async () => {
  const result = await page.cdp("Page.captureScreenshot", { format: "png", fromSurface: true }, { timeout: 4000 });
  const png = Buffer.from(result.data, "base64");
  await fs.writeFile(fileURLToPath(new URL("front.probe.png", import.meta.url)), png);
  return { width: png.readUInt32BE(16), height: png.readUInt32BE(20), bytes: png.length };
});
