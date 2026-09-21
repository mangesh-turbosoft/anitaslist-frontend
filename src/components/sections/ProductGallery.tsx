"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

/**
 * Product gallery (Figma 196:5949): 796x630 main photo, 7 thumbnails below (6px gaps). The thumbnail row is a
 * grid of equal fractional columns spanning the full width, so its left/right edges always line up with the
 * main photo's regardless of viewport - fixed-width thumbnails would fall short of that on anything but the
 * exact Figma comp width. Every slot is a plain placeholder box for now (Figma draws no real photography).
 */
export function ProductGallery({ images, name }: { images: (ImageAsset | null)[]; name: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? null;

  return (
    <div>
      <div className="relative flex h-[400px] w-full items-center justify-center bg-sand md:h-[630px]">
        {main ? (
          <Image src={main.src} alt={main.alt || name} fill sizes="(min-width: 1280px) 796px, 100vw" className="object-cover" />
        ) : (
          <span className="font-display text-label font-medium" aria-hidden="true">
            Product image
          </span>
        )}
      </div>
      {images.length > 1 && (
        <ul className="mt-4 grid gap-[6px]" style={{ gridTemplateColumns: `repeat(${images.length}, 1fr)` }}>
          {images.map((img, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === active}
                className={cn(
                  "relative flex aspect-square w-full items-center justify-center overflow-hidden border bg-sand",
                  i === active ? "border-terracotta" : "border-transparent",
                )}
              >
                {img && <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
