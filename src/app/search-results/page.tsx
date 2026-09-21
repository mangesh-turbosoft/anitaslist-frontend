import type { Metadata } from "next";
import Link from "next/link";
import { CategoryTile } from "@/components/cards/CategoryTile";
import { IconSearch } from "@/components/icons";
import { Container, Eyebrow } from "@/components/ui";
import { getCategories } from "@/lib/api/content";

export const metadata: Metadata = { title: "Search results", robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string }> };

/**
 * Dedicated results page for the header search popup - deliberately a different shape from /search (which is
 * the general "start searching" page embedded search bars elsewhere on the site land on, always showing the
 * full category grid). This one leads with the query, gives an honest empty state since there's no search
 * index yet, and only offers a handful of category suggestions rather than the full browse grid.
 */
export default async function SearchResultsPage({ searchParams }: Props) {
  const [{ q = "" }, categories] = await Promise.all([searchParams, getCategories()]);
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

      <Container className="mt-10">
        <div className="flex flex-col items-center border border-sand px-6 py-[50px] text-center">
          <IconSearch className="h-8 w-auto text-ink/30" />
          <p className="mt-5 max-w-[446px] font-display text-h3 font-medium text-ink">
            {q ? <>We couldn’t find a match for “{q}” yet.</> : "Type something above to search Anita’s List."}
          </p>
          <p className="mt-2 max-w-[446px] font-sans text-body text-ink">
            Search is still being connected to the full catalogue. In the meantime, try browsing everything on the{" "}
            <Link href="/products" className="underline underline-offset-2 hover:opacity-70">
              products page
            </Link>
            .
          </p>
        </div>
      </Container>

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
