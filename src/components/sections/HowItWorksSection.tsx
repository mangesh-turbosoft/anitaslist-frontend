import { Button, Container, Divider, Eyebrow, RichText } from "@/components/ui";
import type { HomeContent } from "@/types/content";

/**
 * Figma (950:9052): 1440x496. Eyebrow at y=0, H2 at y=47 (1145 max width), steps row at y=180 in the 4-col grid
 * (330 wide, 20 gap): 33x33 #2D1A14 square with the number (P22 700 16 cream), caption 54px below (P22 500 24/34).
 * Button 149x40 at y=376. Full-width hairline at the bottom.
 */
export function HowItWorksSection({ eyebrow, heading, steps, cta }: HomeContent["howItWorks"]) {
  return (
    <section aria-labelledby="how-it-works-heading" className="pt-[51px]">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id="how-it-works-heading" className="mt-[1px] max-w-[1145px] text-h2">
          <RichText text={heading} />
        </h2>
        <ol className="mt-[45px] grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.id} className="flex flex-col">
              <span
                aria-hidden="true"
                className="flex size-[33px] items-center justify-center bg-ink font-display text-label font-bold leading-none text-cream"
              >
                {i + 1}
              </span>
              <p className="mt-[21px] font-display text-h3 font-medium">
                <span className="sr-only">Step {i + 1}: </span>
                <RichText text={step.text} />
              </p>
            </li>
          ))}
        </ol>
        <Button href={cta.href} className="mt-10 w-[149px] px-0">
          {cta.label}
        </Button>
      </Container>
      <Divider className="mt-20" />
    </section>
  );
}
