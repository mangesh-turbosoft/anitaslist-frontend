import type { Metadata } from "next";
import { ListSelectionProvider } from "@/components/lists/ListSelection";
import { ProductListingPage } from "@/components/products/ProductListingPage";
import { getCategoryPageContent, getUserLists } from "@/lib/api/content";

type Props = { params: Promise<{ category: string; subcategory: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory } = await params;
  const content = await getCategoryPageContent(category, subcategory);
  return { title: content.current };
}

/** Products/Subcategory Template (Figma 1317:5483) - breadcrumb "Products | Transport | Pushchairs". */
export default async function Page({ params }: Props) {
  const { category, subcategory } = await params;
  const [content, lists] = await Promise.all([getCategoryPageContent(category, subcategory), getUserLists()]);
  return (
    <ListSelectionProvider lists={lists}>
      <ProductListingPage content={content} />
    </ListSelectionProvider>
  );
}
