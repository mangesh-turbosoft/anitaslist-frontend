# Fonts

## P22 Mackinac Pro — served from Adobe Fonts (Typekit), not bundled

The Figma design uses **P22 Mackinac Pro** (P22 Type Foundry) for every heading, button
label and nav item. The client's licence for this face is an Adobe Fonts / Typekit web
project (kit `ewt3ipw`), which serves the font from Adobe's CDN under that licence —
it does not grant redistributing the font files themselves. Earlier `.woff`/`.woff2` copies
of this font lived in this folder and were self-hosted via `next/font/local`; those were
**removed** since that licence hadn't actually been purchased. Do not re-add font files
here without the client confirming they own the right to redistribute them.

Current setup: `src/app/layout.tsx` renders `<link rel="stylesheet" href="https://use.typekit.net/ewt3ipw.css" />`
in `<head>`, which defines the `"p22-mackinac-pro"` font-family (weights 400/500/700/800,
normal + italic) directly from Adobe's servers. `globals.css`'s `--font-display` references
`"p22-mackinac-pro"` by name — no local font file or `next/font/local` wiring needed.

## Noto Sans — bundled via `next/font/google`

Self-hosted automatically at build time. Variable font, weights 400–700 used.
