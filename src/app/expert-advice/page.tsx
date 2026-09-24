import type { Metadata } from "next";
import { ExpertAdviceHubPage } from "@/components/advice/ExpertAdviceHubPage";
import { transportAdviceTopics } from "@/data/expert-advice";

export const metadata: Metadata = { title: "Expert advice" };

/** Figma 1252:2 ("Expert Advice hub (Not AI)"). */
export default function Page() {
  return <ExpertAdviceHubPage topics={transportAdviceTopics} />;
}
