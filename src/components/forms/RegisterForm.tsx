"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { register, type AuthState } from "@/app/actions/auth";
import { passwordRules } from "@/lib/password-rules";
import { IconLogo } from "@/components/icons";
import { Button, Checkbox, Input } from "@/components/ui";
import { legal } from "@/data/site";
import { DatePicker } from "./DatePicker";
import { OAuthButton } from "./OAuthButton";
import { OrLine } from "./OrLine";
import { PasswordInput } from "./PasswordInput";

/**
 * Registration form (887:374, 456x774): logo · H1 at 39 · due date 108 (with calendar) · Google 176 · Outlook 232 ·
 * or 289 · first name 317 · last name 377 · email 437 · password 497 · rules in two columns at 557 (Noto 15/22) ·
 * 20x20 tick box + legal Noto 11/18 at 627 · Create account 214x40 at 692 · "Already have an account? Log in." at 752.
 */
export function RegisterForm() {
  const [state, action, pending] = useActionState(register, { status: "idle" } as AuthState);
  const [pw, setPw] = useState("");
  const f = state.fields ?? {};
  return (
    <form action={action} noValidate className="w-full max-w-[447px]">
      <IconLogo className="mx-auto h-[26px] w-[150px] text-ink-alt" />
      <h1 className="mt-[13px] text-center text-h2">Lorem ipsum dolor sit</h1>
      <div className="mt-[25px]">
        <DatePicker name="dueDate" label="Due date" error={f.dueDate} />
      </div>
      <div className="mt-[18px] flex flex-col gap-[6px]">
        <OAuthButton provider="google" label="Sign up with google" />
        <OAuthButton provider="outlook" label="Sign up with outlook" />
      </div>
      <div className="mt-[7px]">
        <OrLine />
      </div>
      <div className="mt-[6px] flex flex-col gap-[10px]">
        <Input label="First name" name="firstName" autoComplete="given-name" placeholder="First name" required error={f.firstName} />
        <Input label="Last name" name="lastName" autoComplete="family-name" placeholder="Last name" required error={f.lastName} />
        <Input label="Email" name="email" type="email" autoComplete="email" placeholder="Email" required error={f.email} />
        <PasswordInput
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="Password"
          required
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          error={f.password}
          aria-describedby="password-rules"
        />
      </div>
      <ul id="password-rules" className="mt-[10px] grid grid-cols-2 gap-x-[22px] font-sans text-body">
        {passwordRules.map((r) => {
          const ok = r.test(pw);
          return (
            <li key={r.id} className={ok ? "text-green" : undefined}>
              <span aria-hidden="true">•</span>
              {r.label}
              <span className="sr-only">{ok ? " (met)" : ""}</span>
            </li>
          );
        })}
      </ul>
      <div className="mt-[26px]">
        <Checkbox
          name="terms"
          variant="filled"
          className="items-start gap-3 text-legal text-black"
          label={
            <span className="font-sans text-legal">
              By clicking the submit button, I declare that I have read the{" "}
              <Link href={legal.terms} className="hover:underline">
                Terms of service
              </Link>{" "}
              and accept the{" "}
              <Link href={legal.privacy} className="underline">
                Privacy Policy
              </Link>
            </span>
          }
        />
        {f.terms && (
          <p role="alert" className="mt-1 text-meta text-terracotta">
            {f.terms}
          </p>
        )}
      </div>
      {/* text-align centers the button's inline-flex box - see LoginForm for why mx-auto + a flex override
          on Button itself doesn't reliably win against its own inline-flex base class. */}
      <div className="mt-[30px] text-center">
        <Button type="submit" disabled={pending} className="w-[214px] px-0">
          Create account
        </Button>
      </div>
      <p className="mt-5 text-center font-sans text-meta">
        Already have an account?{" "}
        <Link href="/account/login" className="underline-offset-2 hover:underline">
          Log in.
        </Link>
      </p>
    </form>
  );
}
