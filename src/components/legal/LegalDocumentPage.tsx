import { LegalBody } from "@/components/legal/LegalBody";
import { Container } from "@/components/ui";
import type { LegalDocument } from "@/types/legal";

/**
 * Long-form legal document layout (Terms of service, Privacy policy). No Figma frame exists for these — the
 * design's footer only links to them (plan section 4) — so this follows the site's established type scale and
 * spacing rather than inventing a new pattern: H1, then each section as an H2 + body, centred at 1200px.
 */
export function LegalDocumentPage({ doc }: { doc: LegalDocument }) {
  return (
    <Container className="py-[50px]">
      <div className="mx-auto max-w-narrow">
        <h1 className="text-[36px] leading-[44px] xl:text-display">{doc.title}</h1>
        {doc.updated && <p className="mt-2 font-sans text-meta text-muted-1">{doc.updated}</p>}

        <div aria-hidden="true" className="mt-8 h-px w-full bg-sand" />

        {doc.intro && (
          <div className="mt-10">
            <LegalBody body={doc.intro} />
          </div>
        )}
        <div className="mt-10 flex flex-col gap-10">
          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-6">
              <h2 className="font-display text-h3 font-medium">{s.heading}</h2>
              <div className="mt-3">
                <LegalBody body={s.body} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
