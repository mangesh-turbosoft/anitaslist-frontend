import Link from "next/link";
import { CategoryProductCard } from "@/components/cards/CategoryProductCard";
import { CategoryTile } from "@/components/cards/CategoryTile";
import { NoteSlider } from "@/components/cards/NoteSlider";
import { ProductsRow } from "@/components/sections/ProductsRow";
import { IconChevronRight, IconSearch } from "@/components/icons";
import { Image } from "@/components/ui/Image";
import { Breadcrumb, Container } from "@/components/ui";
import type { Category, NoteSlide, Product, Retailer, SearchResults } from "@/types/content";

/**
 * Shared template behind both search destinations - the general "start searching" page (Figma 1313:2, no
 * search term) and the header search popup's dedicated results page (Figma 1317:1151, with a search term).
 * Figma draws the two frames almost identically (same hero, same "Best sellers"/"Product categories"/
 * "Our retailers" sections below); the real difference is that this page also renders genuine matches from
 * the real fixture data (category/subcategory names, the one real product) when `q` is set, with an honest
 * empty state otherwise - there's no live search index yet (see data/search.ts).
 */
export function SearchPage({
  q,
  formAction,
  categories,
  results,
  bestSellers,
  retailers,
  notes,
}: {
  q: string;
  formAction: string;
  categories: Category[];
  results: SearchResults;
  bestSellers: Product[];
  retailers: Retailer[];
  notes: NoteSlide[];
}) {
  const hasResults = results.categories.length > 0 || results.subcategories.length > 0 || results.products.length > 0;
  const featuredRetailers = retailers.slice(0, 4);

  return (
    <>
      <Container className="grid grid-cols-1 gap-8 pt-[35px] xl:grid-cols-[610px_minmax(0,1fr)] xl:gap-0">
        <div>
          <Breadcrumb trail={[]} current="Products" />
          <h1 className="mt-2 text-[36px] leading-[44px] xl:mt-[26px] xl:text-display">
            Browse all <em className="font-display italic">products</em>
          </h1>
        </div>
        <div className="min-w-0 xl:pl-[91px]">
          <NoteSlider notes={notes} />
        </div>
      </Container>

      <Container className="mt-10">
        <form role="search" action={formAction} className="flex h-[70px] w-full items-center gap-[30px] border border-sand bg-cream/40 px-[30px]">
          <IconSearch className="h-8 w-auto shrink-0 text-ink" />
          <label htmlFor="search-q" className="sr-only">
            Search products
          </label>
          <input
            id="search-q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="I’m looking for"
            autoComplete="off"
            className="flex-1 bg-transparent font-display text-h3 font-medium text-ink outline-none placeholder:text-ink/50"
          />
          <button type="submit" aria-label="Search" className="shrink-0 font-display text-label font-medium text-ink underline underline-offset-2">
            Search
          </button>
        </form>
      </Container>

      {q && (
        <Container className="mt-10">
          <h2 className="font-display text-h2">{hasResults ? <>Search results for “{q}”</> : <>No results for “{q}”</>}</h2>

          {hasResults ? (
            <div className="mt-6">
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
            </div>
          ) : (
            <p className="mt-4 max-w-[563px] font-sans text-body text-ink">Try one of the best sellers, categories or retailers below instead.</p>
          )}
        </Container>
      )}

      <div className="mt-10 py-[50px]">
        <ProductsRow id="search-best-sellers" heading="Best sellers" items={bestSellers} />
      </div>

      <Container className="pb-[50px]">
        <h2 className="font-display text-h2">Product categories</h2>
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <li key={category.id} className="border-[0.5px] border-sand">
              <Link href={`/products/${category.slug}`} className="group flex h-full flex-col">
                <div className="relative h-[251px] w-full overflow-hidden">
                  <Image src={category.image.src} alt={category.image.alt} fill sizes="330px" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                </div>
                <div className="flex flex-1 items-center justify-between p-5">
                  <p className="font-display text-h3 font-medium text-ink">{category.name}</p>
                  <span aria-hidden="true" className="flex size-[33px] shrink-0 items-center justify-center bg-terracotta text-cream">
                    <IconChevronRight className="h-4 w-auto" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="pb-[50px]">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-h2">Our retailers</h2>
          <Link href="/retailers" className="font-sans text-body text-ink underline underline-offset-2 hover:opacity-70">
            View all retailers
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredRetailers.map((retailer) => (
            <li key={retailer.id} className="border-[0.5px] border-sand">
              <Link href={`/retailers/${retailer.slug}`} className="group flex h-full flex-col">
                <div className="relative h-[251px] w-full overflow-hidden">
                  <Image src={retailer.image.src} alt={retailer.image.alt} fill sizes="330px" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                </div>
                <div className="flex flex-1 items-center justify-between p-5">
                  <p className="font-display text-h3 font-medium text-ink">{retailer.name}</p>
                  <span aria-hidden="true" className="flex size-[33px] shrink-0 items-center justify-center bg-terracotta text-cream">
                    <IconChevronRight className="h-4 w-auto" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
