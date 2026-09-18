import { cn } from "@/lib/cn";

/** Hairline. Figma: 0.5px #CEBFA7 (667 uses). Browsers render at least 1 device px; retina shows a true hairline. */
export function Divider({ className, vertical = false }: { className?: string; vertical?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        vertical ? "w-0 self-stretch border-l-[0.5px] border-sand" : "h-0 w-full border-t-[0.5px] border-sand",
        className,
      )}
    />
  );
}
