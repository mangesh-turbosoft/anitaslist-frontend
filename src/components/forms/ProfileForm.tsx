"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileState } from "@/app/actions/profile";
import { Button, Divider, Input } from "@/components/ui";
import { PasswordInput } from "./PasswordInput";

type User = { firstName: string; lastName: string; email: string };

/** Edit profile form. No Figma frame exists for this page (plan section 3) - matches the site's input/button styling rather than inventing a different visual language. */
export function ProfileForm({ user }: { user: User }) {
  const [state, action, pending] = useActionState(updateProfile, { status: "idle" } as ProfileState);
  const f = state.fields ?? {};

  return (
    <form action={action} noValidate className="w-full max-w-[447px]">
      <div className="flex flex-col gap-[10px]">
        <Input label="First name" name="firstName" autoComplete="given-name" placeholder="First name" defaultValue={user.firstName} required error={f.firstName} />
        <Input label="Last name" name="lastName" autoComplete="family-name" placeholder="Last name" defaultValue={user.lastName} required error={f.lastName} />
        <Input label="Email" name="email" type="email" autoComplete="email" placeholder="Email" defaultValue={user.email} required error={f.email} />
      </div>

      <Divider className="my-[30px]" />

      <h2 className="font-display text-h3 font-medium">Change password</h2>
      <p className="mt-1 font-sans text-body text-ink">Leave this blank to keep your current password.</p>
      <div className="mt-[18px] flex flex-col gap-[10px]">
        <PasswordInput label="Current password" name="currentPassword" autoComplete="current-password" placeholder="Current password" />
        <PasswordInput label="New password" name="newPassword" autoComplete="new-password" placeholder="New password" error={f.newPassword} />
      </div>

      {state.status === "success" && (
        <p role="status" className="mt-5 font-sans text-body text-green">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending} className="mt-[30px] w-[214px] px-0">
        Save changes
      </Button>
    </form>
  );
}
