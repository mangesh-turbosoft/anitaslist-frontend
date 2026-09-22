"use server";

export type FeedbackState = { status: "idle" | "success" | "error"; message?: string; fields?: Record<string, string> };

/**
 * Footer "Share your feedback" lightbox. Validates and acknowledges only - there is no backend yet.
 * TODO (Laravel phase): POST to the feedback endpoint, including the uploaded image if one was attached.
 */
export async function submitFeedback(_prev: FeedbackState, formData: FormData): Promise<FeedbackState> {
  const mood = String(formData.get("mood") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  const fields: Record<string, string> = {};
  if (!mood) fields.mood = "Let us know how you feel.";
  if (!description) fields.description = "Please describe your feedback.";
  if (Object.keys(fields).length) return { status: "error", fields };

  return { status: "success", message: "Lorem ipsum dolor sit amet consectetur." };
}
