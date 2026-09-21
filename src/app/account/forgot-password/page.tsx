import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm";
import { AuthShell } from "@/components/layout/AuthShell";

export const metadata: Metadata = { title: "Forgotten password", robots: { index: false } };

/** Reached from the login form's "Forgotten password?" link. No dedicated Figma frame - no split photo, content centred. */
export default function ForgotPasswordPage() {
  return (
    <AuthShell showImage={false}>
      <ForgotPasswordForm />
    </AuthShell>
  );
}
