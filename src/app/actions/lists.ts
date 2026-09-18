"use server";

import { redirect } from "next/navigation";

export type FormState = { status: "idle" | "error" | "success"; message?: string; fields?: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "list";

/**
 * Lightbox submissions. Each validates what the design implies and then moves the user on, so the flows can be
 * walked end to end. TODO (Laravel phase): replace the redirects with API calls and revalidation.
 */
export async function createList(_prev: FormState, fd: FormData): Promise<FormState> {
  const name = String(fd.get("name") ?? "").trim();
  if (!name) return { status: "error", fields: { name: "Please give your list a name." } };
  redirect(`/lists/${slug(name)}?state=empty`);
}

export async function createTemplateList(_prev: FormState, fd: FormData): Promise<FormState> {
  const template = String(fd.get("template") ?? "");
  if (!template) return { status: "error", message: "Please select a template." };
  redirect(`/lists/${slug(template)}-journey?state=empty`);
}

export async function createRegistry(_prev: FormState, fd: FormData): Promise<FormState> {
  const get = (k: string) => String(fd.get(k) ?? "").trim();
  const fields: Record<string, string> = {};
  if (!get("name")) fields.name = "Please give your registry a name.";
  if (!get("firstName")) fields.firstName = "Please enter a first name.";
  if (!get("lastName")) fields.lastName = "Please enter a last name.";
  if (!get("addressLine1")) fields.addressLine1 = "Please enter the first line of the address.";
  if (Object.keys(fields).length) return { status: "error", fields };
  redirect(`/registries/${slug(get("name"))}`);
}

export async function shareRegistry(_prev: FormState, fd: FormData): Promise<FormState> {
  const emails = String(fd.get("emails") ?? "")
    .split(/[\s,;]+/)
    .filter(Boolean);
  if (!emails.length) return { status: "error", fields: { emails: "Please add at least one email address." } };
  const bad = emails.find((e) => !EMAIL.test(e));
  if (bad) return { status: "error", fields: { emails: `“${bad}” doesn’t look like an email address.` } };
  return { status: "success" };
}

export async function addNote(_prev: FormState, fd: FormData): Promise<FormState> {
  const body = String(fd.get("body") ?? "").trim();
  if (!body) return { status: "error", fields: { body: "Please write something first." } };
  redirect("/hub");
}

export async function addKeyDate(_prev: FormState, fd: FormData): Promise<FormState> {
  const fields: Record<string, string> = {};
  if (!String(fd.get("title") ?? "").trim()) fields.title = "Please name this date.";
  if (!String(fd.get("date") ?? "")) fields.date = "Please choose a date.";
  if (Object.keys(fields).length) return { status: "error", fields };
  redirect("/hub");
}
