import { Image } from "@/components/ui/Image";
import { Container, Divider, Eyebrow } from "@/components/ui";
import type { HomeContent } from "@/types/content";

/** Figma draws exactly 4 logos in a static row; beyond that they'd overflow/crowd, so it becomes a marquee. */
const MAX_STATIC = 4;
/** Roughly constant scroll speed regardless of how many logos there are, rather than a fixed loop duration. */
const SECONDS_PER_LOGO = 4;

function BrandLogo({ brand }: { brand: HomeContent["partners"]["items"][number] }) {
  const mark = brand.logo ? (
    <Image src={brand.logo.src} alt={brand.name} width={brand.logo.width} height={brand.logo.height} className="h-auto" style={{ width: brand.logo.width }} />
  ) : (
    // No downloadable logo file for this vendor yet - a plain logotype reads as "part of the row" without
    // inventing a mark that isn't theirs. `leading-none` keeps the line box close to the glyphs' own height
    // (all-caps, no descenders) so it optically centres against the image logos instead of sitting high in
    // a taller default line-height.
    <span className="block whitespace-nowrap font-display text-h3 font-bold uppercase leading-none tracking-wide text-ink" style={brand.color ? { color: brand.color } : undefined}>
      {brand.name}
    </span>
  );
  return brand.href ? (
    <a href={brand.href} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
      {mark}
    </a>
  ) : (
    mark
  );
}

/**
 * Figma (974:9245): 1440x146. Eyebrow in a 446-wide left column with a vertical hairline at its right edge (x=476);
 * logos from x=530, spaced across to x=1390 at their native placed sizes. Hairline at the bottom.
 * Only drawn with 4 logos - past that, a static row would overflow or crowd, so it becomes a continuous
 * marquee instead: the item list rendered twice, translated exactly -50% in a loop so the seam is invisible.
 * Pauses on hover/focus so a logo can actually be read or clicked, and sits still under prefers-reduced-motion
 * (handled globally, not here - see globals.css).
 */
export function BrandPartnersSection({ eyebrow, items }: HomeContent["partners"]) {
  if (items.length <= MAX_STATIC) {
    return (
      <section aria-label={eyebrow}>
        <Container className="flex flex-col xl:h-[146px] xl:flex-row xl:items-stretch">
          <div className="flex items-center pt-6 xl:w-[446px] xl:border-r-[0.5px] xl:border-sand xl:pt-0">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <ul className="flex flex-wrap items-center gap-x-12 gap-y-6 py-8 xl:ml-[54px] xl:w-[860px] xl:flex-nowrap xl:justify-between xl:py-0">
            {items.map((brand) => (
              <li key={brand.id} className="flex items-center">
                <BrandLogo brand={brand} />
              </li>
            ))}
          </ul>
        </Container>
        <Divider />
      </section>
    );
  }

  return (
    <section aria-label={eyebrow}>
      <Container className="flex flex-col xl:h-[146px] xl:flex-row xl:items-stretch">
        <div className="flex items-center pt-6 xl:w-[446px] xl:border-r-[0.5px] xl:border-sand xl:pt-0">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <div
          className="flex min-w-0 items-center overflow-hidden py-8 xl:ml-[54px] xl:flex-1 xl:py-0"
          style={{ maskImage: "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)" }}
        >
          <div className="flex w-max animate-marquee items-center gap-x-12" style={{ animationDuration: `${items.length * SECONDS_PER_LOGO}s` }}>
            {[...items, ...items].map((brand, i) => (
              <div key={`${brand.id}-${i}`} className="flex shrink-0 items-center">
                <BrandLogo brand={brand} />
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Divider />
    </section>
  );
}
