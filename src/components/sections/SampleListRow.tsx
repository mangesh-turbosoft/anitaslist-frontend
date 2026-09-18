import { Carousel, CarouselArrows, CarouselSlide, CarouselTrack } from "@/components/carousel/Carousel";
import { NoteFromAnita } from "@/components/cards/NoteFromAnita";
import { SampleListCard } from "@/components/cards/SampleListCard";
import { Container, Divider, Eyebrow, RichText } from "@/components/ui";
import type { SampleListRow as SampleListRowData } from "@/types/content";

/**
 * One "sample list type" row on the Sample list page (886:7). Row = 630px between full-width hairlines:
 * left column 477 wide with a vertical hairline at its right edge; eyebrow at y=50, H2 at y=97 (446 wide),
 * a 477px hairline at y=431 and the Note from Anita box (453x197) below it, flush to the frame edge.
 * Right column: arrows top-right aligned with the eyebrow row, two 446x484 cards (20px gap) from y=97.
 */
export function SampleListRow({ id, eyebrow, heading, note, items }: SampleListRowData) {
  const headingId = `${id}-heading`;
  return (
    <section aria-labelledby={headingId}>
      <Carousel label={eyebrow} loop>
        <Container className="grid grid-cols-1 xl:grid-cols-[447px_minmax(0,1fr)]">
          <div className="flex flex-col pt-[50px] xl:border-r-[0.5px] xl:border-sand">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id={headingId} className="mt-[1px] max-w-[446px] text-h2">
              <RichText text={heading} />
            </h2>
            <div className="mt-8 xl:mt-auto xl:-ml-[30px] xl:w-[477px]">
              <Divider className="hidden xl:block" />
              <NoteFromAnita {...note} />
            </div>
          </div>
          <div className="flex min-w-0 flex-col pt-4 xl:pl-5 xl:pt-[50px]">
            <div className="flex h-[46px] items-center justify-end">
              <CarouselArrows />
            </div>
            <CarouselTrack className="mt-[1px] gap-5 pb-[50px]">
              {items.map((item, i) => (
                <CarouselSlide key={item.id} aria-label={`${i + 1} of ${items.length}`} className="w-[85vw] max-w-[446px] xl:w-[446px]">
                  <SampleListCard {...item} />
                </CarouselSlide>
              ))}
            </CarouselTrack>
          </div>
        </Container>
      </Carousel>
      <Divider />
    </section>
  );
}
