import Link from "next/link";
import { Image } from "@/components/ui/Image";
import type { ImageAsset } from "@/types/content";

/**
 * Expert Advice Hub grid card (Figma 1255:532 etc): a 0.5px-bordered box, photo on top with a terracotta wash +
 * "View advice" button revealed on hover/focus (same pattern as ListCard's "View list"), name below. Figma
 * draws the hover state open on the first card as a documentation example - every card gets it, not just that one.
 *
 * Height is intentionally NOT fixed here: `h-full` plus the grid's default `align-items: stretch` makes every
 * card match the tallest one in its own row (so a 2-line name doesn't stagger that row), without padding every
 * other row out to a worst-case height it doesn't need - a 1-line name only grows to match a 2-line sibling
 * when one is actually next to it.
 */
export function AdviceTile({ name, image, href }: { name: string; image: ImageAsset; href: string }) {
  return (
    <Link href={href} className="group flex h-full flex-col border-[0.5px] border-sand">
      <div className="relative h-[251px] w-full shrink-0 overflow-hidden">
        <Image src={image.src} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-start justify-center bg-terracotta/40 pt-[106px] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <span className="inline-flex h-10 w-[144px] items-center justify-center bg-terracotta font-display text-label font-medium text-cream">
            View advice
          </span>
        </span>
      </div>
      <div className="flex flex-1 items-start px-5 pb-5 pt-5">
        <p className="line-clamp-2 font-display text-h3 font-medium leading-[34px] text-ink">{name}</p>
      </div>
    </Link>
  );
}
