import type { Metadata } from "next";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { SampleListRow } from "@/components/sections/SampleListRow";
import { getSampleListsContent } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Sample lists",
  description: "Sample lists from Anita’s List", // CONTENT TODO
};

/** Sample list page. Figma 886:7 (1440x3043): hero 80, three rows from y=730, footer 2619. */
export default async function SampleListsPage() {
  const c = await getSampleListsContent();
  return (
    <>
      <HeroSlider {...c.hero} />
      {c.rows.map((row) => (
        <SampleListRow key={row.id} {...row} />
      ))}
    </>
  );
}
