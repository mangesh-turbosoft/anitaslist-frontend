import type { Metadata } from "next";
import { StubPage } from "@/components/app/StubPage";

export const metadata: Metadata = { title: "Expert advice", robots: { index: false } };

/** Linked from the design; no frame exists for it (plan section 3). */
export default function Page() {
  return <StubPage title="Expert advice" />;
}
