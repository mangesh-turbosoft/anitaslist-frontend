"use server";

export type ContactState = { status: "idle" | "success" | "error"; message?: string; fields?: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact page form (Figma 1348:12214 — First name, Last name, Email, "Select an option" topic, Message,
 * terms checkbox, "Submit message"). Validates and acknowledges only - there is no backend yet.
 * TODO (Laravel phase): POST to the contact endpoint (or the mail address below) and surface its response.
 */
export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const topic = String(formData.get("topic") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const agreed = formData.get("agreed") === "on";

  const fields: Record<string, string> = {};
  if (!firstName) fields.firstName = "Please enter your first name.";
  if (!lastName) fields.lastName = "Please enter your last name.";
  if (!EMAIL.test(email)) fields.email = "Please enter a valid email address.";
  if (!topic) fields.topic = "Please select an option.";
  if (!message) fields.message = "Please enter a message.";
  if (!agreed) fields.agreed = "Please accept the Terms of service and Privacy Policy.";
  if (Object.keys(fields).length) return { status: "error", fields };

  return { status: "success", message: "Thanks — your message has been sent. We usually reply within 2 hours." };
}
