"use client";

import { useActionState, useState } from "react";
import { submitFeedback, type FeedbackState } from "@/app/actions/feedback";
import { Dropzone, ModalBody, ModalHeader, ModalSubmit } from "@/components/modals/ModalParts";
import { Button, Input, Modal, Textarea } from "@/components/ui";
import { cn } from "@/lib/cn";

const idle: FeedbackState = { status: "idle" };

const MOODS = [
  { value: "great", emoji: "😄", label: "Great" },
  { value: "good", emoji: "🙂", label: "Good" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "poor", emoji: "🙁", label: "Poor" },
  { value: "bad", emoji: "😠", label: "Bad" },
];

/**
 * "Help us improve" lightbox (Figma 1199:952 / 1199:1330), self-contained so the "Share your feedback" trigger
 * in the footer works from every page without a per-page modal router.
 */
export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState("");
  const [state, action, pending] = useActionState(submitFeedback, idle);

  const close = () => {
    setOpen(false);
    setMood("");
  };

  if (state.status === "success") {
    return (
      <>
        <Trigger onClick={() => setOpen(true)} />
        <Modal open={open} onClose={close} label="Feedback sent">
          <div className="pt-[41px]">
            <ModalHeader eyebrow="Help us improve" title="" />
          </div>
          <ModalBody className="text-center">
            <p className="font-display text-h2 italic">Thank you for sharing your feedback with us.</p>
            <p className="mt-4 font-sans text-body font-medium">{state.message}</p>
          </ModalBody>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Trigger onClick={() => setOpen(true)} />
      <Modal open={open} onClose={close} label="Help us improve">
        <form action={action} noValidate>
          <ModalHeader eyebrow="Help us improve" title="Lorem ipsum dolor set" />
          <ModalBody className="flex flex-col gap-5">
            <input type="hidden" name="mood" value={mood} />
            <div className="flex gap-3" role="radiogroup" aria-label="How do you feel?">
              {MOODS.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  role="radio"
                  aria-checked={mood === m.value}
                  aria-label={m.label}
                  onClick={() => setMood(m.value)}
                  className={cn("flex size-[70px] items-center justify-center border text-3xl", mood === m.value ? "border-terracotta bg-terracotta/10" : "border-sand")}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
            {state.fields?.mood && (
              <p role="alert" className="-mt-3 text-meta text-terracotta">
                {state.fields.mood}
              </p>
            )}
            <Textarea label="Description of feedback" name="description" showLabel placeholder="Lorem ipsum..." error={state.fields?.description} />
            <Dropzone name="image" label="Upload relevant images (optional)" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input label="First name" name="firstName" showLabel placeholder="Name" autoComplete="given-name" />
              <Input label="Last name" name="lastName" showLabel placeholder="Name" autoComplete="family-name" />
            </div>
            <Input label="Email" name="email" showLabel placeholder="Optional" type="email" autoComplete="email" />
            <ModalSubmit pending={pending}>Submit feedback</ModalSubmit>
          </ModalBody>
        </form>
      </Modal>
    </>
  );
}

function Trigger({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" onClick={onClick} className="mt-[26px] w-[194px] px-0">
      Share your feedback
    </Button>
  );
}
