import { Image } from "@/components/ui/Image";
import { Button, Container, RichText } from "@/components/ui";

const heroImage = { src: "/images/advice-pushchairs-800x533.webp", width: 800, height: 533 };

/** Lorem-ipsum in the design itself (Figma 1260:233 etc, repeated identically across all 6 points). */
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
 * Pushchair advice sub-page, pixel-matched to Figma 1260:2 ("Pushchair advise hub layout (Not AI)") - the one
 * per-topic advice page the client actually designed, linked from the Expert Advice hub's "Pushchairs" card.
 * Hero heading/body/points are lorem-ipsum placeholders in the design itself, kept as drawn (same convention as
 * the hub and the homepage fixture); the eyebrow trail and the "Browse pushchair products" destination are real.
 */
export function PushchairAdvicePage() {
  return (
    <>
      <section className="relative h-[420px] w-full overflow-hidden xl:h-[520px]">
        <Image src={heroImage.src} alt="" fill priority sizes="100vw" className="object-cover" />
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[1060px] max-w-full bg-gradient-to-r from-cream to-cream/0" />
        <Container className="absolute inset-0 flex flex-col justify-center gap-[10px] pb-16 xl:justify-start xl:pt-[109px]">
          <p className="font-sans text-eyebrow-xs font-semibold uppercase">Expert advice | Transport | Pushchair advice</p>
          <h1 className="max-w-[563px] font-display text-h2 xl:text-display">
            <RichText text="Lorem ipsum dolor sit amet, consectetur <em>do eiusmod tempor.</em>" />
          </h1>
          <p className="max-w-[447px] font-sans text-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
          </p>
        </Container>
        {/* Figma 1260:197: 340px box, top=154 vs. hero top=80 -> 74px from the hero's own top, right-aligned
            flush with the container's right edge (its 680px width exactly fills 730..1410 at 1440 wide). No
            real video has been supplied yet, so this plays a dummy clip behind native controls (which already
            draw their own play button and scrubber, replacing Figma's static mock-up of both). Hosted locally
            (public/videos) rather than linked to an external sample-video host, which isn't guaranteed to stay
            up - one such host was already dead (403) when this was first wired up. */}
        <Container className="absolute inset-0 hidden xl:block">
          <video controls preload="none" poster={heroImage.src} className="relative top-[74px] ml-auto block h-[340px] w-[680px] bg-sand object-cover">
            <source src="/videos/pushchair-advice-dummy.mp4" type="video/mp4" />
          </video>
        </Container>
      </section>

      {/* Figma: heading+CTA row (1260:282, top=651) starts 51px below the hero; divider (1260:276, top=776)
          follows 37px after the row's own 88px-tall heading, and the grid (top=776) sits flush under it. */}
      <Container className="flex flex-col gap-6 pt-10 xl:flex-row xl:items-center xl:justify-between xl:gap-10 xl:pt-[51px]">
        <p className="max-w-[678px] font-display text-h2">
          <RichText text="Lorem ipsum dolor sit amet consectetur. Bibendum odiosit amet aliquam sit ultrices<em>.</em>" />
        </p>
        <Button href="/products/transport/pushchairs" className="w-full self-start xl:w-[330px]">
          Browse pushchair products
        </Button>
      </Container>

      {/* Figma 1260:276 is left-0, w-1440px - full viewport bleed, not just the 1380px content column - so
          this sits outside Container instead of using its own (padded) w-full. */}
      <div aria-hidden="true" className="mt-10 h-px w-full bg-sand xl:mt-[37px]" />

      <Container className="pb-16 xl:pb-20">
        {/* Card columns are 447px with a 20px gutter (gap-x-5); rows sit only 10px apart, not the default gap-y.
            Figma draws the divider above and each card's own top border at the exact same y - overlapping
            perfectly into one line. A plain 0-margin flow instead sits the two hairlines edge-to-edge, which
            reads as a doubled/thicker line, so the grid is pulled up by the divider's own rendered 1px to make
            them coincide exactly, matching Figma's overlap rather than stacking under it. */}
        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 xl:-mt-px xl:grid-cols-3 xl:gap-y-[10px]">
          {points.map((point) => (
            <div key={point.id} className="flex flex-col border-[0.5px] border-sand p-[30px]">
              <span className="flex h-[33px] w-[33px] items-center justify-center bg-ink font-display text-label font-bold text-cream">{point.id}</span>
              {/* Figma: badge bottom to heading top = 20px; heading (59px, 2 lines) to divider = 30px; divider to list = 20px. */}
              <p className="mt-5 font-display text-h3 font-medium">
                <RichText text={point.heading} />
              </p>
              {/* Figma: the divider spans the card's full 447px width (edge to edge), not just the 30px-padded
                  content column the badge/heading/list sit in. Divider itself is `w-full` (100% of this padded
                  box), so a plain negative margin would shift it without regaining that 60px - sizing it via
                  calc() bleeds it through the padding on both sides to reach the card's actual border edges. */}
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
    </>
  );
}
