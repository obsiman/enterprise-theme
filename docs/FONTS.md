# Typography and font licensing

Enterprise ships the four default font roles locally. The repository contains official latin WOFF2 distributions and the build embeds them as data URLs into `theme.css`, which keeps the two-file Obsidian theme package self-contained and offline.

| Role | Family | File | License |
| --- | --- | --- | --- |
| Display | Bricolage Grotesque | `fonts/BricolageGrotesque-latin.woff2` | SIL OFL 1.1 |
| Body/interface | Instrument Sans | `fonts/InstrumentSans-latin.woff2` | SIL OFL 1.1 |
| Technical | Spline Sans Mono | `fonts/SplineSansMono-latin.woff2` | SIL OFL 1.1 |
| Handwriting | Caveat | `fonts/Caveat-latin.woff2` | SIL OFL 1.1 |

The files are from the official Google Fonts webfont distributions of the original upstream projects listed in [`fonts/SOURCES.md`](../fonts/SOURCES.md). They are not copied from ICOR/INKLINE. The build does not load a remote URL, and validation rejects remote assets and any font face that is not generated from a repository-local file.

The complete SIL Open Font License and each original copyright notice are in `licenses/fonts/`. The font binaries are redistributable with this theme under that license. The CSS default stacks remain replaceable through all five typography-related Style Settings controls.
