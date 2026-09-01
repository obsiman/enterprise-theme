import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const sources = [
  "src/00-style-settings.css",
  "src/10-primitives.css",
  "src/20-semantic.css",
  "src/30-obsidian-adapter.css",
  "src/40-typography.css",
  "src/50-content.css",
  "src/60-components.css",
  "src/70-interface.css",
  "src/80-utilities.css",
  "src/90-responsive.css"
];

const banner = `/*
 * Enterprise for Obsidian
 * Generated file. Edit source modules under src/ and run npm run build.
 * No remote assets are loaded by this theme.
 */
`;

const parts = await Promise.all(
  sources.map(async (source) => {
    const content = await readFile(resolve(root, source), "utf8");
    return `\n/* ===== ${source} ===== */\n${content.trim()}\n`;
  })
);

await writeFile(resolve(root, "theme.css"), `${banner}${parts.join("")}`, "utf8");
console.log(`Built theme.css from ${sources.length} source modules.`);
