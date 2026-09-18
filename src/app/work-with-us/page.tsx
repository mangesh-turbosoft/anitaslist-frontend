import type { Metadata } from "next";
import { WorkWithUsPage } from "@/components/legal/WorkWithUsPage";

export const metadata: Metadata = {
  title: "Work with us",
  description: "Join the Anita's List team.",
};

/** Content from anitaslist.com/pages/work-with-us (2026-09-17) — no Figma frame exists for this page. */
export default function WorkWithUsRoute() {
  return <WorkWithUsPage />;
}
