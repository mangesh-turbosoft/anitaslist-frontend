import Image from "next/image";
import Link from "next/link";
import { IconChevronRight } from "@/components/icons";
import type { Category } from "@/types/content";

/**
 * Category tile on Browse all products (Figma 183:5020, "Product Cat" 330x293): 330x250 photo, category name
 * P22 500 24/34 below it, 31.6x31.6 terracotta chevron overlapping the photo's bottom-right corner. Static grid,
 * not a carousel - all 12 categories are meant to be browseable at once.
 */
export function CategoryTile({ category }: { category: Category }) {
  return (
    <Link href={`/products/${category.slug}`} className="group block">
      <div className="relative h-[250px] w-full overflow-hidden">
        <Image src={category.image.src} alt={category.image.alt} fill sizes="(min-width: 1280px) 330px, 45vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 flex size-8 items-center justify-center bg-terracotta text-cream"
        >
          <IconChevronRight className="h-4 w-auto" />
        </span>
      </div>
      <p className="mt-[10px] font-display text-h3 font-medium text-ink">{category.name}</p>
    </Link>
  );
}
