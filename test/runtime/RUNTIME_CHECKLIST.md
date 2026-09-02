# Runtime verification checklist

Run this checklist in the disposable vault with the exact public Obsidian build recorded in `docs/VERIFICATION.md`.

1. Enable Enterprise and Style Settings. Confirm the Enterprise settings section renders all groups and controls.
2. Check dark/light Reading, Live Preview, and Source modes. Exercise inline title, H1-H6, paragraphs, emphasis, links, unresolved links, tags, highlights, quotes, lists, tasks, code, embeds, horizontal rules, callouts, tables, footnotes, math, images, and properties.
3. Open command palette, menus, suggestions, notifications, prompts, modals, tooltips, Settings search, settings groups, form controls, file explorer, search, bookmarks, outline, backlinks, outgoing links, tags, status bar, tabs, ribbon, split panes, and pane dividers.
4. Open the `Enterprise.base`, `Enterprise.canvas`, and Graph views. Check table sorting/resizing/editing, Canvas selection/edges/zoom, and graph focused/unresolved/tag/attachment nodes.
5. For every Style Settings variable, change the value, observe the matching computed CSS variable and visual target, then reset. Exercise all preset options, class options, toggles, and utility classes.
6. Verify embedded font faces on title, H1-H5, body, H6, inline code, fenced code, handwritten quote, and tag. Replace each font role and verify the computed family changes.
7. Repeat at phone portrait, phone landscape, tablet-sized, and desktop widths with the keyboard visible. Confirm no title, table, image, settings, or navigation overflow.
8. Capture `screenshots/enterprise-dark.png`, `screenshots/enterprise-light.png`, and a 512x288 `screenshot.png` from the actual app after the checks.
