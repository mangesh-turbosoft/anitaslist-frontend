import type { Metadata } from "next";
import { VillagePage } from "@/components/legal/VillagePage";

export const metadata: Metadata = { title: "Anita’s Village", robots: { index: false } };

/** Dummy/placeholder content — no Figma frame and no live page exist for this route (plan section 3). */
export default function AnitasVillageRoute() {
  return <VillagePage />;
}
