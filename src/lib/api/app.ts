import { emptyHubData, hubData, lists, registries } from "@/data/hub";
import { listDetail, registryDetail } from "@/data/list-detail";
import type { HubData, ListDetail, ListSummary, RegistryDetail, RegistrySummary } from "@/types/app";

/**
 * Authenticated-app data access. Async from day one (plan section 13). `empty` lets the unpopulated Figma
 * states be previewed via ?state=empty until real data exists.
 */
export async function getHub(opts: { empty?: boolean } = {}): Promise<HubData> {
  return opts.empty ? emptyHubData : hubData;
}

export async function getLists(opts: { empty?: boolean } = {}): Promise<ListSummary[]> {
  return opts.empty ? [] : lists;
}

export async function getRegistries(opts: { empty?: boolean } = {}): Promise<RegistrySummary[]> {
  return opts.empty ? [] : registries;
}

export async function getList(id: string, opts: { empty?: boolean } = {}): Promise<ListDetail> {
  return listDetail(id, { empty: opts.empty });
}

export async function getRegistry(id: string): Promise<RegistryDetail> {
  return registryDetail(id);
}
