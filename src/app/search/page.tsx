import type { Metadata } from "next";
import { ListSelectionProvider } from "@/components/lists/ListSelection";
import { SearchPage } from "@/components/search/SearchPage";
import { searchBestSellers, searchNotes } from "@/data/search";
import { getCategories, getRetailers, getSearchResults, getUserLists } from "@/lib/api/content";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string }> };

/** Product search page, pre search term (Figma 1313:2) - header "Search" destination, no `q` yet. */
export default async function SearchPageRoute({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const [categories, results, retailers, lists] = await Promise.all([getCategories(), getSearchResults(q), getRetailers(), getUserLists()]);

  return (
    <ListSelectionProvider lists={lists}>
      <SearchPage q={q} formAction="/search" categories={categories} results={results} bestSellers={searchBestSellers} retailers={retailers} notes={searchNotes} />
    </ListSelectionProvider>
  );
}
