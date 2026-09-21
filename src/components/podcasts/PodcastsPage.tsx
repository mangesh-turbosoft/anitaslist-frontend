import { Button, Container, Divider, Eyebrow } from "@/components/ui";
import type { PodcastsContent } from "@/types/podcasts";
import { PodcastEpisodeCard } from "./PodcastEpisodeCard";

/** Podcasts page. No Figma frame exists for it — content and structure as published on anitaslist.com/pages/podcast. */
export function PodcastsPage({ eyebrow, heading, intro, listenLinks, seasonLabel, episodes }: PodcastsContent) {
  return (
    <Container className="py-[50px]">
      <div className="mx-auto max-w-narrow">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-2 text-[36px] leading-[44px] xl:text-display">{heading}</h1>
        <p className="mt-3 max-w-[640px] font-sans text-body">{intro}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {listenLinks.map((link) => (
            <Button key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" variant="secondary" className="w-auto px-6">
              {link.label}
            </Button>
          ))}
        </div>
      </div>

      <Divider className="mt-10" />

      <div className="mt-12">
        <Eyebrow>{seasonLabel}</Eyebrow>
        <ul className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
          {episodes.map((episode) => (
            <PodcastEpisodeCard key={episode.id} episode={episode} />
          ))}
        </ul>
      </div>
    </Container>
  );
}
