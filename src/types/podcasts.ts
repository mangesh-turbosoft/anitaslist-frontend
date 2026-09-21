/** Content types for the Podcasts page. Sourced from the live site (anitaslist.com/pages/podcast) — no Figma frame exists for this page. */

export type PodcastEpisode = {
  id: string;
  number: number;
  title: string;
  guest: string | null;
  description: string;
  links: { apple: string; spotify: string; youtube: string };
};

export type PodcastsContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  listenLinks: { label: string; href: string }[];
  seasonLabel: string;
  episodes: PodcastEpisode[];
};
