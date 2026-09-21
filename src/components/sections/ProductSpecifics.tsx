import { IconPlus } from "@/components/icons";
import { Eyebrow } from "@/components/ui";
import type { ProductSpecific } from "@/types/content";

/**
 * "Product specifics" list (Figma 203:6165 etc.): 543px rows with a plain 1px border (not the site's usual
 * 0.5px hairline - Figma draws this one at full weight), label left, a "+" toggle right. Rows sit flush
 * against each other, so a divide line between them (rather than each row keeping its own top+bottom border)
 * is what keeps that shared edge a single 1px line instead of doubling to 2px. Native <details> for disclosure
 * semantics - no expanded state is drawn, so the detail text is this component's own addition once a row opens.
 */
export function ProductSpecifics({ specifics }: { specifics: ProductSpecific[] }) {
  return (
    <div>
      <Eyebrow>Product specifics</Eyebrow>
      <ul className="mt-[10px] flex flex-col divide-y divide-sand border border-sand">
        {specifics.map((spec) => (
          <li key={spec.id}>
            <details className="group px-3">
              <summary className="flex h-[42px] cursor-pointer list-none items-center justify-between gap-4 font-display text-label font-medium text-ink marker:content-none">
                {spec.label}
                <IconPlus className="size-[13px] shrink-0 transition-transform duration-150 group-open:rotate-45" />
              </summary>
              <p className="pb-4 font-sans text-body text-ink">{spec.detail}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
