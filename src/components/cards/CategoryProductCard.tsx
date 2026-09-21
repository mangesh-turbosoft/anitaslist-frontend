import Image from "next/image";
import Link from "next/link";
import { IconChevronRight } from "@/components/icons";
import type { CategoryProduct } from "@/types/content";

/**
 * Grid card on Products/Category Template (Figma 190:5514, "Product" 194:5848): 330x220 photo (plain placeholder
 * box where no photography exists yet), name P22 500 24/34, price Noto 500 16/22, 31.6x31.6 terracotta chevron
 * overlapping the photo's bottom-right corner.
 */
export function CategoryProductCard({ product, href }: { product: CategoryProduct; href: string }) {
  return (
    <Link href={href} className="group block">
      <div className="relative flex h-[220px] w-full items-center justify-center overflow-hidden bg-sand">
        {product.image ? (
          <Image src={product.image.src} alt={product.image.alt} fill sizes="(min-width: 1280px) 330px, 45vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        ) : (
          <span className="px-4 text-center font-display text-label font-medium" aria-hidden="true">
            Product image
          </span>
        )}
        <span aria-hidden="true" className="absolute bottom-0 right-0 flex size-8 items-center justify-center bg-terracotta text-cream">
          <IconChevronRight className="h-4 w-auto" />
        </span>
      </div>
      <p className="mt-[13px] font-display text-h3 font-medium text-black">{product.name}</p>
      <p className="mt-[3px] font-sans text-body text-black">{product.price}</p>
    </Link>
  );
}
