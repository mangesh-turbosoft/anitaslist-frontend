import { Image } from "@/components/ui/Image";
import Link from "next/link";
import { Carousel, CarouselDots, CarouselSlide, CarouselTrack } from "@/components/carousel/Carousel";
import { IconPlay } from "@/components/icons";
import type { NoteSlide } from "@/types/content";

/**
 * "Note from Anita" — slider variant (1011:11789, 660x197) used on the sub page, hub, list and registry pages.
 * Photo 213x197 left; text Noto 15/22 in a 423px column from x=232, y=36; "Watch video" P22 500 16/19 with a
 * 30x30 terracotta play square at y=144; four 13x13 dots bottom-right (12px gaps).
 */
export function NoteSlider({ notes, className }: { notes: NoteSlide[]; className?: string }) {
  return (
    <div className="max-w-[660px]">
      <Carousel label="Notes from Anita" className={className ? `relative ${className}` : "relative"} loop>
        <CarouselTrack>
          {notes.map((n, i) => (
            <CarouselSlide key={n.id} aria-label={`${i + 1} of ${notes.length}`} className="flex min-h-[197px] w-full max-w-[660px]">
              {/* No h-full here: at narrow widths the 213px photo can't shrink, so the text column narrows
                  instead and needs more height than the Figma-exact 197px to avoid overflowing the card -
                  the row has min-height only, so it grows with the text, and the photo (no explicit height
                  of its own) stretches to match via the flex row's default align-items:stretch. */}
              <div className="relative w-[213px] shrink-0">
                <Image src={n.image.src} alt={n.image.alt} fill sizes="213px" className="object-cover" />
              </div>
              <div className="ml-[19px] flex min-w-0 flex-1 flex-col pb-[23px] pt-9">
                <p className="max-w-[423px] font-sans text-body">{n.text}</p>
                {n.video && (
                  <Link href={n.video.href} className="mt-auto inline-flex items-center gap-[10px] self-start font-display text-label font-medium text-ink hover:opacity-80">
                    {n.video.label}
                    <span aria-hidden="true" className="flex size-[30px] items-center justify-center bg-terracotta text-cream">
                      <IconPlay className="size-3" />
                    </span>
                  </Link>
                )}
              </div>
            </CarouselSlide>
          ))}
        </CarouselTrack>
        <CarouselDots tone="dark" size="sm" className="absolute bottom-[13px] right-0" />
      </Carousel>
    </div>
  );
}
