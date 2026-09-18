import type { Metadata } from "next";
import { CtaCard } from "@/components/cards/CtaCard";
import { BrandPartnersSection } from "@/components/sections/BrandPartnersSection";
import { ExpertAdviceSection } from "@/components/sections/ExpertAdviceSection";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ProductCategoriesSection } from "@/components/sections/ProductCategoriesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Container } from "@/components/ui";
import { getHomeContent } from "@/lib/api/content";

export const metadata: Metadata = {
  title: { absolute: "Anita’s List" },
  description: "Anita’s List", // CONTENT TODO
};

/**
 * Homepage. Figma 886:5 (1440x3618). Section order and y offsets:
 * nav 0 · hero 80-729 · CTA cards 679 (overlapping the hero by 50) · how it works 830 · expert advice 1326 ·
 * testimonials 1966 · product categories 2374 · brand partners 3039 · footer 3184.
 */
export default async function HomePage() {
  const c = await getHomeContent();
  return (
    <>
      <HeroSlider {...c.hero} />
      <Container className="relative z-10 -mt-[50px]">
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {c.ctas.map((cta) => (
            <li key={cta.id}>
              <CtaCard {...cta} />
            </li>
          ))}
        </ul>
      </Container>
      <HowItWorksSection {...c.howItWorks} />
      <ExpertAdviceSection {...c.expertAdvice} />
      <TestimonialsSection {...c.testimonials} />
      <ProductCategoriesSection {...c.categories} />
      <BrandPartnersSection {...c.partners} />
    </>
  );
}
