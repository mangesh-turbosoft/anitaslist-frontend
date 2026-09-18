/**
 * Renders the lightweight markdown used by LegalSection.body: blank-line-separated paragraphs, where a block
 * whose every line starts with "- " becomes a bullet list. Deliberately not a markdown dependency — the content
 * only ever needs paragraphs and simple lists.
 */
export function LegalBody({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/);
  return (
    <div className="flex flex-col gap-4 font-sans text-body">
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter(Boolean);
        const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));
        if (isList) {
          return (
            <ul key={i} className="flex flex-col gap-2 pl-5">
              {lines.map((l, j) => (
                <li key={j} className="list-disc">
                  {l.slice(2)}
                </li>
              ))}
            </ul>
          );
        }
        // Preserve single line breaks within a paragraph (e.g. an address block) without treating them as new paragraphs.
        return (
          <p key={i} className="whitespace-pre-line">
            {block}
          </p>
        );
      })}
    </div>
  );
}
