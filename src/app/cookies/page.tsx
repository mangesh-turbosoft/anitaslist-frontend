import type { Metadata } from "next";
import { CookiePage } from "@/components/legal/CookiePage";
import { getCookieInfo } from "@/lib/api/legal";

export const metadata: Metadata = {
  title: "Cookie declaration",
  description: "How Anita's List uses cookies, and how to manage your preferences.",
};

/** Figma 1269:1037 ("Cookie policy"). */
export default async function CookiesPage() {
  const { sections, browserLinks } = await getCookieInfo();
  return <CookiePage sections={sections} browserLinks={browserLinks} />;
}
