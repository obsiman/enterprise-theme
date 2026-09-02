# Verification record

Verification date: 2026-09-01

Target versions:

* Desktop: Obsidian 1.13.7 public
* Mobile: Obsidian 1.13.8 public

Operating system: Windows 11, x64 development host

Toolchain:

* Node.js 24.19.0
* npm 11.17.0
* Style Settings: 1.0.9, the current public release used by the disposable verification vault

## Repository verification

The repository checks are:

```text
npm ci --ignore-scripts --no-audit --no-fund
npm run build
npm run validate
npm run test
npm run lint
git diff --exit-code -- theme.css
```

The validation suite checks the manifest/version contract, deterministic generated CSS, current Style Settings metadata and live CSS references, token consumption, default light/dark contrast, current-version selectors and fixtures, embedded fonts, forbidden remote assets, deprecated Obsidian color helpers, valid callout colors, no `!important`, no `:has()`, and synchronized `theme.css`.

## Runtime matrix

The disposable vault is under `test/vault/`. The content fixtures are under `test/fixtures/` and the manual checklist is `test/runtime/RUNTIME_CHECKLIST.md`.

The required visual matrix is:

* Dark × Reading, Live Preview, Source
* Light × Reading, Live Preview, Source
* Reference, Neutral, and High contrast presets
* Compact interface, hidden ribbon, enterprise-hand, enterprise-paper, enterprise-wide, enterprise-narrow, enterprise-dense, and enterprise-no-title-stroke
* Phone portrait, phone landscape, tablet-sized, and desktop viewports

Core surfaces to exercise include workspace splits and tabs, navigation and search panels, command palette, menus, suggestions, notifications, prompts, modals, tooltips, the new Settings window/search, form controls, properties, Reading/Live Preview tables, image resizing/lightbox, Bases, Canvas, Graph, status bar, ribbon, and titlebar.

## Accessibility results

The automated default-palette contrast check covers primary, muted, faint, link, hover, success, warning, danger, CTA text/background, focus, and selected-navigation states in both modes. It also verifies that the High contrast preset improves the changed surface/text pair. The CSS preserves `:focus-visible`, uses a minimum configurable focus ring, avoids color-only task state, and limits reduced-motion changes to Enterprise-authored decoration and link transitions.

Actual application screenshots belong in `screenshots/enterprise-dark.png`, `screenshots/enterprise-light.png`, and `screenshot.png` (512×288) after the desktop runtime pass. The checklist records each Style Settings control, font-family override, computed variable change, reset, and responsive check.

Support statement: Enterprise targets the current Obsidian 1.13 architecture and does not currently provide backwards compatibility for pre-1.13 releases.
