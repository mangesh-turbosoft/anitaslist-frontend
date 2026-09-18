import type { HubData, ListSummary, RegistrySummary } from "@/types/app";

const cover = (n: "b" | "c" | "d") => ({ src: `/images/cover-${n}-330x251.webp`, alt: "", width: 330, height: 251 });

/** Titles and dates as drawn on the hub (886:11), list page (886:13) and registry page (886:20). */
export const lists: ListSummary[] = [
  { id: "list-1", name: "List name one lorem ipsum dolor", type: "blank", coverImage: cover("b"), totalPence: 123543, editedAt: "2026-07-10", progress: 0.43 },
  { id: "list-2", name: "List title two", type: "journey", coverImage: cover("c"), totalPence: 123543, editedAt: "2026-07-10", progress: 0.43 },
  { id: "list-3", name: "List title three", type: "blank", coverImage: cover("d"), totalPence: 123543, editedAt: "2026-07-10", progress: 0.43 },
  { id: "list-4", name: "List title four", type: "blank", coverImage: cover("b"), totalPence: 123543, editedAt: "2026-07-10", progress: 0.43 },
  { id: "list-5", name: "List name one lorem ipsum dolor", type: "journey", coverImage: cover("c"), totalPence: 123543, editedAt: "2026-07-10", progress: 0.43 },
  { id: "list-6", name: "List title six", type: "blank", coverImage: cover("d"), totalPence: 123543, editedAt: "2026-07-10", progress: 0.43 },
  { id: "list-7", name: "List title seven", type: "blank", coverImage: cover("b"), totalPence: 123543, editedAt: "2026-07-10", progress: 0.43 },
  { id: "list-8", name: "List title eight", type: "journey", coverImage: cover("c"), totalPence: 123543, editedAt: "2026-07-10", progress: 0.43 },
];

export const registries: RegistrySummary[] = [
  { id: "registry-1", name: "Registry title one", coverImage: cover("b"), totalPence: 0, editedAt: "2026-07-10", sharedWithMe: false, progress: null },
  { id: "registry-2", name: "Registry title two", coverImage: { src: "/images/banner-section-330x251.webp", alt: "", width: 330, height: 251 }, totalPence: 0, editedAt: "2026-04-23", sharedWithMe: false, progress: 1 },
  { id: "registry-3", name: "Registry title three", coverImage: cover("c"), totalPence: 0, editedAt: "2026-08-02", sharedWithMe: false, progress: 1 },
  { id: "registry-4", name: "Registry title four", coverImage: cover("d"), totalPence: 0, editedAt: "2026-07-10", sharedWithMe: true, progress: null },
];

export const hubData: HubData = {
  user: { id: "user-1", name: "Anne Johnson", firstName: "Anne", avatar: null, weeksPregnant: 26, weeksToDue: 12 },
  notes: [1, 2, 3, 4].map((n) => ({
    id: `hub-note-${n}`,
    image: { src: "/images/cover-a-213x197.webp", alt: "", width: 213, height: 197 },
    text: "“Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis.”",
    video: { label: "Watch video", href: "/expert-advice" },
  })),
  lists,
  registries,
  keyDates: [
    { id: "date-1", title: "Lorem ipsum dolor", date: "2027-05-07", startTime: "14:00", endTime: "18:00", allDay: false },
    { id: "date-2", title: "Dolor sit amets", date: "2027-05-07", startTime: null, endTime: null, allDay: true },
    { id: "date-3", title: "Consectetur amet", date: "2027-05-07", startTime: null, endTime: null, allDay: true },
    { id: "date-4", title: "Ipsum dolor sit", date: "2027-05-07", startTime: null, endTime: null, allDay: true },
  ],
  userNotes: [
    { id: "note-1", title: "Lorem ipsum dolor", body: "", createdAt: "2026-07-10" },
    { id: "note-2", title: "Amet consectetur", body: "", createdAt: "2026-07-10" },
    { id: "note-3", title: "Consectetur amet", body: "", createdAt: "2026-07-10" },
    { id: "note-4", title: "Ipsum dolor sit", body: "", createdAt: "2026-07-10" },
  ],
};

/** The unpopulated frames (886:12 / 886:14 / 886:19) - same user, nothing created yet. */
export const emptyHubData: HubData = { ...hubData, lists: [], registries: [], keyDates: [], userNotes: [] };
