import { readFile, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { strict as assert } from "node:assert";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFile(resolve(root, path), "utf8");

const manifest = JSON.parse(await read("manifest.json"));
assert.equal(manifest.name, "Enterprise");
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.ok(manifest.minAppVersion);

const sourceNames = (await readdir(resolve(root, "src")))
  .filter((name) => name.endsWith(".css"))
  .sort();

const expectedOrder = [
  "00-style-settings.css",
  "10-primitives.css",
  "20-semantic.css",
  "30-obsidian-adapter.css",
  "40-typography.css",
  "50-content.css",
  "60-components.css",
  "70-interface.css",
  "80-utilities.css",
  "90-responsive.css"
];
assert.deepEqual(sourceNames, expectedOrder, "Unexpected source-module set or ordering.");

const sourceEntries = await Promise.all(
  expectedOrder.map(async (name) => [name, await read(`src/${name}`)])
);
const source = sourceEntries.map(([, content]) => content).join("\n");
const built = await read("theme.css");

for (const required of [
  "variable-themed-color",
  "variable-color",
  "variable-text",
  "variable-number-slider",
  "variable-select",
  "class-toggle",
  "class-select"
]) {
  assert.ok(sourceEntries[0][1].includes(`type: ${required}`), `Missing Style Settings type: ${required}`);
}

for (const section of [
  "Presets",
  "Colors",
  "Typography",
  "Title and headings",
  "Handwritten layer",
  "Links and highlights",
  "Layout",
  "Borders",
  "Components",
  "Interface",
  "Advanced tokens"
]) {
  assert.ok(sourceEntries[0][1].includes(`title: ${section}`), `Missing Style Settings section: ${section}`);
}

for (const token of [
  "--enterprise-font-display",
  "--enterprise-font-body",
  "--enterprise-font-mono",
  "--enterprise-font-hand",
  "--enterprise-body-size",
  "--enterprise-body-line-height",
  "--enterprise-reading-width",
  "--enterprise-bold-weight",
  "--enterprise-title-stroke-width",
  "--enterprise-title-stroke-height",
  "--enterprise-title-stroke-gap",
  "--enterprise-title-stroke-opacity",
  "--enterprise-h2-rule-color",
  "--enterprise-h2-rule-thickness"
]) {
  assert.ok(source.includes(token), `Missing required token ${token}`);
}

for (const selector of [
  ".markdown-rendered h2",
  ".HyperMD-header-2",
  ".markdown-rendered blockquote",
  ".HyperMD-quote",
  ".markdown-rendered mark",
  ".cm-highlight",
  ".inline-title::after"
]) {
  assert.ok(source.includes(selector), `Missing Reading/Live Preview contract selector ${selector}`);
}

const cssOnly = source.toLowerCase();
for (const banned of ["myicor", "icor-for-life", "inkline", "data:image/svg+xml", "@font-face", "http://", "https://"]) {
  assert.ok(!cssOnly.includes(banned), `Banned upstream/remote construct found in CSS: ${banned}`);
}

assert.ok(!source.includes("!important"), "Avoid !important in theme source.");
assert.ok(source.includes("width: min(var(--enterprise-title-stroke-width)"), "Title stroke must be viewport-safe.");
assert.ok(source.includes("@media (prefers-reduced-motion: reduce)"), "Reduced-motion coverage missing.");
assert.ok(source.includes(".theme-dark") && source.includes(".theme-light"), "Both color modes are required.");

const rawColorPattern = /#[0-9a-fA-F]{3,8}\b|rgba?\(/g;
for (const [name, content] of sourceEntries) {
  if (["00-style-settings.css", "10-primitives.css"].includes(name)) continue;
  const colors = content.match(rawColorPattern) ?? [];
  assert.equal(colors.length, 0, `Raw colors belong only in primitive tokens/settings metadata: ${name}`);
}

assert.ok(built.startsWith("/*\n * Enterprise for Obsidian"), "Generated banner missing.");
for (const name of expectedOrder) {
  assert.ok(built.includes(`/* ===== src/${name} ===== */`), `theme.css missing module ${name}`);
}

const settingsBlocks = (built.match(/\/\* @settings/g) ?? []).length;
assert.equal(settingsBlocks, 1, "theme.css must contain exactly one Style Settings block.");

console.log("Theme validation passed.");
