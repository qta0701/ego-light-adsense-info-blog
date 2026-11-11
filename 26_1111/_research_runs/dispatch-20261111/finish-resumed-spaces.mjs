import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const runDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(runDir, "../../..");
const read = async file => JSON.parse(await fs.readFile(file, "utf8"));
const write = async (file, value) => {
  const temp = file + ".tmp";
  await fs.writeFile(temp, JSON.stringify(value, null, 2) + "\n", "utf8");
  await fs.rename(temp, file);
};
const dispatch = await read(path.join(runDir, "dispatch.json"));
const owned = new Map((await listTaskSpaces()).map(space => [space.id, space]));
const outcomes = [];

for (const section of dispatch.sections) {
  const manifest = await read(path.join(root, section.manifest));
  for (const job of manifest.jobs) {
    const evidence = path.join(root, job.folder, "evidence");
    const statePath = path.join(evidence, "browser.json");
    const state = await read(statePath);
    const review = await read(path.join(evidence, "review.json"));
    if (review.status !== "complete_with_alternative_review") {
      outcomes.push({ row: job.row, status: "review_pending" });
      continue;
    }
    const resumed = await read(path.join(evidence, "resume-space.json")).catch(error => {
      if (error.code !== "ENOENT") throw error;
      return null;
    });
    const id = resumed?.spaceId ?? state.spaceId;
    const space = owned.get(id);
    if (!space || space.ownership !== "agent" || space.name !== job.spaceName) {
      outcomes.push({ row: job.row, spaceId: id, status: space ? "ownership_or_name_mismatch" : "already_absent" });
      continue;
    }
    try {
      const task = await taskSpace(id);
      await task.finish({ keep: [] });
      await write(statePath, {
        spaceId: id, page: "p1", status: "finished",
        completion: "complete_with_alternative_review",
        previousStatus: state.status,
        ...(resumed ? { previousSpaceId: resumed.previousSpaceId } : {}),
      });
      outcomes.push({ row: job.row, spaceId: id, status: "finished" });
    } catch (error) {
      outcomes.push({ row: job.row, spaceId: id, status: "finish_failed", error: error.message });
    }
  }
}
const lookup = owned.get(19);
if (lookup?.name === "keyword-lookup-20261112" && lookup.ownership === "agent") {
  const task = await taskSpace(lookup.id);
  await task.finish({ keep: [] });
  outcomes.push({ purpose: "lookup", spaceId: lookup.id, status: "finished" });
}
await write(path.join(runDir, "space-cleanup.json"), outcomes);
console.log(JSON.stringify(outcomes));
