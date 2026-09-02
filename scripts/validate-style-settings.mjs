import { strict as assert } from "node:assert";
import { getSources, parseSettings, stripSettings, flattenSettings } from "./validation-utils.mjs";

const sources = await getSources();
const settingsCss = sources["00-style-settings.css"];
const document = parseSettings(settingsCss);
const effectiveCss = stripSettings(Object.values(sources).join("\n"));
const settings = flattenSettings(document.settings);
const validTypes = new Set([
  "heading",
  "variable-text",
  "variable-number",
  "variable-number-slider",
  "variable-color",
  "variable-themed-color",
  "variable-select",
  "class-toggle",
  "class-select"
]);
const ids = new Set();

for (const setting of settings) {
  assert.ok(setting.id && /^[a-z0-9-]+$/.test(setting.id), `Invalid Style Settings id: ${setting.id}`);
  assert.ok(!ids.has(setting.id), `Duplicate Style Settings id: ${setting.id}`);
  ids.add(setting.id);
  assert.ok(validTypes.has(setting.type), `Unsupported Style Settings type: ${setting.type}`);
  assert.ok(setting.title, `Missing title for ${setting.id}`);

  if (setting.type === "heading") continue;
  if (setting.type.startsWith("variable-")) {
    const variable = `--${setting.id}`;
    assert.match(effectiveCss, new RegExp(`${variable.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*:|var\\(\\s*${variable.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`), `${setting.id} is disconnected from effective CSS.`);
  }
  if (setting.type === "variable-themed-color") {
    assert.ok(setting["default-light"] && setting["default-dark"], `${setting.id} needs light and dark defaults.`);
  }
  if (["variable-number", "variable-number-slider"].includes(setting.type)) {
    for (const field of ["default", "min", "max", "step"]) assert.ok(setting[field] !== undefined, `${setting.id} is missing ${field}.`);
    assert.ok(setting.min <= setting.default && setting.default <= setting.max, `${setting.id} default is outside its range.`);
  }
  if (["variable-select", "class-select"].includes(setting.type)) {
    assert.ok(Array.isArray(setting.options) && setting.options.length > 0, `${setting.id} needs options.`);
    const optionValues = new Set();
    for (const option of setting.options) {
      assert.ok(option.label && option.value !== undefined, `${setting.id} contains an invalid option.`);
      assert.ok(!optionValues.has(String(option.value)), `${setting.id} contains a duplicate option.`);
      optionValues.add(String(option.value));
      if (setting.type === "class-select") {
        assert.match(effectiveCss, new RegExp(`\\.${String(option.value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:[^a-z0-9_-]|$)`), `${setting.id} option ${option.value} has no implementation selector.`);
      }
    }
  }
  if (setting.type === "class-toggle") {
    assert.match(effectiveCss, new RegExp(`\\.${setting.id}(?:[^a-z0-9_-]|$)`), `${setting.id} is disconnected from implementation CSS.`);
  }
}

for (const title of ["Presets", "Colors", "Typography", "Page title and headings", "Handwritten layer", "Links and highlights", "Layout", "Borders and radii", "Components", "Interface", "Advanced"]) {
  assert.ok(settings.some((setting) => setting.title === title), `Missing Style Settings group: ${title}`);
}

assert.equal((settingsCss.match(/\/\*\s*@settings\b/g) ?? []).length, 1);
console.log(`Style Settings contract validation passed for ${settings.length} settings.`);
