# Bundled font sources

Enterprise embeds the latin WOFF2 distributions of these four upstream font projects in the generated `theme.css`:

| Family | Upstream project | Distribution revision |
| --- | --- | --- |
| Bricolage Grotesque | [ateliertriay/bricolage](https://github.com/ateliertriay/bricolage) | Google Fonts webfont v9 |
| Instrument Sans | [Instrument/instrument-sans](https://github.com/Instrument/instrument-sans) | Google Fonts webfont v4 |
| Spline Sans Mono | [SorkinType/SplineSansMono](https://github.com/SorkinType/SplineSansMono) | Google Fonts webfont v13 |
| Caveat | [davelab6/caveat](https://github.com/davelab6/caveat) | Google Fonts webfont v23 |

The downloaded files are the official Google Fonts WOFF2 distributions of the upstream projects. They are stored locally and base64-embedded during `npm run build`; the theme has no runtime font or network dependency. Each family is licensed under the SIL Open Font License 1.1. See the per-family notices and the complete license in `licenses/fonts/`.
