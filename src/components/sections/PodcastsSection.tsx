import Link from "next/link";
import { IconNounHeadphones, IconPlay } from "@/components/icons";
import { Container, Eyebrow } from "@/components/ui";
import type { AboutContent } from "@/types/content";

/**
 * About "Podcasts" (886:6 @ y=3407): eyebrow left, "View all podcasts" Noto 15/22 right-aligned at y=12;
 * three cards 447x137 (20px gaps) at y=59: #CEBFA7 with a 0.5px sand border, 97x97 #E6E4D8 square (1px sand border)
 * at (20,20) holding a 52x52 headphones icon, title P22 500 24/34 at (137,26), "by …" Noto 15/22 at y=58,
 * duration Noto 500 15/22 at y=88, 30x30 #C77065 play button at (397,87). What "play" does is unspecified.
 */
export function PodcastsSection({ eyebrow, viewAll, items }: AboutContent["podcasts"]) {
  return (
    <section aria-labelledby="podcasts-heading" className="pt-[50px] pb-[50px]">
      <Container>
        <div className="flex items-center justify-between">
          <Eyebrow id="podcasts-heading">{eyebrow}</Eyebrow>
          <Link href={viewAll.href} className="font-sans text-body hover:underline">
            {viewAll.label}
          </Link>
        </div>
        <ul className="mt-[13px] grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((p) => (
            <li key={p.id}>
              <Link
                href={p.href}
                className="relative flex h-[137px] gap-5 border-[0.5px] border-sand bg-sand p-5 transition-opacity hover:opacity-90"
              >
                <span aria-hidden="true" className="flex size-[97px] shrink-0 items-center justify-center border border-sand bg-bone text-ink">
                  <IconNounHeadphones className="size-[52px]" />
                </span>
                <span className="flex min-w-0 flex-col pt-[6px]">
                  <span className="font-display text-h3 font-medium">{p.title}</span>
                  <span className="mt-[-2px] font-sans text-body">by {p.by}</span>
                  <span className="mt-2 font-sans text-body font-medium">{p.duration}</span>
                </span>
                <span aria-hidden="true" className="absolute bottom-5 right-5 flex size-[30px] items-center justify-center bg-terracotta text-cream">
                  <IconPlay className="size-3" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
