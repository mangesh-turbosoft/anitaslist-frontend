import type { Metadata } from "next";
import { ListSelectionProvider } from "@/components/lists/ListSelection";
import { SearchPage } from "@/components/search/SearchPage";
import { searchBestSellers, searchNotes } from "@/data/search";
import { getCategories, getRetailers, getSearchResults, getUserLists } from "@/lib/api/content";

export const metadata: Metadata = { title: "Search results", robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string }> };

/** Product search page, with search term (Figma 1317:1151) - dedicated destination for the header search popup. */
export default async function SearchResultsPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const [categories, results, retailers, lists] = await Promise.all([getCategories(), getSearchResults(q), getRetailers(), getUserLists()]);

  return (
    <ListSelectionProvider lists={lists}>
      <SearchPage q={q} formAction="/search-results" categories={categories} results={results} bestSellers={searchBestSellers} retailers={retailers} notes={searchNotes} />
    </ListSelectionProvider>
  );
}
