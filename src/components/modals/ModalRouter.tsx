"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";
import { AddKeyDateModal } from "@/components/modals/AddKeyDateModal";
import { AddNoteModal } from "@/components/modals/AddNoteModal";
import { CreateListModal } from "@/components/modals/CreateListModal";
import { MakeRegistryModal } from "@/components/modals/MakeRegistryModal";
import { ProfileSettingsModal } from "@/components/modals/ProfileSettingsModal";
import { ShareRegistryModal } from "@/components/modals/ShareRegistryModal";

/**
 * Opens the lightbox flows from the URL so every trigger in the design is a plain link:
 *   ?new=list | registry | date | note      ?share=1      ?panel=profile-settings
 * Closing removes the parameter. Figma specifies none of the triggers (plan section 18); this is the inferred wiring.
 * Registry/list item-level panels (review-bought, add-own, review-deleted) are handled by DetailItemsSection
 * instead, since those need to read AND write the live item state that lives there, not just display a snapshot.
 */
export function ModalRouter({ shareLink, sharePasscode }: { shareLink?: string; sharePasscode?: string }) {
  return (
    <Suspense fallback={null}>
      <Inner shareLink={shareLink} sharePasscode={sharePasscode} />
    </Suspense>
  );
}

function Inner({ shareLink, sharePasscode }: { shareLink?: string; sharePasscode?: string }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const modal = params.get("new");
  const share = params.get("share") === "1";
  const panel = params.get("panel");

  const close = useCallback(() => {
    const next = new URLSearchParams(params.toString());
    next.delete("new");
    next.delete("share");
    next.delete("panel");
    next.delete("from");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [params, pathname, router]);

  return (
    <>
      <CreateListModal open={modal === "list"} onClose={close} />
      <MakeRegistryModal open={modal === "registry"} onClose={close} />
      <AddKeyDateModal open={modal === "date"} onClose={close} />
      <AddNoteModal open={modal === "note"} onClose={close} />
      <ShareRegistryModal open={share} onClose={close} link={shareLink ?? "https://anitaslist.com/JGi1245B"} passcode={sharePasscode ?? "R3gT3st2026"} />
      <ProfileSettingsModal open={panel === "profile-settings"} onClose={close} />
    </>
  );
}
