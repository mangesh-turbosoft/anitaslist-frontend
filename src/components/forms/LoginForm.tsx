"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, type AuthState } from "@/app/actions/auth";
import { IconLogo } from "@/components/icons";
import { Button, Divider, Input } from "@/components/ui";
import { OAuthButton } from "./OAuthButton";
import { OrLine } from "./OrLine";
import { PasswordInput } from "./PasswordInput";

/**
 * Login form (887:620, 447x541): logo 150x26 centred · H1 P22 400 32/44 centred at y=39 · Google 113 · Outlook 169 ·
 * or 226 · email 255 · password 315 · "Forgotten password?" Noto 12/22 at 375 · hairline 427 · Login 214x40 at 457 ·
 * "Don’t have an account? Create an account" Noto 12/22 centred at 519.
 */
export function LoginForm() {
  const [state, action, pending] = useActionState(login, { status: "idle" } as AuthState);
  const f = state.fields ?? {};
  return (
    <form action={action} noValidate className="w-full max-w-[447px]">
      <IconLogo className="mx-auto h-[26px] w-[150px] text-ink-alt" />
      <h1 className="mt-[13px] text-center text-h2">Lorem ipsum dolor sit</h1>
      <div className="mt-[30px] flex flex-col gap-[6px]">
        <OAuthButton provider="google" label="Continue with google" />
        <OAuthButton provider="outlook" label="Continue with outlook" />
      </div>
      <div className="mt-[7px]">
        <OrLine />
      </div>
      <div className="mt-[7px] flex flex-col gap-[10px]">
        <Input label="Email" name="email" type="email" autoComplete="email" placeholder="Email" required error={f.email} />
        <PasswordInput label="Password" name="password" autoComplete="current-password" placeholder="Password" required error={f.password} />
      </div>
      <Link href="/account/forgot-password" className="mt-[10px] inline-block font-sans text-meta hover:underline">
        Forgotten password?
      </Link>
      <Divider className="mt-[30px] border-t border-sand" />
      <Button type="submit" disabled={pending} className="mx-auto mt-[30px] flex w-[214px] px-0">
        Login
      </Button>
      <p className="mt-[22px] text-center font-sans text-meta">
        Don’t have an account?{" "}
        <Link href="/account/register" className="underline-offset-2 hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
