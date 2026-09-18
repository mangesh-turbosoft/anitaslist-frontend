"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { Button, Input, Textarea } from "@/components/ui";

const initial: ContactState = { status: "idle" };

/**
 * "Still have a question? Contact us!" form, as published at anitaslist.com/pages/faqs
 * (Name, Email, Comment, "Send"). No Figma frame exists for this — built with the site's shared Input/Textarea/Button.
 */
export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, initial);
  const f = state.fields ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="border-[0.5px] border-sand bg-cream/40 p-6">
        <p className="font-display text-h3 font-medium">Message sent</p>
        <p className="mt-2 font-sans text-body">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex w-full flex-col gap-4">
      <Input label="Name" name="name" showLabel autoComplete="name" placeholder="Name" required error={f.name} />
      <Input label="Email" name="email" type="email" showLabel autoComplete="email" placeholder="Email" required error={f.email} />
      <Textarea label="Comment" name="comment" showLabel placeholder="Comment" required error={f.comment} className="[&_textarea]:min-h-[160px]" />
      <Button type="submit" disabled={pending} className="w-[129px] px-0">
        Send
      </Button>
    </form>
  );
}
