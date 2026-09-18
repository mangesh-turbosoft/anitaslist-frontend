# Fonts

## P22 Mackinac Pro — NOT BUNDLED (commercial licence required)

The Figma design uses **P22 Mackinac Pro** (P22 Type Foundry) for every heading, button
label and nav item — 2,039 text nodes in Medium alone. It is not on Google Fonts and is
not included in this repository.

Until licensed webfont files are supplied, `--font-display` falls back to
`"P22 Mackinac Pro", Georgia, "Times New Roman", serif`. Headings will therefore not be
pixel-accurate against Figma.

### To enable

1. Obtain a webfont licence and the `.woff2` files for:
   - Book (400), Book Italic (400 italic), Medium (500), Medium Italic (500 italic), Bold (700)
2. Place them in this folder using these exact names:
   ```
   P22MackinacPro-Book.woff2
   P22MackinacPro-BookItalic.woff2
   P22MackinacPro-Medium.woff2
   P22MackinacPro-MediumItalic.woff2
   P22MackinacPro-Bold.woff2
   ```
3. In `src/app/fonts.ts`, uncomment the `p22` export.
4. In `src/app/layout.tsx`, add `p22.variable` to the `<html>` className.

No other change is needed — `globals.css` already reads `var(--font-p22)`.

## Noto Sans — bundled via `next/font/google`

Self-hosted automatically at build time. Variable font, weights 400–700 used.
