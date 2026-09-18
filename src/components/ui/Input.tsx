import { useId, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentPropsWithoutRef<"input"> & {
  label: string;
  /** Figma shows placeholder-only fields; the label stays for screen readers unless showLabel is true. */
  showLabel?: boolean;
  error?: string;
};

/** Figma: 446x50, fill #CEBFA7 @50%, no border, Noto 15/22, 10px left pad, placeholder ink @50%. */
export function Input({ label, showLabel = false, error, className, id, ...rest }: Props) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={inputId} className={cn("block text-body font-medium", !showLabel && "sr-only")}>
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="h-[50px] w-full bg-sand/50 px-[10px] text-body text-ink outline-none focus-visible:outline-2 focus-visible:outline-terracotta"
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-meta text-terracotta">
          {error}
        </p>
      )}
    </div>
  );
}
