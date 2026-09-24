import type { Metadata } from "next";
import { PushchairAdvicePage } from "@/components/advice/PushchairAdvicePage";

export const metadata: Metadata = { title: "Pushchair advice" };

/** Figma 1260:2 ("Pushchair advise hub layout (Not AI)"), linked from the Expert Advice hub's Pushchairs card. */
export default function Page() {
  return <PushchairAdvicePage />;
}
