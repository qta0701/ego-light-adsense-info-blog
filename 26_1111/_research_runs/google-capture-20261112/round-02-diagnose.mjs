import fs from "node:fs/promises";

const task = await taskSpace(29);
const page = task.page("p1");
const checks = [];
const window = await page.cdp("Browser.getWindowForTarget", {}, { timeout: 2500 });
const { windowId } = window;
const set = windowState => page.cdp("Browser.setWindowBounds", { windowId, bounds: { windowState } }, { timeout: 2500 });
const inspect = async (label, options = {}) => {
  const state = await page.cdp("Browser.getWindowForTarget", {}, { timeout: 2500 });
  const viewport = await page.evaluate(() => ({
    visibility: document.visibilityState, width: innerWidth, height: innerHeight, dpr: devicePixelRatio,
  }));
  const before = Date.now();
  const check = { label, window: state.bounds, viewport };
  try {
    const shot = await page.cdp("Page.captureScreenshot", {
      format: "png", fromSurface: true, captureBeyondViewport: false, ...options,
    }, { timeout: 4000 });
    const png = Buffer.from(shot.data, "base64");
    Object.assign(check, { width: png.readUInt32BE(16), height: png.readUInt32BE(20), bytes: png.length });
    if (label === "minimized-view") await fs.writeFile(new URL("minimized-view.probe.png", import.meta.url), png);
  } catch (error) {
    check.error = error.message;
  }
  checks.push({ ...check, elapsedMs: Date.now() - before });
};

try {
  await inspect("normal-surface");
  await set("minimized");
  await page.waitForFunction(() => document.visibilityState === "hidden", undefined, { timeout: 3000 }).catch(() => {});
  await inspect("minimized-surface");
  await inspect("minimized-view", { fromSurface: false });
} catch (error) {
  checks.push({ label: "window state test", error: error.message });
} finally {
  await set("normal");
}
await page.waitForFunction(() => document.visibilityState === "visible", undefined, { timeout: 5000 });
await inspect("restored-surface");
try {
  await page.cdp("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await inspect("restored-mobile-emulation");
} finally {
  await page.cdp("Emulation.clearDeviceMetricsOverride");
}
await fs.writeFile(new URL("capture-diagnosis.json", import.meta.url), JSON.stringify({ spaceId: 29, checks }, null, 2));
console.log(JSON.stringify(checks));
