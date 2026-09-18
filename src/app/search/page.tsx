import type { Metadata } from "next";
import { StubPage } from "@/components/app/StubPage";
import { Button, Input } from "@/components/ui";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string }> };

/** Header "Search" destination. No search UI is designed (plan section 18); this form keeps the control functional. */
export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  return (
    <StubPage title="Search">
      <form role="search" action="/search" className="flex max-w-[600px] flex-col gap-3 sm:flex-row">
        <Input label="Search" name="q" type="search" placeholder="Search" defaultValue={q} className="flex-1" />
        <Button type="submit" className="h-[50px] w-[129px] px-0">
          Search
        </Button>
      </form>
      {q && <p className="font-sans text-body">Results for “{q}” will appear here once the search API is connected.</p>}
    </StubPage>
  );
}
