import { podcastsContent } from "@/data/podcasts";
import type { PodcastsContent } from "@/types/podcasts";

/** Content access for the Podcasts page. Async from day one, same pattern as the rest of the site. */
export async function getPodcasts(): Promise<PodcastsContent> {
  return podcastsContent;
}
