import Link from "next/link";
import { IconChevronRight, IconPencil } from "@/components/icons";
import { Container, Divider } from "@/components/ui";
import { cn } from "@/lib/cn";

type BackLink = { label: string; href: string };

/**
 * Back button + label shared by every app hero (916:4869 / 921:6907): 49x49 terracotta square with a 9x16 cream
 * chevron pointing left, label P22 500 16/22 20px to its right.
 */
export function BackButton({ label, href }: BackLink) {
  return (
    <Link href={href} className="inline-flex items-center gap-5 font-display text-label-md font-medium text-ink hover:opacity-80">
      <span aria-hidden="true" className="flex size-[49px] items-center justify-center bg-terracotta text-cream">
        <IconChevronRight className="h-4 w-auto -scale-x-100" />
      </span>
      {label}
    </Link>
  );
}

/**
 * Index hero (list / registry pages, 1440x94 at y=130): back button left, H1 P22 400 48/60 right-aligned,
 * full-width hairline underneath.
 */
export function IndexHero({ back, title }: { back: BackLink; title: string }) {
  return (
    <div className="pt-[50px]">
      <Container className="flex min-h-[94px] flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <BackButton {...back} />
        <h1 className="text-[36px] leading-[44px] md:text-right xl:text-display">{title}</h1>
      </Container>
      <Divider />
    </div>
  );
}

/**
 * Detail hero (registry / list pages, 610x191 at (30,130)): back button, eyebrow Noto 600 16/22 UPPER at y=80
 * with a 30x30 pencil beside it (edit affordance), H1 at y=108, "Edited …" Noto 15/22 at y=170.
 */
export function DetailHero({
  back,
  eyebrow,
  title,
  meta,
  onEditHref,
  className,
}: {
  back: BackLink;
  eyebrow: string;
  title: string;
  meta?: string;
  onEditHref?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[610px]", className)}>
      <BackButton {...back} />
      <div className="mt-[31px] flex items-center gap-[10px]">
        <p className="font-sans text-eyebrow-xs font-semibold uppercase">{eyebrow}</p>
        {onEditHref && (
          <Link href={onEditHref} aria-label={`Edit ${eyebrow.toLowerCase()}`} className="text-ink hover:opacity-70">
            <IconPencil className="size-[30px]" />
          </Link>
        )}
      </div>
      <h1 className="mt-[6px] text-[36px] leading-[44px] xl:text-display">{title}</h1>
      {meta && <p className="mt-[2px] font-sans text-body">{meta}</p>}
    </div>
  );
}
