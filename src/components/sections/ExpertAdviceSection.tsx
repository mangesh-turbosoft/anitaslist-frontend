import { Image } from "@/components/ui/Image";
import { Button, Divider, Eyebrow, Rating, RichText } from "@/components/ui";
import type { HomeContent } from "@/types/content";

/**
 * Figma (950:9083): 1440x640. Photo 710x640 flush left; content column from x=730 (680 wide):
 * eyebrow y=76, H2 y=123, body y=322 (563 wide), button 187x40 y=423,
 * Trustpilot block y=530: five 26x26 #26A372 squares (8px apart) with white stars, "4.9/5.0" Noto 700 22 at x=912,
 * caption Noto 500 15/22 below. Full-width hairline at the bottom.
 */
export function ExpertAdviceSection({ eyebrow, heading, body, cta, image, rating }: HomeContent["expertAdvice"]) {
  return (
    <section aria-labelledby="expert-advice-heading">
      <div className="mx-auto grid max-w-page grid-cols-1 xl:grid-cols-[710px_1fr]">
        <div className="relative aspect-[710/640] w-full">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1280px) 710px, 100vw" className="object-cover" />
        </div>
        <div className="px-4 pb-12 pt-10 md:px-[30px] xl:pb-[49px] xl:pl-5 xl:pr-[30px] xl:pt-[76px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="expert-advice-heading" className="mt-[1px] max-w-[680px] text-h2">
            <RichText text={heading} />
          </h2>
          <p className="mt-[23px] max-w-[563px] text-body">{body}</p>
          <Button href={cta.href} className="mt-[41px] w-[187px] px-0">
            {cta.label}
          </Button>
          <Rating {...rating} className="mt-[67px]" />
        </div>
      </div>
      <Divider />
    </section>
  );
}
