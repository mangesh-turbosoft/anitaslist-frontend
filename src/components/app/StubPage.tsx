import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Divider } from "@/components/ui";

/**
 * Placeholder for routes the design links to but does not draw (plan section 3, "Routes implied but not designed").
 * Exists so no navigation dead-ends; replace with the real page once a Figma frame exists.
 */
export function StubPage({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <>
      <Container className="pt-[50px]">
        <h1 className="text-[36px] leading-[44px] xl:text-display">{title}</h1>
      </Container>
      <Divider className="mt-8" />
      <Container className="flex min-h-[420px] flex-col gap-6 py-[50px]">
        {children}
        <p className="max-w-[560px] font-sans text-body text-muted-1">
          This page has no design in the Figma file yet. It exists so that links to it work; content will follow once
          the page is designed.
        </p>
        <Link href="/" className="font-display text-label font-medium underline-offset-4 hover:underline">
          Back to the homepage
        </Link>
      </Container>
    </>
  );
}
