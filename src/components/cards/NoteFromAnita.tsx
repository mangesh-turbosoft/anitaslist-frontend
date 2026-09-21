import { Image } from "@/components/ui/Image";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

/**
 * "Note from Anita" — quote variant. Figma (1011:11733 on the Sample list page): 453x197, photo 213x197 at the
 * left edge (the box sits flush to the frame edge, outside the 30px margin), quote Noto 15/22 in a 221px column
 * starting 19px after the photo with 30px vertical padding. Wrapped in <figure> so the quote is announced as such.
 */
export function NoteFromAnita({ image, quote, className }: { image: ImageAsset; quote: string; className?: string }) {
  return (
    <figure className={cn("flex h-[197px] w-full max-w-[453px]", className)}>
      <div className="relative h-full w-[213px] shrink-0">
        <Image src={image.src} alt={image.alt} fill sizes="213px" className="object-cover" />
      </div>
      <blockquote className="ml-[19px] flex w-[221px] items-start py-[30px]">
        <p className="font-sans text-body">{quote}</p>
      </blockquote>
      <figcaption className="sr-only">Note from Anita</figcaption>
    </figure>
  );
}
