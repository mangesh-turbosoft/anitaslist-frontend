import type { Metadata } from "next";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { AuthShell } from "@/components/layout/AuthShell";

export const metadata: Metadata = { title: "Create account", robots: { index: false } };

/** Registration screen. Figma 886:10 (1440x1371). */
export default function RegisterPage() {
  return (
    <AuthShell formTop="register">
      <RegisterForm />
    </AuthShell>
  );
}
