Vendored from Temml (MIT), which does not ship the math font itself.

- `Temml-Latin-Modern.css`, `Temml.woff2` — copied from `node_modules/temml/dist/`.
  `Temml.woff2` is a clone of KaTeX_Script-Regular remapped to the Unicode script
  capitals; it supplies `\mathscr` and fixes prime alignment in Chrome/Edge.
- `latinmodernmath.woff2` — https://temml.org/assets/latinmodernmath.woff2, from
  GUST's e-foundry. Licensed under the GUST Font License (see
  `GUST-FONT-LICENSE.txt`), which is legally equivalent to the LPPL.

The CSS references both font files by relative URL, so keep them in this folder.
