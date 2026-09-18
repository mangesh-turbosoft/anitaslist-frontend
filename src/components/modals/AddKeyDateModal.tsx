"use client";

import { useActionState, useState } from "react";
import { addKeyDate, type FormState } from "@/app/actions/lists";
import { ModalHeader, ModalSubmit, Toggle } from "@/components/modals/ModalParts";
import { Input, Modal, Textarea } from "@/components/ui";
import { cn } from "@/lib/cn";

const idle: FormState = { status: "idle" };

function pad(n: number) {
  return String(n).padStart(2, "0");
}
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fmt = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
const fmtTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  return `${((h + 11) % 12) + 1}:${pad(m)}${suffix}`;
};
function grid(y: number, m: number) {
  const first = new Date(y, m, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(y, m, 1 - offset);
  return Array.from({ length: 35 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
}

/**
 * "Add a date" lightbox (1020:24290, 720x906): "ADD KEY DATE" header; Title ("E.g. Baby shower"); Location
 * ("E.g. 12 Smith street"); "All day" toggle row; "Starts" row with a 152x30 date chip and an 85x30 time chip
 * (sand @50%) and a 446x224 inline calendar (63px cells) beneath; "End" row; "Add details" textarea; "Add key date"
 * 445x40. Bottom padding 42.
 */
export function AddKeyDateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [state, action, pending] = useActionState(addKeyDate, idle);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [editing, setEditing] = useState<"start" | "end">("start");
  const [startTime, setStartTime] = useState("14:00");
  const [endTime, setEndTime] = useState("18:00");
  const [allDay, setAllDay] = useState(false);
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const days = grid(view.y, view.m);
  const pick = (d: Date) => {
    if (editing === "start") {
      setStart(d);
      if (!end || end < d) setEnd(d);
      setEditing("end");
    } else {
      setEnd(d < (start ?? d) ? start : d);
    }
  };

  return (
    <Modal open={open} onClose={onClose} label="Add a key date">
      <form action={action} noValidate>
        <ModalHeader eyebrow="Add key date" title="Lorem ipsum dolor set." />
        <div className="mx-auto flex w-full max-w-[446px] flex-col gap-[10px] px-4 pb-[42px] pt-[10px] sm:px-0">
          <Input label="Title" name="title" showLabel placeholder="E.g. Baby shower" required error={state.fields?.title} />
          <Input label="Location" name="location" showLabel placeholder="E.g. 12 Smith street" />
          <div onChange={(e) => setAllDay((e.target as HTMLInputElement).checked)}>
            <Toggle name="allDay" label="All day" />
          </div>
          <input type="hidden" name="date" value={start ? toISO(start) : ""} />
          <input type="hidden" name="endDate" value={end ? toISO(end) : ""} />
          <input type="hidden" name="startTime" value={allDay ? "" : startTime} />
          <input type="hidden" name="endTime" value={allDay ? "" : endTime} />
          <DateRow label="Starts" date={start} time={startTime} allDay={allDay} active={editing === "start"} onPick={() => setEditing("start")} onTime={setStartTime} />
          {state.fields?.date && (
            <p role="alert" className="text-meta text-terracotta">
              {state.fields.date}
            </p>
          )}
          <div className="border border-sand bg-cream px-[13px] pb-3 pt-[10px]">
            <div className="flex items-center justify-between">
              <p className="font-sans text-body font-medium text-ink-alt" aria-live="polite">
                {MONTHS[view.m]} {view.y}
              </p>
              <div className="flex gap-2 font-sans text-body">
                <button type="button" onClick={() => setView((v) => ({ y: new Date(v.y, v.m - 1, 1).getFullYear(), m: new Date(v.y, v.m - 1, 1).getMonth() }))} aria-label="Previous month" className="px-1">
                  ‹
                </button>
                <button type="button" onClick={() => setView((v) => ({ y: new Date(v.y, v.m + 1, 1).getFullYear(), m: new Date(v.y, v.m + 1, 1).getMonth() }))} aria-label="Next month" className="px-1">
                  ›
                </button>
              </div>
            </div>
            <table className="mt-1 w-full border-collapse font-sans text-[9px] font-medium leading-[22px]">
              <thead>
                <tr>
                  {WEEKDAYS.map((d) => (
                    <th key={d} scope="col" className="h-[23px] text-center font-medium">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }, (_, r) => (
                  <tr key={r}>
                    {days.slice(r * 7, r * 7 + 7).map((d) => {
                      const inMonth = d.getMonth() === view.m;
                      const isStart = start ? toISO(d) === toISO(start) : false;
                      const isEnd = end ? toISO(d) === toISO(end) : false;
                      return (
                        <td key={toISO(d)} className="h-7 p-0 text-center">
                          <button
                            type="button"
                            onClick={() => pick(d)}
                            aria-label={`${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`}
                            aria-pressed={isStart || isEnd}
                            className={cn("mx-auto flex size-[17px] items-center justify-center rounded-full", inMonth ? "text-ink" : "text-muted-2", (isStart || isEnd) && "bg-terracotta text-cream")}
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
          <DateRow label="End" date={end} time={endTime} allDay={allDay} active={editing === "end"} onPick={() => setEditing("end")} onTime={setEndTime} />
          <Textarea label="Add details" name="details" showLabel placeholder="Lorem ipsum dolor" className="[&_textarea]:min-h-[110px]" />
          <ModalSubmit pending={pending}>Add key date</ModalSubmit>
        </div>
      </form>
    </Modal>
  );
}

function DateRow({ label, date, time, allDay, active, onPick, onTime }: { label: string; date: Date | null; time: string; allDay: boolean; active: boolean; onPick: () => void; onTime: (t: string) => void }) {
  return (
    <div className={cn("flex h-[50px] items-center gap-[10px] border px-[11px]", active ? "border-terracotta" : "border-sand")}>
      <span className="w-[85px] font-sans text-body font-medium">{label}</span>
      <button type="button" onClick={onPick} aria-pressed={active} className="flex h-[30px] w-[152px] items-center bg-sand/50 px-3 font-sans text-body text-left hover:bg-sand/70">
        {date ? fmt(date) : "Choose date"}
      </button>
      {!allDay && (
        <label className="relative flex h-[30px] w-[85px] items-center bg-sand/50 px-2 font-sans text-body">
          <span className="sr-only">{label} time</span>
          <span aria-hidden="true">{fmtTime(time)}</span>
          <input type="time" value={time} onChange={(e) => onTime(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" />
        </label>
      )}
    </div>
  );
}
