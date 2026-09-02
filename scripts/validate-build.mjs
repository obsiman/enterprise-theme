import { strict as assert } from "node:assert";
import { read } from "./validation-utils.mjs";
import { createHash } from "node:crypto";
import { access } from "node:fs/promises";
import { resolve } from "node:path";
import { root, expectedOrder } from "./validation-utils.mjs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

await execFileAsync(process.execPath, ["build.mjs"], { cwd: root });
const firstBuild = await read("theme.css");
await execFileAsync(process.execPath, ["build.mjs"], { cwd: root });
const secondBuild = await read("theme.css");
assert.equal(secondBuild, firstBuild, "The generated build must be deterministic.");

const built = await read("theme.css");
assert.ok(built.startsWith("/*\n * Enterprise for Obsidian"), "Generated banner missing.");
assert.equal((built.match(/\/\* ===== src\//g) ?? []).length, expectedOrder.length, "Generated module count mismatch.");
for (const name of expectedOrder) {
  assert.ok(built.includes(`/* ===== src/${name} ===== */`), `Generated CSS is missing ${name}.`);
}

const fonts = [
  ["Bricolage Grotesque", "fonts/BricolageGrotesque-latin.woff2"],
  ["Instrument Sans", "fonts/InstrumentSans-latin.woff2"],
  ["Spline Sans Mono", "fonts/SplineSansMono-latin.woff2"],
  ["Caveat", "fonts/Caveat-latin.woff2"]
];
assert.equal((built.match(/@font-face\s*\{/g) ?? []).length, fonts.length, "Every bundled font must have one generated font face.");
assert.equal((built.match(/src:\s*url\("data:font\/woff2;base64,/g) ?? []).length, fonts.length, "Every font face must use embedded local data.");
assert.ok(!/url\([^)]*https?:/i.test(built), "Generated CSS contains a remote asset URL.");
for (const [family, file] of fonts) {
  await access(resolve(root, file));
  const familyPattern = family.includes(" ") ? `"${family}"` : `(?:"${family}"|${family})`;
  assert.match(built, new RegExp(`font-family:\\s+${familyPattern}`), `Generated font face missing ${family}.`);
}

const firstHash = createHash("sha256").update(built).digest("hex");
assert.equal(firstHash.length, 64);
assert.ok(!built.includes("@import"), "Generated CSS must not use imports.");
assert.ok(!built.includes("!important"), "Generated CSS must not use !important.");
assert.ok(!built.includes(":has("), "Generated CSS must not use :has().");
assert.ok(built.includes("color-mix(in oklch"), "Generated CSS must use the current OKLCH color system.");
console.log("Generated build validation passed.");
