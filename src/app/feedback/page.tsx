import type { Metadata } from "next";
import { StubPage } from "@/components/app/StubPage";

export const metadata: Metadata = { title: "Share your feedback", robots: { index: false } };

/** Linked from the design; no frame exists for it (plan section 3). */
export default function Page() {
  return <StubPage title="Share your feedback" />;
}
