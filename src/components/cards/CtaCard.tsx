import Link from "next/link";
import { IconHeart, IconPlus } from "@/components/icons";
import { cn } from "@/lib/cn";
import type { CtaCard as CtaCardData } from "@/types/content";

/**
 * Homepage CTA card. Figma (887:113 / 887:114): 330x100.
 * list:   card #D89A94, 50x50 tile #C77065 at (20,25), 32x32 cream plus.
 * advice: card #C77065, 50x50 tile #CEBFA7 at (20,22), 32x32 cream heart.
 * Label P22 500 24/52 cream from x=90.
 */
export function CtaCard({ label, href, icon, variant }: CtaCardData) {
  const Icon = icon === "heart" ? IconHeart : IconPlus;
  return (
    <Link
      href={href}
      className={cn(
        "flex h-[100px] w-full max-w-[330px] items-center gap-5 pl-5 pr-4 text-cream transition-opacity hover:opacity-90",
        variant === "list" ? "bg-blush" : "bg-terracotta",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-[50px] shrink-0 items-center justify-center",
          variant === "list" ? "bg-terracotta" : "bg-sand",
        )}
      >
        <Icon className="size-8" />
      </span>
      <span className="font-display text-h3-tall font-medium">{label}</span>
    </Link>
  );
}
