import { Image } from "@/components/ui/Image";
import { ExpertAdviceSection } from "@/components/sections/ExpertAdviceSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Container, Rating, RichText } from "@/components/ui";
import { homeContent } from "@/data/home";

const heroImage = { src: "/images/how-it-works-hero-2727x1286.webp", width: 2727, height: 1286 };

/** Lorem-ipsum in the design itself (Figma 1343:10832 etc, repeated identically across all 6 points - same convention as the Pushchair advice hub). */
const points = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: n,
  heading: "Lorem ipsum dolor sit amet consectetur. <em>Bibendum odio sit.</em>",
  items: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    "Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    "Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  ],
}));

/**
 * How it works page (Figma 1343:10466, 1440x3069). Hero/body/point copy is lorem-ipsum in the design itself
 * (same convention as the homepage fixture and the Pushchair advice hub); the Expert advice and Testimonials
 * sections reuse the homepage's own real blocks (ExpertAdviceSection/TestimonialsSection), matching Figma's
 * near-identical reuse of those two patterns on this page.
 */
export function HowItWorksPage() {
  return (
    <>
      <section className="relative h-[420px] w-full overflow-hidden xl:h-[649px]">
        <Image src={heroImage.src} alt="" fill priority sizes="100vw" className="object-cover" />
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[1060px] max-w-full bg-gradient-to-r from-cream to-cream/0" />
        <Container className="absolute inset-0 flex flex-col justify-center gap-[10px] pb-16 xl:justify-start xl:pt-[109px]">
          <p className="font-sans text-eyebrow-xs font-semibold uppercase">How it works</p>
          <h1 className="max-w-[563px] font-display text-h2 xl:text-display">
            <RichText text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, <em>sed do eiusmod tempor.</em>" />
          </h1>
          <p className="max-w-[447px] font-sans text-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
          </p>
          <Rating score="4.9" outOf="5.0" caption="00,000 reviews on trust pilot" className="mt-8" />
        </Container>
      </section>

      <Container className="pt-10 xl:pt-[51px]">
        <p className="max-w-[678px] font-display text-h2">
          <RichText text="Lorem ipsum dolor sit amet consectetur. Bibendum odiosit amet aliquam sit ultrices<em>.</em>" />
        </p>
      </Container>

      <div aria-hidden="true" className="mt-10 h-px w-full bg-sand xl:mt-[37px]" />

      <Container className="pb-16 xl:pb-20">
        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 xl:-mt-px xl:grid-cols-3 xl:gap-y-[10px]">
          {points.map((point) => (
            <div key={point.id} className="flex flex-col border-[0.5px] border-sand p-[30px]">
              <span className="flex h-[33px] w-[33px] items-center justify-center bg-ink font-display text-label font-bold text-cream">{point.id}</span>
              <p className="mt-5 font-display text-h3 font-medium">
                <RichText text={point.heading} />
              </p>
              <div aria-hidden="true" className="-mx-[30px] mt-[30px] h-0 w-[calc(100%+60px)] border-t-[0.5px] border-sand" />
              <ul className="mt-5 flex flex-col gap-2 pl-5 font-sans text-body">
                {point.items.map((item, i) => (
                  <li key={i} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <ExpertAdviceSection {...homeContent.expertAdvice} />
      <TestimonialsSection eyebrow={homeContent.testimonials.eyebrow} heading={homeContent.testimonials.heading} items={homeContent.testimonials.items.slice(0, 2)} />
    </>
  );
}
