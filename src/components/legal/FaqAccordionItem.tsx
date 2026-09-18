import { IconChevronDown } from "@/components/icons";
import type { FaqItem } from "@/types/legal";

/**
 * One question. Native <details>/<summary> gives disclosure semantics, keyboard support and search-in-page
 * for free, with no JS and no extra library — the design has no accordion to match, so this follows the site's
 * borders/spacing rather than inventing a visual language.
 */
export function FaqAccordionItem({ item }: { item: FaqItem }) {
  return (
    <details className="group border-b-[0.5px] border-sand py-5 first:pt-0 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-h3 font-medium marker:content-none">
        {item.question}
        <IconChevronDown className="h-[9px] w-4 shrink-0 text-ink transition-transform duration-150 group-open:rotate-180" />
      </summary>
      <div className="mt-4 flex max-w-[720px] flex-col gap-3 font-sans text-body">
        {item.answer.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </details>
  );
}
