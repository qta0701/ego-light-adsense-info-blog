const fs = await import('node:fs/promises');
const file = 'Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_research_runs/bank-2-manifest.json';
const manifest = JSON.parse(await fs.readFile(file, 'utf8'));
for (const row of manifest.rows.filter(r => !r.spaceId)) {
  const name = `research-20261113-bank2-row${row.row}`;
  const task = await taskSpace(name);
  row.spaceId = task.spaceId; row.spaceName = name; row.status = 'space_created';
  await fs.writeFile(file, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(JSON.stringify({row:row.row, spaceId:task.spaceId, ownership:task.ownership}));
}
