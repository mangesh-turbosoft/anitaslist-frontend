import { IconStar } from "@/components/icons";
import { cn } from "@/lib/cn";
import type { Rating as RatingData } from "@/types/content";

/**
 * Trustpilot-style rating block. Figma ("Trust pilot", 330x61): five 26x26 #26A372 squares 8px apart with
 * white stars, "4.9/5.0" Noto 700 22/22 to the right (20px gap), caption Noto 500 15/22 below (11px gap).
 * Used in the homepage expert-advice section and the About hero. Link target NEEDS CONFIRMATION (plan 4).
 */
export function Rating({ score, outOf, caption, className }: RatingData & { className?: string }) {
  return (
    <div className={cn("w-[330px] max-w-full", className)}>
      <div className="flex items-center gap-5">
        <ul className="flex gap-2" aria-label={`Rated ${score} out of ${outOf}`}>
          {Array.from({ length: 5 }, (_, i) => (
            <li key={i} className="flex size-[26px] items-center justify-center bg-green text-white">
              <IconStar className="h-4 w-auto" />
            </li>
          ))}
        </ul>
        <p className="font-sans text-[22px] font-bold leading-[22px]">
          {score}/{outOf}
        </p>
      </div>
      <p className="mt-[11px] font-sans text-body font-medium">{caption}</p>
    </div>
  );
}
