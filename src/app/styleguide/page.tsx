import type { Metadata } from "next";
import * as Icons from "@/components/icons";
import { Button, Checkbox, Container, Divider, Eyebrow, IconTile, Input, MenuDots, ProgressBar, StepDots, Textarea } from "@/components/ui";
import { ModalDemo } from "./ModalDemo";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false, follow: false } };

const colours = [
  ["ink", "#2D1A14"], ["ink-alt", "#382018"], ["cream", "#F8F8F2"], ["terracotta", "#C77065"], ["sand", "#CEBFA7"],
  ["sage", "#A0AA87"], ["bone", "#E6E4D8"], ["gold", "#E0BD5A"], ["blush", "#D89A94"], ["green", "#26A372"],
  ["muted-1", "#5C4941"], ["muted-2", "#928983"], ["muted-3", "#BEB6AA"],
] as const;

const type = [
  ["text-display", "font-display", "P22 400 48/60 - page H1"],
  ["text-h2", "font-display", "P22 400 32/44 - section heading"],
  ["text-h3 font-medium", "font-display", "P22 500 24/34 - card title"],
  ["text-h4", "font-display", "P22 400 22/32"],
  ["text-eyebrow font-semibold uppercase", "font-sans", "Noto 600 16/46 UPPER - eyebrow"],
  ["text-label font-medium", "font-display", "P22 500 16/19 - button / nav"],
  ["text-body", "font-sans", "Noto 400 15/22 - body"],
  ["text-meta", "font-sans", "Noto 400 12/22 - helper"],
  ["text-legal", "font-sans", "Noto 400 11/18 - legal"],
] as const;

/** Internal reference surface for visual QA. Not linked from the site. */
export default function StyleguidePage() {
  const iconEntries = Object.entries(Icons) as [string, React.ComponentType<React.SVGProps<SVGSVGElement>>][];
  return (
    <Container className="py-12">
      <h1 className="text-display">Styleguide</h1>
      <p className="mt-2 text-body">Design tokens and shared components, read off Figma V2 + Light boxes. Display font falls back to Georgia until P22 Mackinac Pro is licensed.</p>

      <section className="mt-12" aria-labelledby="sg-colour">
        <Eyebrow id="sg-colour">Colour</Eyebrow>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {colours.map(([name, hex]) => (
            <li key={name} className="text-meta">
              <div className={`h-16 border border-sand bg-${name}`} />
              <div className="mt-1 font-semibold">{name}</div>
              <div>{hex}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="sg-type">
        <Eyebrow id="sg-type">Typography</Eyebrow>
        <ul className="flex flex-col gap-4">
          {type.map(([cls, fam, note]) => (
            <li key={cls}>
              <p className={`${fam} ${cls} text-ink`}>The quick brown fox jumps over the lazy dog</p>
              <p className="text-meta text-muted-2">{note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="sg-buttons">
        <Eyebrow id="sg-buttons">Buttons</Eyebrow>
        <div className="flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button className="w-[149px] px-0">Create account</Button>
          <Button disabled>Disabled</Button>
          <Button href="/">As link</Button>
          <ModalDemo />
        </div>
      </section>

      <section className="mt-12 max-w-[446px]" aria-labelledby="sg-forms">
        <Eyebrow id="sg-forms">Form controls</Eyebrow>
        <div className="flex flex-col gap-4">
          <Input label="Email" placeholder="Email" type="email" />
          <Input label="Password" placeholder="Password" type="password" error="Example error message" />
          <Textarea label="Note" placeholder="Write a note" />
          <Checkbox label="All day" />
        </div>
      </section>

      <section className="mt-12" aria-labelledby="sg-misc">
        <Eyebrow id="sg-misc">Indicators</Eyebrow>
        <div className="flex flex-col gap-6">
          <StepDots total={2} current={1} className="justify-start" />
          <ProgressBar value={43} label="List progress" className="max-w-[292px]" />
          <Divider />
          <div className="flex items-center gap-4">
            <MenuDots />
            <IconTile><Icons.IconPlus className="size-8" /></IconTile>
            <IconTile round><Icons.IconInstagram className="size-[30px]" /></IconTile>
            <span className="inline-flex size-[33px] items-center justify-center bg-terracotta text-cream"><Icons.IconChevronRight className="h-4 w-auto" /></span>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="sg-icons">
        <Eyebrow id="sg-icons">Icons ({iconEntries.length})</Eyebrow>
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-8">
          {iconEntries.map(([name, Icon]) => (
            <li key={name} className="flex flex-col items-center gap-2 border border-sand p-3 text-ink">
              <Icon className="size-8" />
              <span className="text-center text-legal">{name.replace(/^Icon/, "")}</span>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
