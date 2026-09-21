# Fonts

## P22 Mackinac Pro — licensed, bundled via `next/font/local`

The Figma design uses **P22 Mackinac Pro** (P22 Type Foundry) for every heading, button
label and nav item. The licensed `.woff2` files live in this folder (Book, Book Italic,
Medium, Medium Italic, Bold, Bold Italic) and are wired up in `src/app/fonts.ts` as the
`p22` export, applied via `p22.variable` on `<html>` in `src/app/layout.tsx`.
`globals.css` reads `var(--font-p22)` for `--font-display` — no further setup needed.

## Noto Sans — bundled via `next/font/google`

Self-hosted automatically at build time. Variable font, weights 400–700 used.
