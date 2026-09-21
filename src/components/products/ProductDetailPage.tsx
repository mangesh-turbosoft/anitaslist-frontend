import { AddToListControl } from "@/components/lists/AddToListControl";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { BuyingOptions } from "@/components/sections/BuyingOptions";
import { ProductSpecifics } from "@/components/sections/ProductSpecifics";
import { Breadcrumb, Container, Divider } from "@/components/ui";
import type { ProductDetail } from "@/types/content";

/** Product page (Figma 196:5949, 1440x1410). Only one product is drawn; every product slug renders this same shape. */
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
          <h1 className="font-display text-[36px] leading-[44px] text-ink xl:text-display">{product.name}</h1>
          <p className="mt-2 font-display text-h3 font-medium text-ink">{product.price}</p>

          <div className="mt-5">
            <BuyingOptions options={product.buyingOptions} />
          </div>

          <p className="mt-5 max-w-[563px] font-sans text-body text-ink">{product.description}</p>

          <div className="mt-8">
            <ProductSpecifics specifics={product.specifics} />
          </div>
        </div>
      </Container>
    </>
  );
}
