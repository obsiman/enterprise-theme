import { strict as assert } from "node:assert";

const palettes = {
  light: {
    surface: "#f6f3ec",
    text: "#171a20",
    muted: "#4d4a42",
    faint: "#5a574e",
    link: "#b93613",
    hover: "#8f2e10",
    success: "#5b765d",
    warning: "#866c32",
    danger: "#b33a2b",
    accent: "#b93613",
    onAccent: "#fff6f0",
    focus: "#b93613",
    boundary: "#777166"
  },
  dark: {
    surface: "#090a0c",
    text: "#f6f3ec",
    muted: "#c9c4b8",
    faint: "#8e897d",
    link: "#ff5a2d",
    hover: "#ff7248",
    success: "#7d9a7f",
    warning: "#c2a35c",
    danger: "#e36350",
    accent: "#ff5a2d",
    onAccent: "#180e08",
    focus: "#ff5a2d",
    boundary: "#7b7d80"
  }
};

function luminance(hex) {
  const value = hex.slice(1);
  const rgb = [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16) / 255);
  const linear = rgb.map((channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(first, second) {
  return (Math.max(luminance(first), luminance(second)) + 0.05) / (Math.min(luminance(first), luminance(second)) + 0.05);
}

for (const [mode, palette] of Object.entries(palettes)) {
  for (const role of ["text", "muted", "faint", "link", "hover", "success", "warning", "danger"]) {
    assert.ok(contrast(palette.surface, palette[role]) >= 4.5, `${mode} ${role} text fails WCAG AA.`);
  }
  assert.ok(contrast(palette.accent, palette.onAccent) >= 4.5, `${mode} CTA text fails WCAG AA.`);
  assert.ok(contrast(palette.surface, palette.focus) >= 3, `${mode} focus indicator fails the 3:1 boundary threshold.`);
  assert.ok(contrast(palette.surface, palette.boundary) >= 3, `${mode} control boundary fails the 3:1 threshold.`);
}

assert.ok(contrast(palettes.light.surface, palettes.light.text) > contrast(palettes.light.surface, palettes.light.muted), "Light High contrast preset does not improve text contrast.");
assert.ok(contrast(palettes.dark.surface, palettes.dark.text) > contrast(palettes.dark.surface, palettes.dark.muted), "Dark High contrast preset does not improve text contrast.");
console.log("Default light/dark WCAG contrast validation passed.");
