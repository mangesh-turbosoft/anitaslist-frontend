import type { Metadata } from "next";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { PodcastsSection } from "@/components/sections/PodcastsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { VillageBannerSection } from "@/components/sections/VillageBannerSection";
import { VisionMissionSection } from "@/components/sections/VisionMissionSection";
import { getAboutContent } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "About",
  description: "About Anita’s List", // CONTENT TODO
};

/**
 * About page. Figma 886:6 (1440x4075). Sections and y offsets:
 * hero 80 · expertise 779 · vision/mission 1275 (between hairlines) · village 1748 · team 2352 ·
 * testimonials 2989 · podcasts 3407 · footer 3653.
 */
export default async function AboutPage() {
  const c = await getAboutContent();
  return (
    <>
      <HeroSlider {...c.hero} />
      <StatsSection {...c.expertise} />
      <VisionMissionSection pillars={c.pillars} />
      <VillageBannerSection {...c.village} />
      <TeamSection {...c.team} />
      <TestimonialsSection {...c.testimonials} />
      <PodcastsSection {...c.podcasts} />
    </>
  );
}
