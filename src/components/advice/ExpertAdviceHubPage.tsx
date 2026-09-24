import { AdviceTile } from "@/components/cards/AdviceTile";
import { NoteSlider } from "@/components/cards/NoteSlider";
import { Image } from "@/components/ui/Image";
import { Container, RichText, Select } from "@/components/ui";
import type { AdviceTopic } from "@/data/expert-advice";

const heroImage = { src: "/images/advice-hub-hero-baby-2880x1040.webp", width: 2880, height: 1040 };
const notePortrait = { src: "/images/advice-note-portrait-2000x2667.webp", width: 2000, height: 2667, alt: "Anita" };

/** The single drawn quote, repeated so the 4 dots Figma paginates have something to page through. */
const notes = [1, 2, 3, 4].map((n) => ({
  id: `advice-note-${n}`,
  image: notePortrait,
  text: "“Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis. Vestibulum egestas pellentesque lacus tincidunt.”",
  video: null,
}));

/**
 * Expert Advice hub, pixel-matched to Figma 1252:2 ("Expert Advice hub (Not AI)"). The hero heading, intro line
 * and quote are all lorem-ipsum placeholders in the design itself (client hasn't authored this copy yet) - kept
 * as drawn rather than invented, same convention as the homepage fixture. The filter only offers "Transport"
 * because that's the only category the design gives subcategories for; the grid cards and their real names/
 * photography come from the design too.
 */
export function ExpertAdviceHubPage({ topics }: { topics: AdviceTopic[] }) {
  return (
    <>
      <section className="relative h-[420px] w-full overflow-hidden xl:h-[520px]">
        <Image src={heroImage.src} alt="" fill priority sizes="100vw" className="object-cover" />
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[1060px] max-w-full bg-gradient-to-r from-cream to-cream/0" />
        <Container className="absolute inset-0 flex flex-col justify-center gap-[10px] pb-16 xl:justify-start xl:pt-[109px]">
          <p className="font-sans text-eyebrow-xs font-semibold uppercase">Expert advice</p>
          <h1 className="max-w-[563px] font-display text-h2 xl:text-display">
            <RichText text="Lorem ipsum dolor sit amet, consectetur <em>do eiusmod tempor.</em>" />
          </h1>
          <p className="max-w-[447px] font-sans text-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
          </p>
        </Container>
      </section>

      <Container>
        {/* Figma 1255:442: 100px box, top=547 vs. hero bottom=600 -> pulled up 53px to overlap the hero. */}
        <div className="relative z-10 -mt-[53px] flex h-[100px] w-full max-w-[563px] flex-col justify-center gap-3 bg-terracotta px-[30px] xl:flex-row xl:items-center xl:gap-6">
          <p className="text-[24px] leading-[32px] font-display text-cream xl:leading-[52px]">Filter advise by</p>
          <Select
            label="Filter advice by category"
            options={[{ value: "transport", label: "Transport" }]}
            defaultValue="transport"
            className="w-[260px]"
            fieldClassName="h-10 w-full border border-r-0 border-sand bg-cream pl-[10px] font-display text-label font-medium text-ink"
            chevronClassName="h-10 w-10 border border-sand bg-sand text-ink"
          />
        </div>
      </Container>

      {/* Figma: the quote column (1255:463) starts flush with the hero bottom (top=600, 0 offset) while the
          box above still overlaps it by 47px -> pulled back up by that much; the heading (1255:458, top=672)
          then gets its own 72px top offset from that same baseline. */}
      <Container className="flex flex-col gap-10 pt-10 xl:-mt-[47px] xl:flex-row xl:items-start xl:justify-between xl:gap-10 xl:pt-0">
        <p className="max-w-[678px] font-display text-h2 xl:pt-[72px]">
          <RichText text="Lorem ipsum dolor sit amet consectetur. Bibendum odiosit amet aliquam sit ultrices<em>.</em>" />
        </p>
        <NoteSlider notes={notes} />
      </Container>

      {/* Figma 1255:461 is left-0, w-1440px - full viewport bleed, not just the 1380px content column - so
          this sits outside Container instead of using its own (padded) w-full. Sits ~flush under the quote
          column (which ends at 797); the grid (top=847) is 51px below it. */}
      <div aria-hidden="true" className="mt-10 h-px w-full bg-sand xl:mt-0" />

      <Container className="pb-16 xl:pb-20">
        <ul className="mt-10 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:mt-[51px] xl:grid-cols-4">
          {topics.map((topic) => (
            <li key={topic.id}>
              <AdviceTile name={topic.name} image={topic.image} href={topic.href} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
