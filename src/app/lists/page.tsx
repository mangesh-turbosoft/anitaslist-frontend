import type { Metadata } from "next";
import { IndexHero } from "@/components/app/AppHero";
import { EmptyState } from "@/components/app/EmptyState";
import { ListGrid } from "@/components/app/ListGrid";
import { SectionHeading } from "@/components/app/SectionHeading";
import { getLists } from "@/lib/api/app";

export const metadata: Metadata = { title: "My lists", robots: { index: false } };

type Props = { searchParams: Promise<{ state?: string }> };

/**
 * List page. Figma 886:13 populated (1440x1769) / 886:14 unpopulated (1440x1242).
 * Hero at y=130 (94 tall), heading block at 265 (136 tall), 4-column card grid from 401 at a 483px pitch.
 * Unpopulated: centred copy at 512 and a 52px CTA at 633.
 */
export default async function ListsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const lists = await getLists({ empty: sp.state === "empty" });
  return (
    <>
      <IndexHero back={{ label: "Back to My hub", href: "/hub" }} title="My lists" />
      <div className="pt-[41px]">
        <SectionHeading
          heading="Lorem ipsum dolor sit amet consectetur. Bibendum odio sit amet aliquam sit ultrices <em>nibh feugiat lacus.</em>"
          action={{ label: "Create new list", href: "/hub?new=list" }}
        />
      </div>
      {lists.length ? (
        <div className="pb-0 pt-0">
          <ListGrid items={lists.map((l) => ({ ...l, kind: "list" as const }))} />
        </div>
      ) : (
        <EmptyState
          title="You currently have no lists."
          body="Lorem ipsum dolor sit amet consectetur. Arcu arcu fusce vitae mi mauris imperdiet dui velit eget."
          cta={{ label: "Create your first list", href: "/hub?new=list" }}
        />
      )}
    </>
  );
}
