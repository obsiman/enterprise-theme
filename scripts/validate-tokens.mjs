import { strict as assert } from "node:assert";
import { getSources, stripSettings, customPropertyDeclarations, customPropertyReferences } from "./validation-utils.mjs";

const sources = await getSources();
const source = Object.values(sources).join("\n");
const effective = stripSettings(source);
const cssOnly = effective.toLowerCase();
const deprecated = [
  /--color-(?:red|orange|yellow|green|cyan|blue|purple|pink)-rgb\b/,
  /--color-accent-hsl\b/,
  /--interactive-accent-hsl\b/,
  /--mono-rgb-(?:0|100)\b/,
  /--background-modifier-(?:error|success)-rgb\b/,
  /--text-highlight-bg-rgb\b/
];
for (const pattern of deprecated) assert.ok(!pattern.test(cssOnly), `Deprecated Obsidian variable found: ${pattern}`);
for (const banned of ["http://", "https://", "@import", "!important", ":has("]) assert.ok(!cssOnly.includes(banned), `Forbidden CSS construct found: ${banned}`);
assert.ok(cssOnly.includes("color-mix(in oklch"), "OKLCH color mixing is required for derived washes.");
assert.ok(!/--callout-color\s*:\s*[^;{}]*\d+\s*,\s*\d+\s*,\s*\d+/.test(effective), "Callout colors must be valid CSS colors, not RGB triplets.");

const declared = new Set(customPropertyDeclarations(effective));
const referenced = new Set(customPropertyReferences(effective));
const allowlistedExternalTokens = new Set([
  "--color-base-00", "--color-base-05", "--color-base-10", "--color-base-20", "--color-base-25", "--color-base-30", "--color-base-35", "--color-base-40", "--color-base-50", "--color-base-60", "--color-base-70", "--color-base-100",
  "--color-accent", "--color-accent-1", "--color-accent-2", "--color-red", "--color-orange", "--color-yellow", "--color-green", "--color-cyan", "--color-blue", "--color-purple", "--color-pink", "--mono-0", "--mono-100",
  "--background-primary", "--background-primary-alt", "--background-secondary", "--background-secondary-alt", "--background-modifier-hover", "--background-modifier-active-hover", "--background-modifier-border", "--background-modifier-border-hover", "--background-modifier-border-focus", "--background-modifier-error", "--background-modifier-error-hover", "--background-modifier-success", "--background-modifier-message", "--background-modifier-form-field", "--text-normal", "--text-muted", "--text-faint", "--text-on-accent", "--text-on-accent-inverted", "--text-accent", "--text-accent-hover", "--text-error", "--text-warning", "--text-success", "--text-selection", "--text-highlight-bg", "--caret-color", "--interactive-normal", "--interactive-hover", "--interactive-accent", "--interactive-accent-hover", "--font-interface-theme", "--font-text-theme", "--font-monospace-theme", "--font-text-size", "--line-height-normal", "--bold-weight", "--bold-color", "--file-line-width", "--file-margins", "--file-margins-inline", "--heading-spacing", "--p-spacing", "--list-spacing", "--h1-font", "--h2-font", "--h3-font", "--h4-font", "--h5-font", "--h6-font", "--h1-size", "--h2-size", "--h3-size", "--h4-size", "--h5-size", "--h6-size", "--h1-weight", "--h2-weight", "--h3-weight", "--h4-weight", "--h5-weight", "--h6-weight", "--h1-line-height", "--h2-line-height", "--h3-line-height", "--h4-line-height", "--h5-line-height", "--h6-line-height", "--h1-color", "--h2-color", "--h3-color", "--h4-color", "--h5-color", "--h6-color", "--inline-title-font", "--inline-title-size", "--inline-title-weight", "--inline-title-color", "--link-color", "--link-color-hover", "--link-external-color", "--link-external-color-hover", "--link-unresolved-color", "--blockquote-border-color", "--blockquote-color", "--code-background", "--code-normal", "--code-comment", "--code-function", "--code-important", "--code-keyword", "--code-property", "--code-punctuation", "--code-string", "--code-tag", "--code-value", "--table-background", "--table-border-color", "--table-header-background", "--table-header-background-hover", "--table-row-background-hover", "--table-row-background-selected", "--table-text-color", "--table-cell-padding", "--checkbox-color", "--checkbox-color-hover", "--checkbox-border-color", "--checkbox-border-color-hover", "--tag-color", "--tag-color-hover", "--tag-background", "--tag-background-hover", "--tag-border-color", "--tag-border-color-hover", "--hr-color", "--embed-border-left", "--embed-background", "--nav-item-color", "--nav-item-color-hover", "--nav-item-color-active", "--nav-item-background-hover", "--nav-item-background-active", "--nav-indentation-guide-color", "--tab-background-active", "--tab-text-color", "--tab-text-color-active", "--tab-container-background", "--tab-divider-color", "--tab-outline-color", "--ribbon-background", "--status-bar-background", "--status-bar-border-color", "--status-bar-text-color", "--titlebar-background", "--titlebar-background-focused", "--titlebar-text-color", "--titlebar-text-color-focused", "--divider-color", "--divider-color-hover", "--divider-width", "--modal-background", "--modal-border-color", "--modal-radius", "--prompt-border-color", "--metadata-background", "--metadata-divider-color", "--metadata-divider-color-hover", "--metadata-divider-color-focus", "--metadata-input-background", "--metadata-input-background-hover", "--metadata-input-text-color", "--metadata-label-text-color", "--metadata-label-text-color-hover", "--metadata-label-font", "--metadata-row-height", "--scrollbar-bg", "--scrollbar-thumb-bg", "--scrollbar-active-thumb-bg", "--radius-s", "--radius-m", "--radius-l", "--input-radius", "--button-radius", "--clickable-icon-radius", "--toggle-radius", "--toggle-thumb-radius", "--slider-thumb-radius", "--toggle-thumb-color", "--shadow-s", "--shadow-l", "--icon-color", "--icon-color-hover", "--icon-color-active", "--canvas-background", "--canvas-card-label-color", "--canvas-dot-pattern", "--canvas-card-background", "--canvas-card-border-color", "--graph-node", "--graph-text", "--graph-line", "--graph-node-unresolved", "--graph-node-focused", "--graph-node-tag", "--graph-node-attachment", "--graph-node-color", "--setting-items-background", "--setting-items-border-color", "--setting-group-heading-color", "--setting-group-heading-border-color", "--input-shadow"
]);
const unused = [...declared].filter((token) => token.startsWith("--enterprise-") && !referenced.has(token) && !allowlistedExternalTokens.has(token));
assert.deepEqual(unused, [], `Unused Enterprise tokens: ${unused.join(", ")}`);

for (const [mode, expected] of [[".theme-dark", "--color-base-100"], [".theme-light", "--color-base-100"]]) {
  assert.ok(effective.includes(mode) && effective.includes(expected), `${mode} is missing the complete base ramp.`);
}
console.log("Token and current-version safety validation passed.");
