"use client";

import { useRouter } from "next/navigation";
import { FixedBar, type FixedBarVariant } from "@/components/app/FixedBar";

/** Routes the fixed-bar tile actions: modal flows open via query params (phase 10), the rest are stubs for now. */
export function FixedBarClient({ totalPence, variant }: { totalPence: number; variant: FixedBarVariant }) {
  const router = useRouter();
  const onAction = (action: string) => {
    switch (action) {
      case "share":
        router.push("?share=1");
        break;
      case "convert":
        router.push("/hub?new=registry");
        break;
      case "delete":
        if (window.confirm("Delete this? This cannot be undone.")) router.push(variant === "registry" ? "/registries" : "/lists");
        break;
      case "download":
        window.print(); // TODO (Laravel phase): server-generated PDF/CSV export
        break;
      default:
        router.push(`?panel=${action}`);
    }
  };
  return <FixedBar totalPence={totalPence} variant={variant} onAction={onAction} />;
}
