"use server";

import { redirect } from "next/navigation";
import { passwordRules } from "@/lib/password-rules";

export type AuthState = { status: "idle" | "error" | "success"; message?: string; fields?: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Auth stubs. Validate the shape the design implies, then send the visitor onward so the app flow can be
 * exercised end to end - login straight to the hub, register via a thank-you page first.
 * TODO (Laravel phase): call the auth endpoints and set the session. Whether Next.js owns auth at all is plan
 * section 18 q7.
 */
export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fields: Record<string, string> = {};
  if (!EMAIL.test(email)) fields.email = "Please enter a valid email address.";
  if (!password) fields.password = "Please enter your password.";
  if (Object.keys(fields).length) return { status: "error", fields };
  redirect("/hub");
}

export async function register(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const fields: Record<string, string> = {};
  if (!get("dueDate")) fields.dueDate = "Please choose your due date.";
  if (!get("firstName")) fields.firstName = "Please enter your first name.";
  if (!get("lastName")) fields.lastName = "Please enter your last name.";
  if (!EMAIL.test(get("email"))) fields.email = "Please enter a valid email address.";
  const pw = String(formData.get("password") ?? "");
  if (!passwordRules.every((r) => r.test(pw))) fields.password = "Your password does not meet the requirements.";
  if (formData.get("terms") !== "on") fields.terms = "Please accept the terms to continue.";
  if (Object.keys(fields).length) return { status: "error", fields };
  redirect("/thank-you");
}

/** No frame exists for this page (plan section 3) - validate the shape the login form implies, then acknowledge. TODO (Laravel phase): send the reset email. */
export async function forgotPassword(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL.test(email)) return { status: "error", fields: { email: "Please enter a valid email address." } };
  return { status: "success", message: `If an account exists for ${email}, we’ve sent a link to reset your password.` };
}

/** Bound per provider by OAuthButton; React still passes (prevState, formData), which are not needed here. */
export async function socialSignIn(provider: string): Promise<AuthState> {
  // No identity provider is connected yet - say so rather than pretend.
  return { status: "error", message: `Sign-in with ${provider} is not connected yet.` };
}
