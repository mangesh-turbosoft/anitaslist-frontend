import { Image } from "@/components/ui/Image";
import Link from "next/link";
import { ProgressBar } from "@/components/ui";
import { cn } from "@/lib/cn";
import { formatDate, formatGBP } from "@/lib/format";
import type { ImageAsset } from "@/types/content";

type Props = {
  href: string;
  name: string;
  coverImage: ImageAsset | null;
  totalPence: number;
  editedAt: string;
  progress: number | null;
  kind: "list" | "registry";
  /** Rendered top-right of the title (the three-dot menu). */
  menu?: React.ReactNode;
  className?: string;
};

/**
 * List card (900:2308, 330x463) and registry card (921:6667 "List", 330x430).
 * 0.5px sand border; 330x251 cover; hover/focus = terracotta @40% wash + centred 144x40 "View list" button (drawn
 * in Figma); title P22 500 24/34 at y=271; "Total: £…" P22 500 16/22 at y=350; "Edited …" Noto 15/22 at y=389;
 * list variant adds a 292x15 progress bar (gold on bone) at y=418. Registry variant shows a 10px sage strip across
 * the bottom of the cover when complete. Three-dot pill sits at (279,280).
 */
export function ListCard({ href, name, coverImage, totalPence, editedAt, progress, kind, menu, className }: Props) {
  const viewLabel = kind === "list" ? "View list" : "View registry";
  return (
    <article className={cn("group relative flex w-full max-w-[330px] flex-col border-[0.5px] border-sand bg-bone", kind === "list" ? "h-[463px]" : "h-[430px]", className)}>
      <Link href={href} className="relative block h-[251px] w-full overflow-hidden bg-sand focus-visible:outline-none">
        {coverImage && <Image src={coverImage.src} alt="" fill sizes="330px" className="object-cover" />}
        {kind === "registry" && progress === 1 && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[10px] bg-sage" />}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-start justify-center bg-terracotta/40 pt-[106px] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <span className="inline-flex h-10 w-[144px] items-center justify-center bg-terracotta font-display text-label font-medium text-cream">{viewLabel}</span>
        </span>
        <span className="sr-only">{viewLabel}</span>
      </Link>

      <div className="relative flex flex-1 flex-col px-5 pb-[30px] pt-5">
        <h3 className="max-w-[263px] font-display text-h3 font-medium">
          <Link href={href} className="hover:underline focus-visible:underline">
            {name}
          </Link>
        </h3>
        {menu && <div className="absolute right-[14px] top-[9px]">{menu}</div>}
        <p className="mt-[11px] font-display text-label-md font-medium">Total: {formatGBP(totalPence)}</p>
        <p className="mt-[17px] font-sans text-body">Edited {formatDate(editedAt)}</p>
        {kind === "list" && progress !== null && <ProgressBar value={Math.round(progress * 100)} label={`${name} progress`} className="mt-[7px] max-w-[292px]" />}
      </div>
    </article>
  );
}
