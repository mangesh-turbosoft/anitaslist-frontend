import type { Metadata } from "next";
import Link from "next/link";
import { CategoryProductCard } from "@/components/cards/CategoryProductCard";
import { CategoryTile } from "@/components/cards/CategoryTile";
import { IconChevronRight, IconSearch } from "@/components/icons";
import { Container, Eyebrow } from "@/components/ui";
import { getCategories, getSearchResults } from "@/lib/api/content";

export const metadata: Metadata = { title: "Search results", robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string }> };

/**
 * Dedicated results page for the header search popup - deliberately a different shape from /search (which is
 * the general "start searching" page embedded search bars elsewhere on the site land on, always showing the
 * full category grid). This one leads with the query and matches it against the real fixture data we have
 * (category/subcategory names, the one real product), with an honest empty state and a handful of category
 * suggestions when nothing matches.
 */
export default async function SearchResultsPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const [categories, results] = await Promise.all([getCategories(), getSearchResults(q)]);
  const hasResults = results.categories.length > 0 || results.subcategories.length > 0 || results.products.length > 0;
  const suggestions = categories.slice(0, 4);

  return (
    <>
      <Container className="pt-[50px]">
        <Eyebrow>Search results</Eyebrow>
        <h1 className="mt-1 max-w-[800px] text-[36px] leading-[44px] xl:text-display">
          {q ? (
            <>
              Results for <em>“{q}”</em>
            </>
          ) : (
            "No search term yet"
          )}
        </h1>
      </Container>

      <Container className="mt-6">
        <form role="search" action="/search-results" className="flex h-[70px] w-full border border-sand">
          <label htmlFor="search-results-q" className="sr-only">
            Refine your search
          </label>
          <input
            id="search-results-q"
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

      {q && hasResults ? (
        <Container className="mt-10">
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
      ) : (
        <Container className="mt-10">
          <div className="flex flex-col items-center border border-sand px-6 py-[50px] text-center">
            <IconSearch className="h-8 w-auto text-ink/30" />
            <p className="mt-5 max-w-[446px] font-display text-h3 font-medium text-ink">
              {q ? <>No results for “{q}”.</> : "Type something above to search Anita’s List."}
            </p>
            <p className="mt-2 max-w-[446px] font-sans text-body text-ink">
              {q ? (
                <>
                  Try browsing everything on the{" "}
                  <Link href="/products" className="underline underline-offset-2 hover:opacity-70">
                    products page
                  </Link>
                  , or take a look at these categories below.
                </>
              ) : (
                "Or take a look at these categories below."
              )}
            </p>
          </div>
        </Container>
      )}

      <Container className="mt-10 pb-[50px]">
        <Eyebrow>You might also like</Eyebrow>
        <ul className="mt-4 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {suggestions.map((category) => (
            <li key={category.id}>
              <CategoryTile category={category} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
