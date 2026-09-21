"use client";

import Link from "next/link";
import { useActionState } from "react";
import { forgotPassword, type AuthState } from "@/app/actions/auth";
import { IconLogo } from "@/components/icons";
import { Button, Input } from "@/components/ui";

/**
 * Forgotten password form. No Figma frame exists for this page (only the "Forgotten password?" link on the
 * login form does) - built to match LoginForm's shell and spacing rather than inventing a different visual
 * language: logo, centred H1, a short explanation, the email field, submit, and a way back to login.
 */
export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPassword, { status: "idle" } as AuthState);
  const f = state.fields ?? {};

  if (state.status === "success") {
    return (
      <div className="w-full max-w-[447px] text-center">
        <IconLogo className="mx-auto h-[26px] w-[150px] text-ink-alt" />
        <h1 className="mt-[13px] text-h2">Check your email</h1>
        <p className="mt-4 font-sans text-body text-ink">{state.message}</p>
        <Link href="/account/login" className="mt-[30px] inline-block font-display text-label font-medium underline-offset-2 hover:underline">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="w-full max-w-[447px]">
      <IconLogo className="mx-auto h-[26px] w-[150px] text-ink-alt" />
      <h1 className="mt-[13px] text-center text-h2">Forgotten password?</h1>
      <p className="mt-3 text-center font-sans text-body text-ink">
        Enter the email address on your account and we’ll send you a link to reset your password.
      </p>
      <div className="mt-[30px]">
        <Input label="Email" name="email" type="email" autoComplete="email" placeholder="Email" required error={f.email} />
      </div>
      {/* text-align centers the button's inline-flex box - see LoginForm for why mx-auto + a flex override
          on Button itself doesn't reliably win against its own inline-flex base class. */}
      <div className="mt-[30px] text-center">
        <Button type="submit" disabled={pending} className="w-[214px] px-0">
          Send reset link
        </Button>
      </div>
      <p className="mt-[22px] text-center font-sans text-meta">
        <Link href="/account/login" className="underline-offset-2 hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  );
}
