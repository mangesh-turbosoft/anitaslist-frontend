import type { FaqItem } from "@/types/legal";

/**
 * One question, Figma 1263:436 ("List item one"): a bordered row with the question and a chevron button, the
 * answer revealed beneath. Native <details>/<summary> keeps disclosure semantics, keyboard support and
 * in-page search for free. `defaultOpen` matches Figma drawing the very first item pre-expanded, as a
 * demonstration of the open state (same convention as AdviceTile's hover state shown open on its first card).
 *
 * The chevron button (Figma 1263:439/450) is a solid 40x40 terracotta square with a white chevron - not a bare
 * icon - pointing down when closed and up when open; both are the exact same glyph, just rotated 180deg, so one
 * inline path (traced from Figma's own SVG export) covers both states instead of swapping assets.
 */
export function FaqAccordionItem({ item, defaultOpen = false }: { item: FaqItem; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group border-[0.5px] border-sand bg-cream/25 open:pb-5">
      <summary className="flex min-h-[70px] cursor-pointer list-none items-center justify-between gap-4 py-4 pl-[30px] pr-5 font-display text-h3 font-medium marker:content-none">
        {item.question}
        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-terracotta">
          <svg width="16" height="9" viewBox="0 0 16 9" fill="none" className="text-cream transition-transform duration-150 group-open:rotate-180" aria-hidden="true">
            <path d="M1 1L8.3 8L15.75 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div className="flex flex-col gap-3 px-[30px] font-sans text-body">
        {item.answer.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </details>
  );
}
