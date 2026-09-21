import { IconNounHeadphones } from "@/components/icons";
import type { PodcastEpisode } from "@/types/podcasts";

const platformLinks: { key: keyof PodcastEpisode["links"]; label: string }[] = [
  { key: "apple", label: "Apple Podcasts" },
  { key: "spotify", label: "Spotify" },
  { key: "youtube", label: "YouTube" },
];

export function PodcastEpisodeCard({ episode }: { episode: PodcastEpisode }) {
  return (
    <li className="flex flex-col gap-5 border-[0.5px] border-sand bg-sand p-5 sm:flex-row">
      <span aria-hidden="true" className="flex size-[97px] shrink-0 items-center justify-center self-start border border-sand bg-bone text-ink">
        <IconNounHeadphones className="size-[52px]" />
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="font-sans text-label-md font-medium text-terracotta">Episode {episode.number}</span>
        <h3 className="mt-1 font-display text-h3 font-medium">{episode.title}</h3>
        {episode.guest && <p className="mt-1 font-sans text-body">with {episode.guest}</p>}
        <p className="mt-2 font-sans text-body">{episode.description}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {platformLinks.map(({ key, label }) => (
            <a
              key={key}
              href={episode.links[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-meta font-medium text-ink underline-offset-2 hover:underline"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </li>
  );
}
