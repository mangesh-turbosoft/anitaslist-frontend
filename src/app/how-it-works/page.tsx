import type { Metadata } from "next";
import { HowItWorksPage } from "@/components/pages/HowItWorksPage";

export const metadata: Metadata = { title: "How it works" };

/** How it works page (Figma 1343:10466). */
export default function Page() {
  return <HowItWorksPage />;
}
