import { Image } from "@/components/ui/Image";
import { Carousel, CarouselArrows, CarouselDots, CarouselSlide, CarouselTrack } from "@/components/carousel/Carousel";
import { Container, Divider, Eyebrow, RichText } from "@/components/ui";
import type { HomeContent } from "@/types/content";

/**
 * Figma (950:9160): 1440x369. Left column 447 wide (eyebrow y=50, H2 y=97, dots y=305 left, arrows right at x=360)
 * with a vertical hairline at its right edge; cards start 20px after it: 446x260, cream @30% fill, 0.5px sand border,
 * 30px padding, quote Noto 15/22, 45px sand avatar circle + name/info Noto 500 15/22 at the bottom. Hairline below.
 */
export function TestimonialsSection({ eyebrow, heading, items }: HomeContent["testimonials"]) {
  return (
    <section aria-labelledby="testimonials-heading">
      <Carousel label={eyebrow} loop>
        <Container className="grid grid-cols-1 xl:grid-cols-[447px_minmax(0,1fr)]">
          <div className="flex flex-col pt-[50px] xl:min-h-[368px] xl:border-r-[0.5px] xl:border-sand xl:pr-[21px]">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="testimonials-heading" className="mt-[1px] max-w-[446px] text-h2">
              <RichText text={heading} />
            </h2>
            <div className="mt-8 flex items-center justify-between xl:mt-auto xl:pb-[49px]">
              <CarouselDots tone="dark" />
              <CarouselArrows />
            </div>
          </div>
          <CarouselTrack className="gap-[21px] py-8 xl:pl-5 xl:pt-[59px] xl:pb-[50px]">
            {items.map((t, i) => (
              <CarouselSlide
                key={t.id}
                aria-label={`${i + 1} of ${items.length}`}
                className="flex w-[85vw] max-w-[446px] flex-col border-[0.5px] border-sand bg-cream/30 p-[30px] xl:h-[260px] xl:w-[446px]"
              >
                <blockquote className="flex flex-1 flex-col">
                  <p className="max-w-[356px] text-body">{t.quote}</p>
                  <footer className="mt-auto flex items-center gap-[14px] pt-5">
                    <span className="relative size-[45px] shrink-0 overflow-hidden rounded-full bg-sand">
                      {t.avatar && <Image src={t.avatar.src} alt="" fill sizes="45px" className="object-cover" />}
                    </span>
                    <div className="font-sans text-body font-medium">
                      <cite className="block not-italic">{t.name}</cite>
                      <span className="block">{t.info}</span>
                    </div>
                  </footer>
                </blockquote>
              </CarouselSlide>
            ))}
          </CarouselTrack>
        </Container>
      </Carousel>
      <Divider />
    </section>
  );
}
