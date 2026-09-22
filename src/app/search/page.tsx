import type { Metadata } from "next";
import Link from "next/link";
import { CategoryProductCard } from "@/components/cards/CategoryProductCard";
import { CategoryTile } from "@/components/cards/CategoryTile";
import { IconChevronRight, IconSearch } from "@/components/icons";
import { Container, Eyebrow } from "@/components/ui";
import { getCategories, getSearchResults } from "@/lib/api/content";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string }> };

/**
 * Header "Search" destination. No search UI is designed in Figma, and there's no live search index yet -
 * rather than faking full-catalogue results, this matches `q` against the real fixture data we do have
 * (category/subcategory names, the one real product) and shows those as genuine results, with an honest
 * empty state otherwise. "Browse by category" below is unfiltered and always shown as a fallback.
 */
export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const [categories, results] = await Promise.all([getCategories(), getSearchResults(q)]);
  const hasResults = results.categories.length > 0 || results.subcategories.length > 0 || results.products.length > 0;

  return (
    <>
      <Container className="pt-[50px]">
        <Eyebrow>Search</Eyebrow>
        <h1 className="mt-1 text-[36px] leading-[44px] xl:text-display">{q ? `Results for “${q}”` : "Search Anita’s List"}</h1>
      </Container>

      <Container className="mt-8">
        <form role="search" action="/search" className="flex h-[70px] w-full border border-sand">
          <label htmlFor="search-q" className="sr-only">
            Search products
          </label>
          <input
            id="search-q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search for products, lists or advice"
            autoComplete="off"
            className="flex-1 bg-transparent pl-5 font-display text-h3 italic text-ink outline-none placeholder:text-ink/50"
          />
          <button type="submit" aria-label="Search" className="flex w-[70px] shrink-0 items-center justify-center border-l-[0.5px] border-sand text-ink">
            <IconSearch className="h-[17.5px] w-auto" />
          </button>
        </form>
      </Container>

      {q && !hasResults && (
        <Container className="mt-8">
          <p className="font-sans text-body text-ink">No results for “{q}”. Try one of the categories below instead.</p>
        </Container>
      )}

      {q && hasResults && (
        <Container className="mt-8">
          {results.categories.length > 0 && (
            <ul className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
              {results.categories.map((category) => (
                <li key={category.id}>
                  <CategoryTile category={category} />
                </li>
              ))}
            </ul>
          )}

          {results.subcategories.length > 0 && (
            <ul className={results.categories.length > 0 ? "mt-8 flex flex-col gap-1" : "flex flex-col gap-1"}>
              {results.subcategories.map(({ category, subcategory }) => (
                <li key={subcategory.slug}>
                  <Link
                    href={`/products/${category.slug}/${subcategory.slug}`}
                    className="group flex h-[70px] items-center justify-between border-b-[0.5px] border-sand font-display text-h3 font-medium text-ink"
                  >
                    {subcategory.name}
                    <IconChevronRight className="h-4 w-auto text-terracotta transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {results.products.length > 0 && (
            <ul className={`grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4 ${results.categories.length > 0 || results.subcategories.length > 0 ? "mt-8" : ""}`}>
              {results.products.map((product) => (
                <li key={product.href}>
                  <CategoryProductCard product={{ id: product.href, slug: product.href, name: product.name, price: product.price, image: null }} href={product.href} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      )}

      <Container className="mt-10 pb-[50px]">
        <Eyebrow>Browse by category</Eyebrow>
        <ul className="mt-4 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryTile category={category} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
