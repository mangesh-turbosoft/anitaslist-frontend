import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

/** Full-width 300px photo band (Figma "edit 7 4", 1440x300). Edge to edge per the approved banners rule. */
export function Banner({ image, className }: { image: ImageAsset; className?: string }) {
  return (
    <div className={cn("relative h-[200px] w-full md:h-[300px]", className)}>
      <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
    </div>
  );
}
