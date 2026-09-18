"use server";

export type NewsletterState = { status: "idle" | "success" | "error"; message?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Footer subscribe. Validates and acknowledges only - there is no backend yet.
 * TODO (Laravel phase): POST to the newsletter endpoint and surface its response.
 */
export async function subscribe(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  return { status: "success", message: "Thank you for subscribing." }; // CONTENT TODO: confirmation copy
}
