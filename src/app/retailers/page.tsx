import type { Metadata } from "next";
import { RetailersLandingPage } from "@/components/retailers/RetailersLandingPage";
import { retailersLandingNotes } from "@/data/retailers";
import { getRetailers } from "@/lib/api/content";

export const metadata: Metadata = { title: "Our retailers" };

/** Retailers landing page (Figma 1347:10942). */
export default async function Page() {
  const retailers = await getRetailers();
  return <RetailersLandingPage retailers={retailers} notes={retailersLandingNotes} />;
}
