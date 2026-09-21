import Link from "next/link";
import { CategoryProductCard } from "@/components/cards/CategoryProductCard";
import { NoteSlider } from "@/components/cards/NoteSlider";
import { CategorySidebar } from "@/components/sections/CategorySidebar";
import { Breadcrumb, Container, FilterSelect, RichText } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { CategoryPageContent } from "@/types/content";

/**
 * Products/Category Template (Figma 190:5514, 1440x2220). Two states share this one component: with a
 * subcategory (breadcrumb "Products | Transport | Pushchairs") or without (just "Products | Transport").
 */
export function CategoryTemplatePage({ content }: { content: CategoryPageContent }) {
  const basePath = `/products/${content.activeCategorySlug}${content.activeSubcategorySlug ? `/${content.activeSubcategorySlug}` : ""}`;

  return (
    <>
      <Container className="grid grid-cols-1 gap-8 pt-[35px] xl:grid-cols-[610px_minmax(0,1fr)] xl:gap-0">
        <div>
          <Breadcrumb trail={content.trail} current={content.current} />
          <h1 className="mt-2 text-[36px] leading-[44px] xl:mt-[26px] xl:text-display">
            <RichText text={content.heading} />
          </h1>
          <p className="mt-4 max-w-[563px] font-sans text-body text-ink">{content.description}</p>
        </div>
        <div className="min-w-0 xl:pl-[91px]">
          <NoteSlider notes={content.notes} />
        </div>
      </Container>

      <div className="mt-8 border-y-[0.5px] border-sand py-5">
        <Container className="flex flex-wrap items-center justify-end gap-4 xl:gap-5">
          <FilterSelect label="Prices" options={["All prices"]} />
          <FilterSelect label="Brand" options={["All brands"]} />
        </Container>
      </div>

      <Container className="mt-8 grid grid-cols-1 gap-8 pb-[50px] xl:grid-cols-[331px_minmax(0,1fr)] xl:items-start">
        <CategorySidebar categories={content.categories} activeCategorySlug={content.activeCategorySlug} activeSubcategorySlug={content.activeSubcategorySlug} />

        <div>
          <ul className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {content.products.map((product) => (
              <li key={product.id}>
                <CategoryProductCard product={product} href={`${basePath}/${product.slug}`} />
              </li>
            ))}
          </ul>

          {content.totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-10 flex justify-center">
              <ul className="flex items-center gap-3">
                {Array.from({ length: content.totalPages }, (_, i) => i + 1).map((n) => (
                  <li key={n}>
                    <Link
                      href={n === 1 ? basePath : `${basePath}?page=${n}`}
                      aria-current={n === content.page ? "page" : undefined}
                      className={cn(
                        "flex size-[31px] items-center justify-center font-sans text-body",
                        n === content.page ? "bg-sand font-bold" : "bg-sand/30 text-ink",
                      )}
                    >
                      {n}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </Container>
    </>
  );
}
