"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { Button, Checkbox, Divider, Input, Select, Textarea } from "@/components/ui";

const CONTACT_TOPICS = ["General enquiry", "Order support", "Partnerships", "Press", "Something else"];

const initial: ContactState = { status: "idle" };

/**
 * Contact page form (Figma 1348:12214, "Form" 637x498): First name / Last name / Email / "Select an option"
 * topic dropdown / Message, a hairline, terms checkbox, "Submit message" button.
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
    <form action={action} noValidate className="flex w-full flex-col gap-[10px]">
      <Input label="First name" name="firstName" autoComplete="given-name" placeholder="First name" required error={f.firstName} />
      <Input label="Last name" name="lastName" autoComplete="family-name" placeholder="Last name" required error={f.lastName} />
      <Input label="Email" name="email" type="email" autoComplete="email" placeholder="Email" required error={f.email} />
      <Select
        label="Select an option"
        name="topic"
        showLabel={false}
        options={CONTACT_TOPICS.map((t) => ({ value: t, label: t }))}
        renderValue={(selected) => selected?.label ?? "Select an option"}
        className="w-full"
        fieldClassName="h-[50px] w-full bg-sand/50 pl-[10px] font-sans text-body text-ink/50"
        chevronClassName="h-[50px] w-[49px] bg-terracotta text-cream"
      />
      {f.topic && (
        <p role="alert" className="-mt-1 text-meta text-terracotta">
          {f.topic}
        </p>
      )}
      <Textarea label="Message" name="message" placeholder="Enter your name" required error={f.message} className="[&_textarea]:min-h-[120px]" />

      <Divider className="my-1" />

      <div className="mb-3">
        <Checkbox
          name="agreed"
          variant="filled"
          align="center"
          label={
            <span className="text-legal text-ink">
              By clicking the submit button, I declare that I have read the Terms of service and accept the{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </span>
          }
        />
        {f.agreed && (
          <p role="alert" className="mt-1 text-meta text-terracotta">
            {f.agreed}
          </p>
        )}
      </div>

      <Button type="submit" disabled={pending} className="w-[179px] px-0">
        Submit message
      </Button>
    </form>
  );
}
