---
cssclasses:
  - enterprise-paper
  - enterprise-wide
tags:
  - enterprise
  - fixture
status: active
---

# Enterprise Theme Fixture

This file exists to exercise the theme manually in both **Reading view** and **Live Preview**.

## Heading two with hairline

### Heading three

#### Heading four

##### Heading five

###### Mono kicker

Paragraph with an [[Internal Link]], an [external link](https://example.com), ==highlighted text==, **bold**, *italic*, `inline code`, and #tag.

> A blockquote should use the handwriting layer unless the setting is disabled.

> [!note] Handwritten note
> The content should use the handwriting role while the title remains interface-like.

> [!warning] Warning
> Semantic state color should remain legible in both modes.

- [ ] Open task
- [x] Completed task
- Nested list
  - Child item

| Column | Value | Notes |
| --- | ---: | --- |
| Alpha | 10 | Baseline |
| Beta | 20 | Hover rows |

```ts
const theme = "enterprise";
console.log(theme);
```

---

Use this fixture to verify title decoration, H2 rules, typography, links, highlights, callouts, lists, tables, code, and utility classes.
