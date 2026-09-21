import { Image } from "@/components/ui/Image";
import { Button, Container, Divider, Eyebrow, RichText } from "@/components/ui";
import type { AboutContent } from "@/types/content";

/**
 * About "Anita's Village" (886:6 @ y=1748): photo full viewport width (banners rule - matches the Hero/Sample
 * list treatment), 504px tall at the comp width. Content overlay: eyebrow at (732,69) relative to the photo,
 * H2 (678 wide) at y=116, body (563 wide) at y=277, button 187x40 at y=378, and a 212x141 thumbnail bottom-right.
 * Full-width hairline 50px below the photo.
 */
export function VillageBannerSection({ eyebrow, heading, body, cta, image, thumb }: AboutContent["village"]) {
  return (
    <section aria-labelledby="village-heading" className="pt-[50px]">
      <div className="relative min-h-[420px] w-full xl:h-[504px]">
        <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
        <span
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-[927px] max-w-full xl:block"
          style={{ background: "linear-gradient(to right, rgb(248 248 242 / 0) 25%, rgb(248 248 242 / 1) 100%)" }}
        />
        <Container className="relative h-full">
          <div className="relative bg-cream/80 px-4 py-10 md:px-[30px] xl:ml-[702px] xl:max-w-[678px] xl:bg-transparent xl:px-0 xl:pt-[69px] xl:pb-0">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="village-heading" className="mt-[1px] text-h2">
              <RichText text={heading} />
            </h2>
            <p className="mt-[29px] max-w-[563px] text-body">{body}</p>
            <Button href={cta.href} className="mt-[41px] px-0" style={{ width: cta.width }}>
              {cta.label}
            </Button>
          </div>
          {thumb && (
            <div className="absolute bottom-3 right-4 hidden h-[141px] w-[212px] md:right-[30px] xl:block">
              <Image src={thumb.src} alt={thumb.alt} fill sizes="212px" className="object-cover" />
            </div>
          )}
        </Container>
      </div>
      <Divider className="mt-[50px]" />
    </section>
  );
}
