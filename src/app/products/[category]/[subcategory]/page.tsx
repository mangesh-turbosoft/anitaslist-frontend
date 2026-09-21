import type { Metadata } from "next";
import { CategoryTemplatePage } from "@/components/products/CategoryTemplatePage";
import { getCategoryPageContent } from "@/lib/api/content";

type Props = { params: Promise<{ category: string; subcategory: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory } = await params;
  const content = await getCategoryPageContent(category, subcategory);
  return { title: content.current };
}

/** Figma 190:5514 "Products/Category Template (desktop)" with a subcategory selected (breadcrumb "Products | Transport | Pushchairs"). */
export default async function Page({ params, searchParams }: Props) {
  const [{ category, subcategory }, { page }] = await Promise.all([params, searchParams]);
  const content = await getCategoryPageContent(category, subcategory, page ? Number(page) : undefined);
  return <CategoryTemplatePage content={content} />;
}
