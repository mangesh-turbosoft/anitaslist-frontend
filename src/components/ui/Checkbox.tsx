import { useId, type ComponentPropsWithoutRef } from "react";
import { IconTick } from "@/components/icons";
import { cn } from "@/lib/cn";

type Props = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  label: React.ReactNode;
  variant?: "outline" | "filled";
  /** "start" (default) top-aligns the box against multi-line labels; "center" vertically centres it against a single-line label. */
  align?: "start" | "center";
};

/** Figma draws only a 15x15 tick in isolation; the box treatment (sand hairline) is inferred. NEEDS CONFIRMATION. */
export function Checkbox({ label, variant = "outline", align = "start", className, id, ...rest }: Props) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <label htmlFor={inputId} className={cn("inline-flex cursor-pointer gap-2 text-body", align === "center" ? "items-center" : "items-start", className)}>
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center",
          variant === "filled" ? cn("size-5 bg-sand/50", align === "start" && "mt-[3px]") : "size-[15px] border border-sand bg-cream",
        )}
      >
        <input id={inputId} type="checkbox" className="peer absolute inset-0 size-full cursor-pointer opacity-0" {...rest} />
        <IconTick className="size-[11px] text-ink opacity-0 peer-checked:opacity-100" />
      </span>
      {label}
    </label>
  );
}
