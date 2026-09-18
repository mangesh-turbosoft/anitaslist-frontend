import type { Metadata } from "next";
import { CookiePage } from "@/components/legal/CookiePage";
import { getCookieInfo } from "@/lib/api/legal";

export const metadata: Metadata = {
  title: "Cookie declaration",
  description: "The categories of cookies used on Anita's List.",
};

/**
 * anitaslist.com/pages/cookies-declaration renders its cookie table client-side, so it isn't in the page's
 * source and isn't reproduced here — see CookiePage for what's missing and where to get it.
 */
export default async function CookiesPage() {
  const { intro, categories } = await getCookieInfo();
  return <CookiePage intro={intro} categories={categories} />;
}
