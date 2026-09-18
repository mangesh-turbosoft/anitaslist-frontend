import Image from "next/image";
import { Container, Divider, Eyebrow } from "@/components/ui";
import type { HomeContent } from "@/types/content";

/**
 * Figma (974:9245): 1440x146. Eyebrow in a 446-wide left column with a vertical hairline at its right edge (x=476);
 * logos from x=530, spaced across to x=1390 at their native placed sizes. Hairline at the bottom.
 */
export function BrandPartnersSection({ eyebrow, items }: HomeContent["partners"]) {
  return (
    <section aria-label={eyebrow}>
      <Container className="flex flex-col xl:h-[146px] xl:flex-row xl:items-stretch">
        <div className="flex items-center pt-6 xl:w-[446px] xl:border-r-[0.5px] xl:border-sand xl:pt-0">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-6 py-8 xl:ml-[54px] xl:w-[860px] xl:flex-nowrap xl:justify-between xl:py-0">
          {items.map((brand) => {
            const img = (
              <Image
                src={brand.logo.src}
                alt={brand.name}
                width={brand.logo.width}
                height={brand.logo.height}
                className="h-auto"
                style={{ width: brand.logo.width }}
              />
            );
            return (
              <li key={brand.id} className="flex items-center">
                {brand.href ? (
                  <a href={brand.href} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                    {img}
                  </a>
                ) : (
                  img
                )}
              </li>
            );
          })}
        </ul>
      </Container>
      <Divider />
    </section>
  );
}
