import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";
import { AuthShell } from "@/components/layout/AuthShell";

export const metadata: Metadata = { title: "Login", robots: { index: false } };

/** Login screen. Figma 886:9 (1440x1371). Route confirmed by the only hyperlink in the file. */
export default function LoginPage() {
  return (
    <AuthShell formTop="login">
      <LoginForm />
    </AuthShell>
  );
}
