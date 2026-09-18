import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselArrows, CarouselNumbers, CarouselSlide, CarouselTrack } from "@/components/carousel/Carousel";
import { IconChevronRight } from "@/components/icons";
import { Container, Divider, Eyebrow } from "@/components/ui";
import type { HomeContent } from "@/types/content";

/**
 * Figma (974:9171): 1440x666. Heading row: eyebrow left, "1 2 3 4" + arrows right, all centred in the 46px row.
 * Cards 476x585 with a 6px gap start at y=80 and run edge to edge (3 x 476 + 2 x 6 = 1440); full-bleed per the
 * banners rule. Each card: cropped photo, a bone->cream fade over the lower 418px, category name P22 400 32/44
 * at (30, bottom 20), and a 33x33 #C77065 chevron button flush to the bottom-right corner. Hairline below.
 */
export function ProductCategoriesSection({ eyebrow, items }: HomeContent["categories"]) {
  return (
    <section aria-label={eyebrow} className="pt-10">
      <Carousel label={eyebrow}>
        <Container className="flex items-center justify-between gap-6">
          <Eyebrow className="max-w-[1028px]">{eyebrow}</Eyebrow>
          <div className="flex items-center gap-[21px]">
            <CarouselNumbers />
            <CarouselArrows />
          </div>
        </Container>
        <CarouselTrack className="mt-[34px] gap-[6px]">
          {items.map((cat, i) => (
            <CarouselSlide key={cat.id} aria-label={`${i + 1} of ${items.length}`} className="w-[80vw] max-w-[476px] xl:w-[476px]">
              <Link href={`/products/${cat.slug}`} className="group relative block aspect-[476/585] w-full overflow-hidden">
                <Image
                  src={cat.image.src}
                  alt={cat.image.alt}
                  fill
                  sizes="(min-width: 1280px) 476px, 80vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {/* Figma gradient: bottom = #E6E4D8 @90%, top = #F8F8F2 @0% */}
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[418px] bg-gradient-to-t from-bone/90 to-cream/0" />
                <span className="absolute bottom-5 left-[30px] max-w-[330px] font-display text-h2 text-ink">{cat.name}</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 flex size-[33px] items-center justify-center bg-terracotta text-cream"
                >
                  <IconChevronRight className="h-4 w-auto" />
                </span>
              </Link>
            </CarouselSlide>
          ))}
        </CarouselTrack>
      </Carousel>
      <Divider />
    </section>
  );
}
