# Anita’s List — frontend

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 implementation of the Figma file
**Anitas list – Website Designs** (`DeeYAcafkCD6DuBvs2pkOH`), pages *Desktop Page Templates V2* and *Light boxes*.
The Laravel CMS/API comes later; everything data-shaped is already behind async fixture functions.

Analysis and master plan: <https://claude.ai/code/artifact/ff1a1465-d2a3-4ad8-a85d-2a035677109b>

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Before launch — blocking

**P22 Mackinac Pro is not in the repo.** Every heading, button label and nav item uses it in the design; it is a
commercial font (P22 Type Foundry). Until the licensed `.woff2` files are added, headings fall back to Georgia.
Steps are in [`src/fonts/README.md`](src/fonts/README.md) — a four-line change once the files exist.

## What is built

| Route | Figma frame(s) | Notes |
| --- | --- | --- |
| `/` | Homepage 886:5 | hero slider, CTA cards, how it works, expert advice, testimonials, category carousel, partners |
| `/about` | About 886:6 | hero, stats, vision/mission, village banner, team grid, testimonials, podcasts |
| `/sample-lists` | 886:7 | three carousel rows with "Note from Anita" |
| `/sample-lists/[slug]` | 886:8 | note slider, banner, add-to-list bar, product rows with expandable cards |
| `/account/login`, `/account/register` | 886:9, 886:10 | split layout, OAuth buttons, custom date picker, password rules |
| `/hub` | 886:11 / 886:12 | four panels; `?state=empty` shows the unpopulated frame |
| `/lists`, `/registries` | 886:13/14, 886:20/19 | card grids with three-dot menus; `?state=empty` |
| `/lists/[id]` | 910:2937, 886:15, 917:4969, 917:5720 | blank and journey lists; `?state=empty` for the empty frames |
| `/registries/[id]` | 886:21 / 886:22 | owner view; `?view=shared` renders the shared view |
| Lightboxes | Light boxes page | `?new=list`, `?new=registry`, `?new=date`, `?new=note` on `/hub`; `?share=1` on a registry |
| `/styleguide` | — | every token and shared component, for visual QA (noindex) |

Routes the design links to but never draws (`/products`, `/expert-advice`, `/contact`, `/faqs`, `/terms`,
`/privacy`, `/cookies`, `/anitas-village`, `/work-with-us`, `/feedback`, `/podcasts`, `/search`, …) render a
clearly labelled placeholder from `components/app/StubPage.tsx` so no link dead-ends.

## Structure

```
src/app            routes (flat; one shell for all pages), server actions in app/actions
src/components     layout · ui (tokens-level primitives) · cards · carousel · sections · forms · modals · app · icons
src/data           typed fixtures that stand in for the Laravel API
src/lib/api        async data access — swap fixtures for fetch here, call sites stay unchanged
src/types          API-shaped types: camelCase, ISO dates, integer pence, explicit null
src/app/globals.css design tokens as Tailwind v4 @theme variables (colour, type scale, container, radius, shadow)
public/images      Figma rasters, pre-cropped to the designer's crop transforms, WebP
```

Design values are documented in the JSDoc of every component (Figma node id, sizes, offsets) so a pixel check can
go straight from a component to its frame.

## Decisions taken during the build

- **Scope** is V2 + Light boxes. V1 is excluded; the Mobile Page Templates are reference only.
- **Responsive** is rules-first: the file has no tablet frames and mobile frames for four pages. Desktop is pixel-
  matched at 1440; below `xl` grids collapse and carousels keep horizontal scroll. Review on device is the acceptance test.
- **Banners are full viewport width** (hero images, 300px photo bands, the category carousel).
- **Carousels** are CSS scroll-snap with no autoplay or looping (neither is specified). One `Carousel` primitive covers all four layouts.
- **Modals** use the native `<dialog>`; the overlay sits above the header as it does in Figma.
- **Auth, subscribe, create/share/add actions** are server-action stubs that validate and redirect/acknowledge —
  they never pretend a backend call succeeded. Each has a `TODO (Laravel phase)`.
- **Deviations from the drawn text**, kept deliberately: "Subscibe" → "Subscribe"; "your your due date" → "your due
  date". Kept as drawn: "Get expert advise", "@2026, Anita’s List".

## Open items (need the client / designer)

See plan section 18. The short list: P22 Mackinac Pro licence · real copy (most text is lorem) · social profile URLs ·
where **Products** and the category carousel go now V1 is out · sticky header / fixed bar behaviour · hover, focus,
error and success states (none drawn) · search scope · whether Next.js owns auth.

## QA

`scripts/qa-capture.mjs` drives the installed Chrome (needs `npm i -D puppeteer-core`, dev-only) and writes
full-page screenshots at 1440 and 402 for every route to `.qa-shots/`, reporting console errors and horizontal
overflow. Last run: all routes 200, no console errors, no overflow.
