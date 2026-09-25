import { OptionSelect } from "@/components/cards/ProductCard";
import { NoteSlider } from "@/components/cards/NoteSlider";
import { IconStar } from "@/components/icons";
import { AddToListControl } from "@/components/lists/AddToListControl";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ProductsRow } from "@/components/sections/ProductsRow";
import { BuyingOptions } from "@/components/sections/BuyingOptions";
import { ProductSpecifics } from "@/components/sections/ProductSpecifics";
import { Breadcrumb, Container, Divider } from "@/components/ui";
import type { ProductDetail } from "@/types/content";

/** Product page (Figma 1331:8538, 1440x2564). Only one product is drawn; every product slug renders this same shape. */
export function ProductDetailPage({ product }: { product: ProductDetail }) {
  return (
    <>
      <Container className="flex flex-col items-start gap-4 py-[23px] sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb trail={product.trail} current={product.name} />
        <AddToListControl />
      </Container>
      <Divider />

      <Container className="relative grid grid-cols-1 gap-10 pb-[50px] pt-[35px] xl:grid-cols-[796fr_583fr]">
        <ProductGallery images={product.gallery} name={product.name} />

        <div className="flex flex-col">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h1 className="font-display text-[36px] leading-[44px] text-ink xl:text-display">{product.name}</h1>
            <div className="flex items-center">
              <ul className="flex gap-[2px] text-sage" aria-label={`Rated ${product.rating.value} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <li key={i}>
                    <IconStar className="size-5" />
                  </li>
                ))}
              </ul>
              <span className="ml-[9px] font-sans text-meta text-ink/50">
                {product.rating.value} ({product.rating.count})
              </span>
            </div>
          </div>
          <p className="mt-2 font-display text-h3 font-medium text-ink">{product.price}</p>

          <div className="mt-5 flex flex-wrap gap-5">
            <OptionSelect label="Colour" options={product.options.colour} />
            <OptionSelect label="Size" options={product.options.size} />
          </div>

          <div className="mt-5">
            <BuyingOptions options={product.buyingOptions} />
          </div>

          <p className="mt-5 max-w-[563px] font-sans text-body text-ink">{product.description}</p>

          <div className="mt-8">
            <ProductSpecifics specifics={product.specifics} />
          </div>
        </div>
      </Container>

      <Container className="pb-[50px]">
        <NoteSlider notes={product.notes} />
      </Container>

      <Divider />

      <div className="py-[50px]">
        <ProductsRow {...product.relevantProducts} />
      </div>
    </>
  );
}
