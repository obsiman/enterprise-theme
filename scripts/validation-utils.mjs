import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

export const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const expectedOrder = [
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

export const read = (path) => readFile(resolve(root, path), "utf8");

export async function getSources() {
  const contents = await Promise.all(expectedOrder.map((name) => read(`src/${name}`)));
  return Object.fromEntries(expectedOrder.map((name, index) => [name, contents[index]]));
}

export function stripSettings(css) {
  return css.replace(/\/\*\s*@settings\b[\s\S]*?\*\//g, "");
}

export function parseSettings(settingsCss) {
  const matches = settingsCss.match(/\/\*\s*@settings\b[\s\S]*?\*\//g) ?? [];
  if (matches.length !== 1) {
    throw new Error(`Expected exactly one Style Settings block, found ${matches.length}.`);
  }
  const yaml = matches[0].replace(/^\/\*\s*@settings\s*/, "").replace(/\s*\*\/$/, "");
  const document = YAML.parse(yaml);
  if (!document || document.name !== "Enterprise" || document.id !== "enterprise-theme") {
    throw new Error("Style Settings metadata must identify the Enterprise theme.");
  }
  if (!Array.isArray(document.settings)) {
    throw new Error("Style Settings metadata must contain a settings array.");
  }
  return document;
}

export function flattenSettings(settings) {
  return settings.flatMap((setting) => [setting, ...flattenSettings(setting.children ?? [])]);
}

export function customPropertyDeclarations(css) {
  return [...css.matchAll(/(--[a-z0-9-]+)\s*:/gi)].map((match) => match[1]);
}

export function customPropertyReferences(css) {
  return [...css.matchAll(/var\(\s*(--[a-z0-9-]+)/gi)].map((match) => match[1]);
}

export function fail(message) {
  throw new Error(message);
}

export function finish(message) {
  console.log(message);
}
