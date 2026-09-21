import { Button, Eyebrow } from "@/components/ui";
import type { BuyingOption } from "@/types/content";

/** "Buying options" box (Figma 196:6163): bordered panel, each retailer row 62px with a "Buy now" button. */
export function BuyingOptions({ options }: { options: BuyingOption[] }) {
  return (
    <div className="border-[0.5px] border-sand p-5">
      <Eyebrow>Buying options</Eyebrow>
      <ul className="mt-[10px] flex flex-col gap-[10px]">
        {options.map((option) => (
          <li key={option.id} className="flex h-[62px] items-center justify-between border-[0.5px] border-sand px-3">
            <span className="font-display text-label font-medium text-ink">{option.retailer}</span>
            <Button href={option.href} className="w-[99px] px-0">
              Buy now
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
