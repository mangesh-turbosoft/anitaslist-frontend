import type { Metadata } from "next";
import { IndexHero } from "@/components/app/AppHero";
import { EmptyState } from "@/components/app/EmptyState";
import { ListGrid } from "@/components/app/ListGrid";
import { SectionHeading } from "@/components/app/SectionHeading";
import { getRegistries } from "@/lib/api/app";

export const metadata: Metadata = { title: "My registries", robots: { index: false } };

type Props = { searchParams: Promise<{ state?: string }> };

/**
 * Registry page. Figma 886:20 populated (1440x1315) / 886:19 unpopulated (1440x1132).
 * Hero at 130, heading at 267, one row of 330x430 cards at 403, footer 60px below.
 * Unpopulated: centred copy at 512 with no CTA (none is drawn).
 */
export default async function RegistriesPage({ searchParams }: Props) {
  const sp = await searchParams;
  const registries = await getRegistries({ empty: sp.state === "empty" });
  return (
    <>
      <IndexHero back={{ label: "Back to My hub", href: "/hub" }} title="My registries" />
      <div className="pt-[43px]">
        <SectionHeading
          heading="Lorem ipsum dolor sit <em>amet consectetur</em>. Est orci eget at <em>nisl volutpat sit cras</em>."
          action={{ label: "Create new registry", href: "/hub?new=registry" }}
        />
      </div>
      {registries.length ? (
        <div className="pb-[60px]">
          <ListGrid items={registries.map((r) => ({ ...r, kind: "registry" as const }))} />
        </div>
      ) : (
        <EmptyState
          title="You currently have no registries."
          body="Lorem ipsum dolor sit amet consectetur. Arcu arcu fusce vitae mi mauris imperdiet dui velit eget."
        />
      )}
    </>
  );
}
