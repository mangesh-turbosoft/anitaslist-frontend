import { Image } from "@/components/ui/Image";
import { Button, RichText } from "@/components/ui";
import type { SampleListCard as SampleListCardData } from "@/types/content";

/**
 * Sample list card. Figma (Group 94, 446x484): #CEBFA7 card, 19px inset; image slot 407x206 (#E6E4D8, 1px sand
 * border; Figma shows "Image for list" centred at y=101 when empty); title P22 500 24/34 at y=245 (2 lines);
 * body Noto 15/22 at y=340 (2 lines); "View sample list" 187x40 at y=413.
 */
export function SampleListCard({ slug, title, body, image }: SampleListCardData) {
  return (
    <article className="flex h-full min-h-[484px] w-full max-w-[446px] flex-col bg-sand p-[19px] pb-[31px]">
      <div className="relative flex h-[206px] w-full items-center justify-center border border-sand bg-bone">
        {image ? (
          <Image src={image.src} alt={image.alt} fill sizes="407px" className="object-cover" />
        ) : (
          <span className="font-sans text-body text-ink/50" aria-hidden="true">
            Image for list
          </span>
        )}
      </div>
      <h3 className="mt-5 font-display text-h3 font-medium">
        <RichText text={title} />
      </h3>
      <p className="mt-[7px] font-sans text-body">{body}</p>
      <Button href={`/sample-lists/${slug}`} className="mt-auto w-[187px] px-0 pt-0">
        View sample list
      </Button>
    </article>
  );
}
