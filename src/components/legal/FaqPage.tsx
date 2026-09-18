import { FaqAccordionItem } from "@/components/legal/FaqAccordionItem";
import { Container, Eyebrow } from "@/components/ui";
import type { FaqCategory } from "@/types/legal";

/** FAQ page. No Figma frame exists for it (plan section 4) — content and grouping are as published on the live site. */
export function FaqPage({ categories }: { categories: FaqCategory[] }) {
  return (
    <Container className="py-[50px]">
      <div className="mx-auto max-w-narrow">
        <h1 className="text-[36px] leading-[44px] xl:text-display">FAQs</h1>
        <p className="mt-3 max-w-[563px] font-sans text-body">Answers to the questions we’re asked most. Can’t find what you need? Get in touch and we’ll help.</p>

        <div aria-hidden="true" className="mt-8 h-px w-full bg-sand" />

        <div className="mt-12 flex flex-col gap-16">
          {categories.map((cat) => (
            <section key={cat.id} aria-labelledby={`${cat.id}-heading`}>
              <Eyebrow id={`${cat.id}-heading`}>{cat.title}</Eyebrow>
              <div className="mt-4">
                {cat.items.map((item) => (
                  <FaqAccordionItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
