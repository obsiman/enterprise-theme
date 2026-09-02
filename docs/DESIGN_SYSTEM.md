# Enterprise design system

## Intent

Enterprise is a quiet, typography-led Obsidian theme built around a **graphite / warm paper / restrained orange** visual system. Dark mode should read like graphite and ink. Light mode should read like warm paper. Orange acts like a physical marker: it identifies focus, links, selected states, and the page-title stroke without becoming a decorative brand wash.

The interface should recede behind note content. Hierarchy is communicated primarily through typography, whitespace, and hairlines instead of cards, gradients, heavy shadows, or ornamental chrome.

## Token architecture

The implementation has three explicit token layers:

1. **Primitive tokens** in `src/10-primitives.css`: raw colors, type roles, physical spacing, dimensions, and radii.
2. **Semantic tokens** in `src/20-semantic.css`: surface, ink, marker, state, border, and interaction meanings.
3. **Obsidian adapter tokens** in `src/30-obsidian-adapter.css`: mappings from semantic theme intent into Obsidian's public CSS variables.

Component files consume semantic variables instead of raw values. Raw color literals are intentionally limited to primitive tokens and Style Settings metadata.

## Typography

The four replaceable roles are:

- **Display:** Bricolage Grotesque first, then the body/system fallback.
- **Body:** Instrument Sans first, then platform UI sans-serif fallbacks.
- **Monospace:** Spline Sans Mono first, then platform monospace fallbacks.
- **Handwriting:** Caveat first, then locally available handwriting fallbacks.

The theme bundles official latin WOFF2 distributions of the four preferred font families and embeds them into generated `theme.css`. This keeps the two-file theme package offline and self-contained while retaining replaceable Style Settings font roles. See `docs/FONTS.md` and `THIRD-PARTY-NOTICES.md` for provenance and licensing.

## Page title and headings

The inline page title has a short, slightly irregular marker stroke beneath it. It is authored with CSS geometry rather than an SVG asset. Users can switch it to a straight hairline or disable it completely.

The title exposes color, width, height, gap, opacity, size, weight, tracking, and bottom spacing. Its width is viewport-safe through `min()` so it cannot overflow small screens.

H2 receives a quiet hairline in both Reading view and Live Preview. It can be disabled, recolored, and resized.

## Handwritten layer

The handwriting role is used automatically for blockquotes, note/tip/quote callout bodies, editor comments, tags, status text, and tooltips. It can be disabled globally. `enterprise-hand` makes an entire note handwritten through `cssclasses`.

## Utility classes

- `enterprise-hand` — handwriting throughout the note.
- `enterprise-paper` — ruled-paper rhythm behind the note.
- `enterprise-wide` — wider reading measure.
- `enterprise-narrow` — narrower reading measure.
- `enterprise-dense` — tighter prose rhythm.
- `enterprise-no-title-stroke` — hides the title decoration for one note.

## Visual rules

- No gradients as decoration.
- No glow as a default state.
- Shadows are reserved for genuinely floating UI.
- Controls use borders for identity and surface changes for hover.
- Semantic status colors never replace the orange marker accent.
- Both dark and light modes must retain the same hierarchy.
- Any content styling added to Reading view must be checked in Live Preview as well.
