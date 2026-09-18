import { Fragment, type ReactNode } from "react";

/**
 * Renders a fixture string carrying the two inline styles the design uses:
 * <em>…</em> (P22 Book Italic runs in headings) and <b>…</b> (bold prefixes such as "Optional |").
 * Nothing else is interpreted - no HTML injection. A CMS can supply the same markup later.
 */
export function RichText({ text }: { text: string }): ReactNode {
  const parts = text.split(/(<\/?(?:em|b)>)/);
  const out: ReactNode[] = [];
  let em = false;
  let b = false;
  parts.forEach((part, i) => {
    if (part === "<em>") em = true;
    else if (part === "</em>") em = false;
    else if (part === "<b>") b = true;
    else if (part === "</b>") b = false;
    else if (part) {
      let node: ReactNode = part;
      if (b) node = <b className="font-bold">{node}</b>;
      if (em) node = <em>{node}</em>;
      out.push(<Fragment key={i}>{node}</Fragment>);
    }
  });
  return <>{out}</>;
}
