"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { subscribe, type NewsletterState } from "@/app/actions/newsletter";
import { Button } from "@/components/ui";
import { legal } from "@/data/site";

const initial: NewsletterState = { status: "idle" };

/**
 * Footer newsletter form. Figma (974:9205 / Subscribe): 446 wide; placeholder "Email" Noto 16/44 ink@50%
 * with no box, Subscribe button 129x40 on the right, a 1px #2D1A14 rule under both, legal note Noto 11/18 below.
 */
export function SubscribeForm() {
  const [state, action, pending] = useActionState(subscribe, initial);
  const id = useId();
  const msgId = `${id}-msg`;

  return (
    <form action={action} noValidate aria-describedby={state.message ? msgId : undefined}>
      <div className="flex h-[49px] items-start justify-between gap-4 border-b border-ink">
        <label htmlFor={id} className="sr-only">
          Email
        </label>
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email"
          aria-invalid={state.status === "error" ? true : undefined}
          className="h-[44px] min-w-0 flex-1 bg-transparent font-sans text-input text-ink outline-none placeholder:text-ink/50 focus-visible:outline-2 focus-visible:outline-terracotta"
        />
        <Button type="submit" disabled={pending} className="w-[129px] px-0">
          Subscribe
        </Button>
      </div>
      {state.message && (
        <p id={msgId} role={state.status === "error" ? "alert" : "status"} className="mt-2 text-meta text-ink">
          {state.message}
        </p>
      )}
      <p className="mt-[10px] max-w-[435px] font-sans text-legal text-black">
        By clicking the submit button, I declare that I have read the{" "}
        <Link href={legal.terms} className="hover:underline">
          Terms of service
        </Link>{" "}
        and accept the{" "}
        <Link href={legal.privacy} className="underline">
          Privacy Policy
        </Link>
      </p>
    </form>
  );
}
