import Link from "next/link";
import { IconPlus } from "@/components/icons";
import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Empty state for the list / registry pages (886:14 / 886:19): centred title P22 500 24/34 (680 wide) at y=512,
 * paragraph Noto 15/22 (446 wide) at y=560, optional 52px CTA at y=633. Footer follows 130px below.
 */
export function EmptyState({ title, body, cta, className }: { title: string; body: string; cta?: { label: string; href: string }; className?: string }) {
  return (
    <Container className={cn("flex flex-col items-center pb-[133px] pt-[111px] text-center", className)}>
      <h2 className="max-w-[680px] font-display text-h3 font-medium">{title}</h2>
      <p className="mt-[14px] max-w-[446px] font-sans text-body">{body}</p>
      {cta && <BigCta {...cta} className="mt-[52px]" />}
    </Container>
  );
}

/**
 * The 52px "first action" CTA drawn on empty states ("Call to action list", e.g. 271x52): terracotta bar with a
 * 50x50 sand plus tile at the left and a P22 500 16/52 label.
 */
export function BigCta({ label, href, className }: { label: string; href: string; className?: string }) {
  return (
    <Link href={href} className={cn("inline-flex h-[52px] items-center bg-terracotta pr-7 font-display text-[16px] font-medium leading-[52px] text-cream transition-opacity hover:opacity-90", className)}>
      <span aria-hidden="true" className="mr-5 flex size-[50px] items-center justify-center bg-sand text-white">
        <IconPlus className="size-8" />
      </span>
      {label}
    </Link>
  );
}
