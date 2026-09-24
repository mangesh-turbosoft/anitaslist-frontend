import { LegalBody } from "@/components/legal/LegalBody";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalRow, LegalRowDivider } from "@/components/legal/LegalRow";
import { PrivacyUseOfInformation } from "@/components/legal/PrivacyUseOfInformation";
import { Container } from "@/components/ui";
import type { LegalDocument } from "@/types/legal";

const heroImage = { src: "/images/legal-hero-banner-2880x700.webp", width: 2880, height: 700 };

/**
 * Privacy policy, pixel-matched to Figma 1263:653. Dedicated component rather than reusing
 * LegalDocumentPage - that one is shared with Terms of service, which has no new design and must stay as is.
 *
 * Figma draws exactly 10 rows after the overview, not 11: its own "General" row's body runs both the data-
 * access paragraph AND the "removed from mailing list" paragraph together, under one heading. Our data file
 * keeps those as two separately-titled real sections ("general" / "unsubscribe") since that's how the live
 * site actually structures them - a better source of truth than Figma's own merge - but rendering them as two
 * separate rows would add a row Figma doesn't have. So they're recombined here, at render time only, into the
 * one row Figma actually draws; "changes-to-policy" stays separate, matching Figma's own second (distinct)
 * row.
 */
export function PrivacyPage({ doc }: { doc: LegalDocument }) {
  const unsubscribe = doc.sections.find((s) => s.id === "unsubscribe");
  const rows = doc.sections.filter((s) => s.id !== "unsubscribe");

  return (
    <>
      <LegalHero eyebrow="Privacy policy" heading={doc.title} image={heroImage} />
      <Container className="pb-[50px] pt-10 xl:pb-0 xl:pt-0">
        <div>
          <LegalRow heading="Privacy policy overview">
            <p className="font-sans text-eyebrow-xs font-semibold uppercase">{`Anita’s Edit Limited Privacy Policy – updated ${doc.updated.replace(/^Updated\s+/i, "")}`}</p>
            <div className="mt-4">{doc.intro && <LegalBody body={doc.intro} />}</div>
          </LegalRow>
          {rows.map((section) => (
            <div key={section.id}>
              <LegalRowDivider />
              <LegalRow heading={section.heading}>
                {section.id === "use-of-your-personal-information" ? (
                  <PrivacyUseOfInformation />
                ) : (
                  <LegalBody body={section.body} />
                )}
                {section.id === "general" && unsubscribe && (
                  <div className="mt-4">
                    <LegalBody body={unsubscribe.body} />
                  </div>
                )}
              </LegalRow>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
