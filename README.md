# Enterprise for Obsidian

Enterprise is a typography-led Obsidian theme with a quiet **graphite / warm paper / restrained orange** visual system. It keeps note content dominant, uses whitespace and hairlines for structure, and adds a configurable physical-marker accent beneath page titles.

Both dark and light modes are supported, along with Reading view and Live Preview parity.

## Install

For manual installation, place these files in:

`.obsidian/themes/Enterprise/`

- `manifest.json`
- `theme.css`

Then select **Enterprise** under **Settings → Appearance → Themes**.

## Style Settings

Install the community plugin **Style Settings** to customize the theme without editing CSS. Enterprise exposes one organized configuration surface covering:

- presets;
- dark/light colors;
- display, body, mono, and handwriting fonts;
- body size, line height, reading width, and bold weight;
- page-title decoration, color, width, height, gap, opacity, size, weight, tracking, and spacing;
- H2 hairline color, thickness, and disable toggle;
- handwriting behavior;
- links and highlights;
- layout;
- borders;
- components;
- interface density and ribbon visibility;
- advanced motion and focus tokens.

Style Settings is optional. The theme has complete defaults without it.

## Typography

Preferred roles:

- **Display:** Bricolage Grotesque
- **Body:** Instrument Sans
- **Mono:** Spline Sans Mono
- **Handwriting:** Caveat

Fonts are **not bundled and are never fetched remotely**. Install those families locally for the intended appearance, or replace each family in Style Settings. See `docs/FONTS.md`.

## Page-title marker

The title marker is CSS-authored rather than an imported SVG. Its default shape is short and slightly irregular, with a restrained orange marker color. Users can choose:

- **Marker stroke**
- **Hairline**
- **None**

The marker is viewport-safe and cannot extend beyond the mobile content area.

## Handwritten layer

By default, the handwriting role is used selectively for blockquotes, note/tip/quote callout bodies, comments, tags, tooltips, and status text. It can be disabled globally.

For note-level control, add utility classes through frontmatter:

```yaml
---
cssclasses:
  - enterprise-hand
  - enterprise-paper
---
```

Available utility classes:

- `enterprise-hand`
- `enterprise-paper`
- `enterprise-wide`
- `enterprise-narrow`
- `enterprise-dense`
- `enterprise-no-title-stroke`

## Development

Source modules live in `src/`. `theme.css` is generated and should not be edited directly.

```bash
npm run build
npm run validate
```

For the official Obsidian Stylelint rules:

```bash
npm install
npm run lint
```

`npm run validate` checks the module contract, Style Settings coverage, token layers, generated CSS, dark/light support, Reading/Live Preview selectors, mobile-safe title stroke, reduced motion, and guards against remote assets or reference-theme source leakage.

Use `test/fixtures/theme-contract.md` in a test vault for manual visual verification.

## Architecture

```text
Style Settings
      ↓
Primitive tokens
      ↓
Semantic tokens
      ↓
Obsidian adapter variables
      ↓
Typography / content / components / interface / utilities
      ↓
Generated theme.css
```

See `docs/DESIGN_SYSTEM.md` for the design decisions and token model.

## Reference and licensing

This theme was visually researched against an existing graphite/paper/marker Obsidian theme, but its CSS, title geometry, token architecture, utilities, and Style Settings implementation are independently authored. See `NOTICE.md`.

Enterprise is licensed under MIT. Third-party fonts are not included.
