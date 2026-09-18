"use client";

import { HubPanel } from "@/components/app/HubPanel";
import { Container } from "@/components/ui";
import { formatShortDate } from "@/lib/format";
import type { HubData } from "@/types/app";

/**
 * The 2x2 panel grid under the hub intro (886:11 / 886:12). Panels share borders (Figma places them at
 * x=30 and x=719 with 690 widths - effectively 0 gap) and the footer follows immediately.
 */
export function HubPanels({ hub }: { hub: HubData }) {
  return (
    <Container className="px-0 md:px-[30px]">
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:[&>*+*]:-ml-px xl:[&>*:nth-child(n+3)]:-mt-px">
        <HubPanel
          title="My lists"
          rows={hub.lists.map((l) => ({ id: l.id, title: l.name, href: `/lists/${l.id}` }))}
          action={{ label: "Create new list", href: "/hub?new=list" }}
          viewAll={{ label: "View all lists", href: "/lists" }}
          rowButtonLabel="View list"
          empty={{
            cta: { label: "Create your first list", href: "/hub?new=list" },
            heading: "Lorem ipsum dolor",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
          }}
        />
        <HubPanel
          title="My registries"
          rows={hub.registries.map((r) => ({
            id: r.id,
            title: r.name,
            href: `/registries/${r.id}`,
            accent: r.sharedWithMe ? "shared" : "mine",
            deletable: !r.sharedWithMe,
          }))}
          legend={[
            { accent: "mine", label: "My registries" },
            { accent: "shared", label: "Registries shared with me" },
          ]}
          viewAll={{ label: "View all registries", href: "/registries" }}
          rowButtonLabel="View registry"
          empty={{
            heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
          }}
        />
        <HubPanel
          title="My key dates"
          rows={hub.keyDates.map((d) => ({ id: d.id, title: d.title, meta: formatShortDate(d.date), href: `/hub?date=${d.id}` }))}
          action={{ label: "Add new key date", href: "/hub?new=date" }}
          viewAll={{ label: "View all dates", href: "/hub?view=dates" }}
          rowButtonLabel="View date"
          empty={{
            cta: { label: "Add your first key date", href: "/hub?new=date" },
            heading: "Lorem ipsum dolor",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
          }}
        />
        <HubPanel
          title="My notes"
          rows={hub.userNotes.map((n) => ({ id: n.id, title: n.title, href: `/hub?note=${n.id}` }))}
          action={{ label: "Add new note", href: "/hub?new=note" }}
          viewAll={{ label: "View all notes", href: "/hub?view=notes" }}
          rowButtonLabel="View note"
          empty={{
            cta: { label: "Add your first note", href: "/hub?new=note" },
            heading: "Lorem ipsum dolor",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
          }}
        />
      </div>
    </Container>
  );
}
