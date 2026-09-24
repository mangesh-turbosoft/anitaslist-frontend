import { FaqAccordionItem } from "@/components/legal/FaqAccordionItem";
import { LegalHero } from "@/components/legal/LegalHero";
import { Container } from "@/components/ui";
import type { FaqCategory } from "@/types/legal";

const heroImage = { src: "/images/legal-hero-banner-2880x700.webp", width: 2880, height: 700 };

/**
 * Figma's sidebar (1263:424/427/429/431) uses shorter labels than our category titles, and orders/groups them
 * differently. "General" is a verbatim match (title + all 15 questions). The rest are matched by content:
 * registry-owner questions under "Registries", invited-guest questions under "Registry guests", and the
 * one-to-one consultation questions - the closest thing to talking to Anita directly - under "Ask us directly".
 */
const SIDEBAR_ORDER: Record<string, string> = {
  general: "General",
  "baby-registry": "Registries",
  "invited-to-registry": "Registry guests",
  "premium-services": "Ask us directly",
};

/**
 * FAQ page, pixel-matched to Figma 1263:290: a sticky category sidebar beside stacked question lists. Figma
 * draws a per-category intro line ("Lorem ipsum dolor sit amet consectetur samet. Bibendum odiosit amet
 * aliquam.") repeated identically above every category - it's the same placeholder in all 4 spots in the
 * design file itself (not real per-category copy), so it's kept as drawn rather than invented per category.
 */
export function FaqPage({ categories }: { categories: FaqCategory[] }) {
  const ordered = Object.keys(SIDEBAR_ORDER)
    .map((id) => categories.find((c) => c.id === id))
    .filter((c): c is FaqCategory => Boolean(c));

  return (
    <>
      <LegalHero eyebrow="Frequently asked questions" heading="FAQs" image={heroImage} />
      <Container>
        {/* Figma: the sidebar (1263:423, top=430) starts flush with the hero, no offset of its own - only the
            content column (1263:418, top=480) gets 50px of breathing room, and each later category repeats
            that same 50px after its divider. So the top padding lives on the content sections themselves
            (xl:pt-[50px] on every one, first included), not on this row, which stays flush at xl.
            xl:items-stretch (the flex default) makes the sidebar wrapper match the content column's full
            height, so its border-r reads as one continuous vertical line (Figma's own tall vector) - which
            is also why the closing 50px before the footer is padding-bottom on the CONTENT column, not on
            this Container: padding outside the row wouldn't be included in that stretched height, leaving
            the line short of the footer instead of touching it. */}
        <div className="flex flex-col gap-10 pt-10 xl:flex-row xl:gap-5 xl:pt-0">
          <div className="xl:w-[477px] xl:border-r-[0.5px] xl:border-sand">
            <nav aria-label="FAQ categories" className="flex flex-row flex-wrap gap-2 xl:sticky xl:top-[100px] xl:flex-col xl:gap-0">
              {ordered.map((cat, i) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className={
                    i === 0
                      ? "flex h-[60px] items-center border-[0.5px] border-terracotta bg-terracotta px-5 font-display text-label font-medium text-cream xl:border-r-0"
                      : "flex h-[60px] items-center border-[0.5px] border-sand px-5 font-display text-label font-medium text-ink xl:border-r-0 xl:border-t-0"
                  }
                >
                  {SIDEBAR_ORDER[cat.id]}
                </a>
              ))}
            </nav>
          </div>

          <div className="min-w-0 flex-1 pb-10 xl:pb-[50px]">
            {ordered.map((cat, catIndex) => (
              <div key={cat.id}>
                {/* Figma 1263:534 etc: this divider starts exactly at the vertical line and runs to the actual
                    browser viewport's right edge, not just the 1440px reference frame's own edge (all a fixed-
                    pixel bleed like calc(100%+Npx) can ever reach, leaving a gap on any monitor wider than
                    1440). The left edge only needs a constant -20px (the sidebar-to-content gutter, Container-
                    independent - the content column's own left edge is always exactly 20px right of the
                    vertical line, regardless of viewport width). The right edge needs an actual viewport-
                    relative unit: `vw` is always relative to the true viewport no matter how deep this div is
                    nested, unlike a `%` margin/position (which resolves against this div's own, off-centre
                    content-column parent - that was tried first and came out badly wrong). Container is
                    720px (half of 1440) minus its own 30px edge padding = 690px in from centre at 100vw;
                    `690px - 50vw` is 0 at exactly 1440px wide (matching the old fixed bleed) and grows for
                    every px wider than that. It also sits a clear 50px below the previous category's last
                    question (top=2066 vs. that question's own bottom at 2016) - the same 50px rhythm as
                    everywhere else on this page, not flush against it. */}
                {catIndex > 0 && (
                  <div aria-hidden="true" className="hidden h-px bg-sand xl:-ml-5 xl:mt-[50px] xl:mr-[calc(690px_-_50vw)] xl:block" />
                )}
                <section id={cat.id} className="scroll-mt-[100px] pt-10 xl:pt-[50px]">
                  <p className="font-display text-h2">
                    Lorem ipsum dolor sit amet consectetur samet. <em className="italic">Bibendum odiosit amet aliquam.</em>
                  </p>
                  <p className="mt-2 max-w-[797px] font-sans text-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
                  </p>
                  <div className="mt-6 flex flex-col gap-[10px]">
                    {cat.items.map((item, itemIndex) => (
                      <FaqAccordionItem key={item.id} item={item} defaultOpen={catIndex === 0 && itemIndex === 0} />
                    ))}
                  </div>
                </section>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
