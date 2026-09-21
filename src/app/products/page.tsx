import type { Metadata } from "next";
import { BrowseProductsPage } from "@/components/products/BrowseProductsPage";
import { getBrowseProductsContent } from "@/lib/api/content";

export const metadata: Metadata = { title: "Products" };

/** Figma 183:5020 "Browse all products (desktop)". */
export default async function Page() {
  const content = await getBrowseProductsContent();
  return <BrowseProductsPage content={content} />;
}
