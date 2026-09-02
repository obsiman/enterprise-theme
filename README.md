# Enterprise for Obsidian

Enterprise is a typography-led Obsidian theme with a quiet graphite dark mode, warm-paper light mode, restrained orange interaction, flat surfaces, hairline structure, and a short physical-marker stroke beneath page titles. Content stays visually dominant over application chrome.

The theme targets the current Obsidian 1.13 architecture only:

* Desktop: Obsidian 1.13.7 public
* Mobile: Obsidian 1.13.8 public

Enterprise does not provide backwards compatibility for pre-1.13 releases.

## Screenshots

Capture the runtime references as `screenshots/enterprise-dark.png`, `screenshots/enterprise-light.png`, and a 512×288 `screenshot.png` after following `test/runtime/RUNTIME_CHECKLIST.md`.

## Install

Install through **Settings → Appearance → Manage → Browse**, or install manually by placing `manifest.json` and `theme.css` in:

```text
.obsidian/themes/Enterprise/
```

Then choose **Enterprise** under **Settings → Appearance → Themes**. Style Settings is optional; defaults work without it.

## Typography

The default roles are:

* Display: Bricolage Grotesque
* Body and interface: Instrument Sans
* Technical: Spline Sans Mono
* Handwritten annotations: Caveat

Latin WOFF2 distributions are bundled and embedded into generated `theme.css`, so the intended defaults work offline with the two-file Obsidian theme package. All four font roles remain replaceable through Style Settings. Licensing and provenance are documented in [`THIRD-PARTY-NOTICES.md`](THIRD-PARTY-NOTICES.md), [`fonts/SOURCES.md`](fonts/SOURCES.md), and `licenses/fonts/`.

## Style Settings

The optional Style Settings plugin exposes organized, collapsible groups for:

* Reference, Neutral, and High contrast presets;
* light/dark surfaces, text, marker, interactive accent, selection, statuses, and category colors;
* display, body, interface, mono, and handwriting fonts;
* body size, line height, readable width, margins, bold weight, and H1-H6 scale;
* page-title marker width, thickness, gap, opacity, angle, color, and decoration style;
* H2 divider, handwriting layer, links, highlights, layout, borders, radii, callouts, tables, code, properties, interface density, ribbon visibility, motion, focus, and shadows.

Every visible setting is validated against the generated CSS. The `enterprise-content-padding` setting controls Reading, Live Preview, and Source note margins through the current file margin variables. `enterprise-highlight-opacity` derives the highlight wash with OKLCH `color-mix()`. `enterprise-compact-interface` only changes application chrome density.

## Utility classes

Add these to a note's frontmatter under `cssclasses`:

* `enterprise-hand` — makes the complete note handwritten, except technical code blocks;
* `enterprise-paper` — adds a subtle ruled-paper treatment;
* `enterprise-wide` — increases readable line width;
* `enterprise-narrow` — narrows readable line width;
* `enterprise-dense` — reduces paragraph, heading, and list spacing;
* `enterprise-no-title-stroke` — removes the page-title marker.

The automatic handwriting layer affects blockquotes, annotation callouts, comments, tags, status text, tooltips, empty-state copy, and utility handwriting. It can be disabled in Style Settings.

## Development

Source modules live in `src/`; `theme.css` is generated and must be committed with source changes. The architecture is:

```text
Style Settings → primitive tokens → semantic tokens → Obsidian adapter → component rules → theme.css
```

Use Node.js 24 and npm 11:

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run build
npm run validate
npm run test
npm run lint
git diff --exit-code -- theme.css
```

`npm run validate` runs separate manifest, build, Style Settings, token, contrast, and current-Obsidian contract checks. The build embeds only local font assets and is deterministic. CI is read-only and fails if the checked-in generated CSS differs.

The disposable vault, focused fixtures, Bases file, Canvas file, and runtime checklist are in `test/`. Runtime verification must use the actual current Obsidian desktop application and a disposable vault, never a mock browser rendering.

## Licensing and reference notice

Enterprise is MIT-licensed. Bundled fonts retain their upstream SIL Open Font License 1.1 notices. The theme was visually researched against ICOR for Life — INKLINE, but Enterprise's CSS, SVG geometry, token architecture, utilities, fonts, and implementation are independently authored. See [`NOTICE.md`](NOTICE.md).
