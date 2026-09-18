import { useId, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentPropsWithoutRef<"textarea"> & { label: string; showLabel?: boolean; error?: string };

/** Same treatment as Input, multi-line. */
export function Textarea({ label, showLabel = false, error, className, id, ...rest }: Props) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={inputId} className={cn("block text-body font-medium", !showLabel && "sr-only")}>
        {label}
      </label>
      <textarea
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="min-h-[120px] w-full resize-y bg-sand/50 px-[10px] py-3 text-body text-ink outline-none focus-visible:outline-2 focus-visible:outline-terracotta"
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
