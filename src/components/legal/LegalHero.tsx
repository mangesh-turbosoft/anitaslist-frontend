import { Image } from "@/components/ui/Image";
import { Container } from "@/components/ui";

/**
 * Shared hero for the long-form content pages (FAQ, Privacy, Cookies) - Figma 1263:363 / 1263:726 / 1269:1110,
 * all three identical bar the eyebrow: 350px image with a left-edge cream fade, eyebrow + H1 on top. The big
 * serif line in Figma is the same lorem-ipsum placeholder repeated across all three ("Lorem ipsum dolor sit
 * amet, consectetur do eiusmod tempor."), so the real page title (already shown pre-redesign) fills that slot
 * instead of shipping placeholder copy.
 */
export function LegalHero({ eyebrow, heading, image }: { eyebrow: string; heading: string; image: { src: string; width: number; height: number } }) {
  return (
    <section className="relative h-[220px] w-full overflow-hidden xl:h-[350px]">
      <Image src={image.src} alt="" fill priority sizes="100vw" className="object-cover" />
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[1060px] max-w-full bg-gradient-to-r from-cream to-cream/0" />
      <Container className="absolute inset-0 flex flex-col justify-center gap-[10px] xl:justify-start xl:gap-[11px] xl:pt-[69px]">
        <p className="font-sans text-eyebrow-xs font-semibold uppercase">{eyebrow}</p>
        <h1 className="max-w-[563px] font-display text-h2 xl:text-display">{heading}</h1>
      </Container>
    </section>
  );
}
