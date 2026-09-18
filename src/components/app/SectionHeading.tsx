import Link from "next/link";
import { IconPlus } from "@/components/icons";
import { Container, Divider, RichText } from "@/components/ui";

/**
 * "Heading" block (900:2354, 1440x136): H2 P22 400 32/44 up to 1145 wide at the left; an action at the right
 * (label P22 500 16/22 + 51x51 terracotta plus tile, 20px apart) starting 9px down; hairline at the bottom.
 */
export function SectionHeading({ heading, action }: { heading: string; action?: { label: string; href: string } }) {
  return (
    <div>
      <Container className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <h2 className="max-w-[1145px] text-h2">
          <RichText text={heading} />
        </h2>
        {action && <CreateAction {...action} />}
      </Container>
      <Divider className="mt-12" />
    </div>
  );
}

/** "Create new list" style action: label + 51x51 terracotta square with a 32px plus. */
export function CreateAction({ label, href, className }: { label: string; href: string; className?: string }) {
  return (
    <Link href={href} className={`inline-flex shrink-0 items-center gap-5 font-display text-label-md font-medium text-ink hover:opacity-80 ${className ?? ""}`}>
      {label}
      <span aria-hidden="true" className="flex size-[51px] items-center justify-center bg-terracotta text-cream">
        <IconPlus className="size-8" />
      </span>
    </Link>
  );
}
