"use client";

import { useEffect, useId, useRef, useState } from "react";
import { IconArrowFormSm, IconCalendar } from "@/components/icons";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function toISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function format(d: Date) {
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** Six rows of seven days starting on Monday, including the trailing/leading days of neighbouring months. */
function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset);
  return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
}

type Props = { name: string; label: string; placeholder?: string; error?: string; defaultValue?: string };

/**
 * Due-date field with the calendar dropdown drawn on the registration screen (887:374):
 * 446x50 input; 50x50 #D89A94 calendar button overlapping its right end; popover 213x184 (cream, 1px sand border)
 * aligned to the right edge directly beneath - month label Noto 500 15/22 at (13,10), weekday row Noto 500 9/22 in
 * 28px cells at y=36, day rows 19px tall at a 22px pitch from y=59, neighbouring-month days #928983, the selected
 * day as cream text on a 17x17 terracotta circle. Figma draws no month navigation; the two small arrows are added
 * so a date months away is reachable.
 */
export function DatePicker({ name, label, placeholder = "Due date", error, defaultValue }: Props) {
  const initial = defaultValue ? new Date(defaultValue) : null;
  const [value, setValue] = useState<Date | null>(initial);
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [view, setView] = useState({ y: (initial ?? today).getFullYear(), m: (initial ?? today).getMonth() });
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const errorId = `${id}-error`;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const days = monthGrid(view.y, view.m);
  const shift = (d: number) => setView((v) => ({ y: new Date(v.y, v.m + d, 1).getFullYear(), m: new Date(v.y, v.m + d, 1).getMonth() }));

  return (
    <div ref={root} className="relative w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          readOnly
          value={value ? format(value) : ""}
          placeholder={placeholder}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen((o) => !o);
            }
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="h-[50px] w-full cursor-pointer bg-sand/50 pl-[10px] pr-14 text-body text-ink outline-none focus-visible:outline-2 focus-visible:outline-terracotta"
        />
        <input type="hidden" name={name} value={value ? toISO(value) : ""} />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close calendar" : "Open calendar"}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={`${id}-cal`}
          className="absolute right-0 top-0 flex size-[50px] items-center justify-center bg-blush text-cream"
        >
          <IconCalendar className="size-8" />
        </button>
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-meta text-terracotta">
          {error}
        </p>
      )}

      {open && (
        <div
          id={`${id}-cal`}
          role="dialog"
          aria-label="Choose a date"
          className="absolute right-0 top-[50px] z-20 w-[213px] border border-sand bg-cream px-2 pb-2 pt-[10px]"
        >
          <div className="flex items-center justify-between px-[5px]">
            <p className="font-sans text-body font-medium text-ink-alt" aria-live="polite">
              {MONTHS[view.m]} {view.y}
            </p>
            <div className="flex gap-1">
              <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className="flex size-6 items-center justify-center text-ink">
                <IconArrowFormSm className="size-[10px] rotate-180" />
              </button>
              <button type="button" onClick={() => shift(1)} aria-label="Next month" className="flex size-6 items-center justify-center text-ink">
                <IconArrowFormSm className="size-[10px]" />
              </button>
            </div>
          </div>
          <table className="mt-[3px] w-full border-collapse font-sans text-[9px] font-medium leading-[22px]">
            <thead>
              <tr>
                {WEEKDAYS.map((d) => (
                  <th key={d} scope="col" className="h-[23px] w-7 text-center font-medium text-ink">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }, (_, r) => (
                <tr key={r} className="h-[22px]">
                  {days.slice(r * 7, r * 7 + 7).map((d) => {
                    const inMonth = d.getMonth() === view.m;
                    const selected = value ? toISO(d) === toISO(value) : false;
                    return (
                      <td key={toISO(d)} className="h-[19px] w-7 p-0 text-center align-middle">
                        <button
                          type="button"
                          onClick={() => {
                            setValue(d);
                            setOpen(false);
                          }}
                          aria-label={format(d)}
                          aria-pressed={selected}
                          className={cn(
                            "mx-auto flex size-[17px] items-center justify-center rounded-full leading-none",
                            inMonth ? "text-ink" : "text-muted-2",
                            selected && "bg-terracotta text-cream",
                          )}
                        >
                          {d.getDate()}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
