import type { Metadata } from "next";
import { ListSelectionProvider } from "@/components/lists/ListSelection";
import { ProductListingPage } from "@/components/products/ProductListingPage";
import { getRetailerPageContent, getUserLists } from "@/lib/api/content";

type Props = { params: Promise<{ retailer: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { retailer } = await params;
  const content = await getRetailerPageContent(retailer);
  return { title: content.current };
}

/** Individual retailer page (Figma 1348:11415) - reuses the shared filter-sidebar + carousel-rows template. */
export default async function Page({ params }: Props) {
  const { retailer } = await params;
  const [content, lists] = await Promise.all([getRetailerPageContent(retailer), getUserLists()]);
  return (
    <ListSelectionProvider lists={lists}>
      <ProductListingPage content={content} />
    </ListSelectionProvider>
  );
}
