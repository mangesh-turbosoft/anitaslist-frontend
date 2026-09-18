"use server";

export type ContactState = { status: "idle" | "success" | "error"; message?: string; fields?: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form (fields as published at anitaslist.com/pages/faqs — Name, Email, Comment, "Send"). Validates and
 * acknowledges only - there is no backend yet.
 * TODO (Laravel phase): POST to the contact endpoint (or the mail address below) and surface its response.
 */
export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const comment = String(formData.get("comment") ?? "").trim();

  const fields: Record<string, string> = {};
  if (!name) fields.name = "Please enter your name.";
  if (!EMAIL.test(email)) fields.email = "Please enter a valid email address.";
  if (!comment) fields.comment = "Please enter a message.";
  if (Object.keys(fields).length) return { status: "error", fields };

  return { status: "success", message: "Thanks — your message has been sent. We usually reply within 2 hours." };
}
