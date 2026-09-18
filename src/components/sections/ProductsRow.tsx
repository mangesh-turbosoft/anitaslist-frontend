import { Carousel, CarouselArrows, CarouselSlide, CarouselTrack } from "@/components/carousel/Carousel";
import { ProductCard } from "@/components/cards/ProductCard";
import { Container } from "@/components/ui";
import type { ProductsRow as ProductsRowData } from "@/types/content";

/**
 * "Products" block (Sample list sub page, 1380x510): H2 P22 400 32/44 at the left, arrows right (centred in the 44px row),
 * four 330x449 cards at 20px gaps from y=61. Track gets 5px of top slack so the hover lift is not clipped.
 */
export function ProductsRow({ id, heading, items }: ProductsRowData) {
  const headingId = `${id}-heading`;
  return (
    <section aria-labelledby={headingId}>
      <Carousel label={heading}>
        <Container>
          <div className="flex h-11 items-center justify-between">
            <h2 id={headingId} className="text-h2">
              {heading}
            </h2>
            <CarouselArrows />
          </div>
          <CarouselTrack className="-mt-[5px] gap-5 pt-[22px]">
            {items.map((p, i) => (
              <CarouselSlide key={p.id} aria-label={`${i + 1} of ${items.length}`} className="w-[330px]">
                <ProductCard {...p} />
              </CarouselSlide>
            ))}
          </CarouselTrack>
        </Container>
      </Carousel>
    </section>
  );
}
