# Typography and font licensing

Enterprise references four font families by name but does not redistribute or download them:

| Role | Preferred family | Upstream license |
| --- | --- | --- |
| Display | Bricolage Grotesque | SIL Open Font License 1.1 |
| Body | Instrument Sans | SIL Open Font License 1.1 |
| Mono | Spline Sans Mono | SIL Open Font License 1.1 |
| Handwriting | Caveat | SIL Open Font License 1.1 |

The CSS contains only family names and fallback stacks. No font binary, base64 font payload, or remote font URL is included.

If the preferred fonts are not installed, Obsidian falls back to system fonts automatically. Users can replace all four roles under **Settings → Style Settings → Enterprise → Typography**.

If font files are ever bundled in a future release, their upstream copyright notices and the complete SIL Open Font License must be included alongside the binaries before release.
