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

const fonts = [
  {
    family: "Bricolage Grotesque",
    file: "fonts/BricolageGrotesque-latin.woff2",
    weight: "200 800"
  },
  {
    family: "Instrument Sans",
    file: "fonts/InstrumentSans-latin.woff2",
    weight: "400 700"
  },
  {
    family: "Spline Sans Mono",
    file: "fonts/SplineSansMono-latin.woff2",
    weight: "300 700"
  },
  {
    family: "Caveat",
    file: "fonts/Caveat-latin.woff2",
    weight: "400 700"
  }
];

const banner = `/*
 * Enterprise for Obsidian
 * Generated file. Edit source modules under src/ and run npm run build.
 * No remote assets are loaded by this theme.
*/
`;

const embeddedFonts = await Promise.all(
  fonts.map(async ({ family, file, weight }) => {
    const data = (await readFile(resolve(root, file))).toString("base64");
    const familyName = family.includes(" ") ? `"${family}"` : family;
    return `@font-face {
  font-family: ${familyName};
  font-style: normal;
  font-weight: ${weight};
  font-display: swap;
  src: url("data:font/woff2;base64,${data}") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`;
  })
);

const parts = await Promise.all(
  sources.map(async (source) => {
    const content = await readFile(resolve(root, source), "utf8");
    return `\n\n/* ===== ${source} ===== */\n\n${content.trim()}\n`;
  })
);

await writeFile(resolve(root, "theme.css"), `${banner}${embeddedFonts.join("\n")}\n${parts.join("")}`, "utf8");
console.log(`Built theme.css from ${sources.length} source modules and ${fonts.length} embedded fonts.`);
