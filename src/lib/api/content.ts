import { aboutContent } from "@/data/about";
import { homeContent } from "@/data/home";
import { sampleListDetail } from "@/data/sample-list-detail";
import { sampleListsContent } from "@/data/sample-lists";
import { userLists } from "@/data/user";
import type { AboutContent, HomeContent, SampleListDetail, SampleListsContent, UserList } from "@/types/content";

/**
 * Content access layer. Every function is async from day one so that swapping the fixture for a
 * Laravel fetch later changes no call sites (plan section 13). Components never import fixtures directly.
 */
export async function getHomeContent(): Promise<HomeContent> {
  return homeContent;
}

export async function getAboutContent(): Promise<AboutContent> {
  return aboutContent;
}

export async function getSampleListsContent(): Promise<SampleListsContent> {
  return sampleListsContent;
}

export async function getSampleListDetail(slug: string): Promise<SampleListDetail> {
  return sampleListDetail(slug);
}

export async function getUserLists(): Promise<UserList[]> {
  return userLists;
}
