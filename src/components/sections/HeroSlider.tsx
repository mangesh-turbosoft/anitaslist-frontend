import { Image } from "@/components/ui/Image";
import { Carousel, CarouselDots, CarouselSlide, CarouselTrack } from "@/components/carousel/Carousel";
import { Button, Container, Rating, RichText } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { HeroContent } from "@/types/content";

/**
 * Marketing hero, full viewport width (banners rule); Figma comp is 1440x649 but the image height is fixed at
 * 700px on desktop (product request, not in Figma) - the rating's bottom anchor keeps it clear of the CTA either way.
 * Measured on Home (887:89), About (974:9256) and Sample list heroes - all share one geometry:
 *   eyebrow Noto 600 16/22 UPPER at y=109 · H1 P22 400 48/60 at y=141 (563 wide) · body Noto 15/22 at y=409 (447 wide)
 *   · CTA 40px at y=479 · rating block at y=550 · 14x15 dots at y≈605, right-aligned to the container.
 * Sample list adds a 1060px cream -> transparent scrim from the left edge. Home and About paginate (4 dots) and
 * autoplay/loop (product request, not in Figma) - manual arrows aren't part of this layout so pausing needs
 * hover/focus rather than a visible control.
 */
export function HeroSlider({ slides, eyebrow, cta, rating, scrim = false }: HeroContent) {
  return (
    <Carousel label="Introduction" className="relative" loop autoplayMs={6000}>
      <CarouselTrack>
        {slides.map((slide, i) => (
          <CarouselSlide key={slide.id} className="relative w-full" aria-label={`${i + 1} of ${slides.length}`}>
            <div className="relative min-h-[560px] w-full xl:h-[700px] xl:min-h-0">
              <Image src={slide.image.src} alt={slide.image.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
              {scrim && (
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[1060px] max-w-full bg-gradient-to-r from-cream to-cream/0" />
              )}
              <Container className={cn("absolute inset-0 flex flex-col pb-[100px]", eyebrow ? "pt-14 xl:pt-[109px]" : "pt-16 xl:pt-[141px]")}>
                {eyebrow && <p className="mb-[10px] font-sans text-eyebrow-xs font-semibold uppercase">{eyebrow}</p>}
                {i === 0 ? (
                  <h1 className="max-w-[563px] text-[36px] leading-[44px] xl:text-display">
                    <RichText text={slide.heading} />
                  </h1>
                ) : (
                  <p className="max-w-[563px] text-[36px] leading-[44px] xl:text-display">
                    <RichText text={slide.heading} />
                  </p>
                )}
                <p className="mt-7 max-w-[447px] text-body">{slide.body}</p>
                {cta && (
                  <Button href={cta.href} className="mt-[10px] self-start px-0" style={{ width: cta.width ?? undefined }}>
                    {cta.label}
                  </Button>
                )}
                {rating && <Rating {...rating} className="mt-8 xl:absolute xl:bottom-[38px] xl:mt-0" />}
              </Container>
            </div>
          </CarouselSlide>
        ))}
      </CarouselTrack>
      <Container className="pointer-events-none absolute inset-x-0 bottom-[29px] flex justify-end">
        <CarouselDots tone="light" className="pointer-events-auto" />
      </Container>
    </Carousel>
  );
}
