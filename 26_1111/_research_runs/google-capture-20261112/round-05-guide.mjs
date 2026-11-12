import { collect, jobs, openGuide, readResearch } from "./capture.mjs";

const task = await taskSpace(29);
const page = task.page("p1");
const job = jobs.get(54);
const source = (await readResearch(job)).sources.find(item => item.id === "S2");
const text = await openGuide(page, source.url, "本淘宝账号的注销将导致淘宝终止为您提供服务");
if (!text) throw Error("Taobao account closure consequence not found");
await collect(page, job, "taobao-after-closure-20261112", {
  role: "guide", sourceId: source.id, sourceTitle: source.title, targetTitle: text,
  targetUrl: source.url, sourceUrl: source.url,
  caption: "타오바오 계정 탈퇴 후 서비스 종료 안내",
});
