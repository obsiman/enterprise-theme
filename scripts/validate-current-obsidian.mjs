import { strict as assert } from "node:assert";
import { access } from "node:fs/promises";
import { resolve } from "node:path";
import { read, root } from "./validation-utils.mjs";

const manifest = JSON.parse(await read("manifest.json"));
const source = await read("src/30-obsidian-adapter.css");
const versionDocs = await read("docs/VERIFICATION.md");
const fixtureNames = ["01-typography.md", "02-links-and-highlights.md", "03-lists-and-tasks.md", "04-callouts.md", "05-tables.md", "06-code-and-math.md", "07-properties.md", "08-images-and-embeds.md", "09-long-content.md", "10-utility-classes.md"];

assert.equal(manifest.minAppVersion, "1.13.7");
assert.ok(versionDocs.includes("Desktop: Obsidian 1.13.7 public"));
assert.ok(versionDocs.includes("Mobile: Obsidian 1.13.8 public"));
for (const fixture of fixtureNames) await access(resolve(root, "test/fixtures", fixture));
for (const required of ["--color-base-00", "--color-base-05", "--color-base-10", "--color-base-20", "--color-base-25", "--color-base-30", "--color-base-35", "--color-base-40", "--color-base-50", "--color-base-60", "--color-base-70", "--color-base-100", "--color-accent", "--color-accent-1", "--color-accent-2", "--text-on-accent", "--text-on-accent-inverted", "--caret-color", "--background-modifier-error", "--background-modifier-error-hover", "--background-modifier-success", "--background-modifier-message", "--background-modifier-form-field", "--interactive-normal", "--interactive-hover", "--interactive-accent", "--interactive-accent-hover"]) {
  assert.ok(source.includes(`${required}:`), `Current Obsidian adapter is missing ${required}.`);
}
console.log("Current Obsidian contract and fixture validation passed.");
