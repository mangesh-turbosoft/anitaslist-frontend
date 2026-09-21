import type { Metadata } from "next";
import { PodcastsPage } from "@/components/podcasts/PodcastsPage";
import { getPodcasts } from "@/lib/api/podcasts";

export const metadata: Metadata = {
  title: "Podcasts",
  description: "Real talk for real parents — the Anita's List podcast, with expert advice and honest stories from new parenthood.",
};

/** Content from anitaslist.com/pages/podcast (2026-09-21) — no Figma frame exists for this page. */
export default async function Page() {
  const content = await getPodcasts();
  return <PodcastsPage {...content} />;
}
