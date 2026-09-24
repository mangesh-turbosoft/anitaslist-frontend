import type { ReactNode } from "react";

/**
 * One label/content row of the new long-form page layout (Figma 1269:1116 etc): a 447px heading column, a 20px
 * gutter, then body content capped at 767px (the column itself is wider, but Figma's text never fills it).
 * Every row opens with 50px of top padding and closes with the same 50px of bottom padding, symmetric on both
 * sides of the divider between rows - confirmed against FAQ's own measured Figma coordinates (content bottom
 * to divider = 50px, divider to next heading = 50px, both sides identical), and it reads better on Privacy/
 * Cookie too: without it, the paragraph text ends right on top of the next divider.
 *
 * Both paddings have to live on the GRID ITEMS (h2 and the body div), not the grid container: padding on the
 * container insets the whole grid area, including where h2's own border-r starts/ends, so the vertical line
 * would begin 50px into the row and stop 50px short of its bottom instead of running the row's full height -
 * leaving a visible gap between it and the horizontal dividers directly above and below. Padding on h2 itself
 * keeps its border-box (and border) spanning the row's true top-to-bottom edges, while still pushing the
 * heading TEXT in by the same 50px on each side.
 *
 * The bottom padding also does double duty on the very last row of a page: it's what makes that row's border
 * reach all the way down to touch the footer (that closing 50px otherwise lives in the *page's* own bottom
 * padding, outside every row's box, leaving the line 50px short of the footer) - so no separate `isLast` case
 * is needed any more now every row gets this by default.
 *
 * The padding has to go on the BODY column specifically, not the heading: with CSS Grid's default stretch,
 * both columns are sized to match the taller one (the body, which has real paragraph text), so padding added
 * to the shorter heading column has no effect on the row's rendered height - it just gets absorbed into space
 * the body already forced. Padding on the body itself, being the column that actually sets the row's height,
 * is what the heading's border-r then stretches to match.
 */
export function LegalRow({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[447px_1fr] xl:gap-x-5">
      <h2 className="pt-10 font-display text-h2 xl:border-r-[0.5px] xl:border-sand xl:py-[50px]">{heading}</h2>
      <div className="min-w-0 max-w-[767px] pb-10 xl:py-[50px]">{children}</div>
    </div>
  );
}

/**
 * The hairline between rows (Figma e.g. 1264:955: left=-1px, width=1441px) - a full viewport-edge-to-edge
 * bleed on BOTH sides, not just the Container's own 1380px content width. `-mx-[30px]` only reaches
 * Container's own boundary (correct exactly at 1440px, short on anything wider).
 *
 * The fix is plain `vw`-based margins, not a `left: 50%` position trick: for `position: relative`, percentage
 * offsets resolve against the element's OWN containing block (its immediate parent), not the true viewport -
 * that was tried first and broke as soon as it was nested inside anything not itself viewport-width. `vw`, by
 * contrast, is always relative to the true viewport no matter how deep the nesting goes. Container is 720px
 * (half of 1440) minus its own 30px edge padding = 690px in from centre at 100vw; `690px - 50vw` is exactly
 * -30px at 1440px wide (matching the old fixed bleed) and grows for every px wider than that.
 */
export function LegalRowDivider() {
  return <div aria-hidden="true" className="hidden h-px bg-sand xl:mx-[calc(690px_-_50vw)] xl:block" />;
}
