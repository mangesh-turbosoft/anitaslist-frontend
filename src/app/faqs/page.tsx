import type { Metadata } from "next";
import { FaqPage } from "@/components/legal/FaqPage";
import { getFaqs } from "@/lib/api/legal";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about lists, registries and shopping on Anita's List.",
};

/** Content from anitaslist.com/pages/faqs (2026-09-17) — no Figma frame exists for this page. */
export default async function FaqsPage() {
  const categories = await getFaqs();
  return <FaqPage categories={categories} />;
}
