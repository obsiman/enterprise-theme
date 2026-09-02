# Obsidian 1.13 CSS variable coverage

This inventory records the current public theme-facing variable families documented by Obsidian and the Enterprise decision for each one. It is intentionally selective: Enterprise overrides variables that carry the visual system and inherits variables where the native implementation is the correct compatibility layer.

Source: [Obsidian developer documentation — Foundations / Colors](https://docs.obsidian.md/Reference/CSS%20variables/Foundations/Colors), the current 1.13 application surface, and the generated adapter in `src/30-obsidian-adapter.css`.

| Area | Variables | Enterprise treatment |
| --- | --- | --- |
| Foundations / colors | `--color-base-00` … `--color-base-100` | Override with warm-paper and graphite ramps. |
| Foundations / colors | `--color-accent`, `--color-accent-1`, `--color-accent-2` | Derived from the interactive accent role. |
| Foundations / colors | `--color-red`, `--color-orange`, `--color-yellow`, `--color-green`, `--color-cyan`, `--color-blue`, `--color-purple`, `--color-pink` | Derived from the secondary/category palette. |
| Foundations / colors | `--mono-0`, `--mono-100` | Derived from mode-specific black and white support tokens. |
| Semantic surfaces | `--background-primary`, `--background-primary-alt`, `--background-secondary`, `--background-secondary-alt` | Derived from Enterprise surface tokens. |
| Semantic modifiers | `--background-modifier-hover`, `--background-modifier-active-hover`, `--background-modifier-border`, `--background-modifier-border-hover`, `--background-modifier-border-focus` | Derived from Enterprise hover, hairline, and control-border tokens. |
| Semantic state | `--background-modifier-error`, `--background-modifier-error-hover`, `--background-modifier-success`, `--background-modifier-message`, `--background-modifier-form-field` | Derived with OKLCH `color-mix()`. |
| Typography | `--font-interface-theme`, `--font-text-theme`, `--font-monospace-theme`, `--font-text-size`, `--line-height-normal`, `--bold-weight`, `--bold-color` | Derived from configurable typography primitives. |
| Editor / file | `--file-line-width`, `--file-margins`, `--file-margins-inline`, `--heading-spacing`, `--p-spacing`, `--list-spacing` | Derived from Layout settings and utility classes. |
| Inline title | `--inline-title-font`, `--inline-title-size`, `--inline-title-weight`, `--inline-title-color` | Derived; marker remains an independently authored pseudo-element. |
| Headings | `--h1-font` … `--h6-font`, `--h1-size` … `--h6-size`, `--h1-weight` … `--h6-weight`, `--h1-line-height` … `--h6-line-height`, `--h1-color` … `--h6-color` | Derived; explicit Enterprise scale is configurable. |
| Links | `--link-color`, `--link-color-hover`, `--link-external-color`, `--link-external-color-hover`, `--link-unresolved-color`, `--text-accent`, `--text-accent-hover` | Derived from link and accent roles. |
| Text states | `--text-normal`, `--text-muted`, `--text-faint`, `--text-on-accent`, `--text-on-accent-inverted`, `--text-error`, `--text-warning`, `--text-success`, `--text-selection`, `--text-highlight-bg`, `--caret-color` | Derived from semantic text, status, selection, and caret roles. |
| Lists and tasks | `--list-spacing`, `--checkbox-color`, `--checkbox-color-hover`, `--checkbox-border-color`, `--checkbox-border-color-hover` | Derived; native list structure and task behavior are inherited. |
| Callouts | `--blockquote-border-color`, `--blockquote-color`, `--callout-color` | Derived where Enterprise assigns a current valid CSS color; layout behavior inherits. |
| Tables | `--table-background`, `--table-border-color`, `--table-header-background`, `--table-header-background-hover`, `--table-row-background-hover`, `--table-row-background-selected`, `--table-text-color`, `--table-cell-padding` | Derived; current table structure gets a runtime-adjustable row height. |
| Properties | `--metadata-background`, `--metadata-divider-color`, `--metadata-divider-color-hover`, `--metadata-divider-color-focus`, `--metadata-input-background`, `--metadata-input-background-hover`, `--metadata-input-text-color`, `--metadata-label-text-color`, `--metadata-label-text-color-hover`, `--metadata-label-font`, `--metadata-row-height` | Derived from property and component tokens. |
| Tabs | `--tab-background-active`, `--tab-text-color`, `--tab-text-color-active`, `--tab-container-background`, `--tab-divider-color`, `--tab-outline-color` | Derived; native tab interaction and stacking are inherited. |
| Navigation | `--nav-item-color`, `--nav-item-color-hover`, `--nav-item-color-active`, `--nav-item-background-hover`, `--nav-item-background-active`, `--nav-indentation-guide-color` | Derived; row density is configurable. |
| Status / ribbon / titlebar | `--ribbon-background`, `--status-bar-background`, `--status-bar-border-color`, `--status-bar-text-color`, `--titlebar-background`, `--titlebar-background-focused`, `--titlebar-text-color`, `--titlebar-text-color-focused` | Derived; hide-ribbon remains an explicit opt-in class toggle. |
| Dividers and overlays | `--divider-color`, `--divider-color-hover`, `--divider-width`, `--modal-background`, `--modal-border-color`, `--modal-radius`, `--prompt-border-color` | Derived from borders, radii, and motion tokens. |
| Forms | `--interactive-normal`, `--interactive-hover`, `--interactive-accent`, `--interactive-accent-hover`, `--input-radius`, `--button-radius`, `--clickable-icon-radius`, `--toggle-radius`, `--toggle-thumb-radius`, `--slider-thumb-radius`, `--toggle-thumb-color` | Derived; native controls and keyboard behavior are inherited. |
| Icons | `--icon-color`, `--icon-color-hover`, `--icon-color-active` | Derived from text and accent roles. |
| Scrollbars | `--scrollbar-bg`, `--scrollbar-thumb-bg`, `--scrollbar-active-thumb-bg` | Derived; native scrollbar mechanics are inherited. |
| Graph | `--graph-node`, `--graph-text`, `--graph-line`, `--graph-node-unresolved`, `--graph-node-focused`, `--graph-node-tag`, `--graph-node-attachment`, `--graph-node-color` | Derived from text, category, and accent roles. |
| Canvas | `--canvas-background`, `--canvas-card-label-color`, `--canvas-dot-pattern`, `--canvas-card-background`, `--canvas-card-border-color` | Derived from surfaces, text, and hairlines; native canvas interaction is inherited. |
| Settings | `--setting-items-background`, `--setting-items-border-color`, `--setting-group-heading-color`, `--setting-group-heading-border-color`, `--input-shadow` | Derived from surfaces and borders; native Settings layout and keyboard navigation are inherited. |
| Other current components | Unlisted variables introduced by core or plugins | Intentionally inherit from Obsidian unless a tested Enterprise visual role requires an adapter entry. |

## Deliberate non-coverage

Enterprise does not define deprecated RGB/HSL helper variables, including `--color-*-rgb`, `--color-accent-hsl`, `--interactive-accent-hsl`, `--mono-rgb-*`, `--background-modifier-*-rgb`, or `--text-highlight-bg-rgb`. Obsidian 1.13's documented OKLCH model is used for transparent washes instead.
