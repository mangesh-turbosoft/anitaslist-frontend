import type { Metadata } from "next";
import { CategoryTemplatePage } from "@/components/products/CategoryTemplatePage";
import { getCategoryPageContent } from "@/lib/api/content";

type Props = { params: Promise<{ category: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const content = await getCategoryPageContent(category);
  return { title: content.current };
}

/** Figma 190:5514 "Products/Category Template (desktop)", no subcategory - destination of the homepage category carousel. */
export default async function Page({ params, searchParams }: Props) {
  const [{ category }, { page }] = await Promise.all([params, searchParams]);
  const content = await getCategoryPageContent(category, undefined, page ? Number(page) : undefined);
  return <CategoryTemplatePage content={content} />;
}
