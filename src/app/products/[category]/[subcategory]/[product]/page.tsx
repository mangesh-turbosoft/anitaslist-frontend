import type { Metadata } from "next";
import { ListSelectionProvider } from "@/components/lists/ListSelection";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import { getProductDetail, getUserLists } from "@/lib/api/content";

type Props = { params: Promise<{ category: string; subcategory: string; product: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory, product } = await params;
  const detail = await getProductDetail(category, subcategory, product);
  return { title: detail.name };
}

/** Figma 196:5949 "Product". Only one product is drawn in the file; every slug currently resolves to it. */
export default async function Page({ params }: Props) {
  const { category, subcategory, product } = await params;
  const [detail, lists] = await Promise.all([getProductDetail(category, subcategory, product), getUserLists()]);
  return (
    <ListSelectionProvider lists={lists}>
      <ProductDetailPage product={detail} />
    </ListSelectionProvider>
  );
}
