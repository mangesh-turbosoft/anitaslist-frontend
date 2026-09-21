"use server";

export type ProfileState = { status: "idle" | "success" | "error"; message?: string; fields?: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Edit profile (linked from the design; no frame exists for it - plan section 3). Validates and acknowledges
 * only - there is no session or backend yet. TODO (Laravel phase): persist against the signed-in user.
 */
export async function updateProfile(_prev: ProfileState, formData: FormData): Promise<ProfileState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const fields: Record<string, string> = {};
  if (!get("firstName")) fields.firstName = "Please enter your first name.";
  if (!get("lastName")) fields.lastName = "Please enter your last name.";
  if (!EMAIL.test(get("email"))) fields.email = "Please enter a valid email address.";
  const newPassword = String(formData.get("newPassword") ?? "");
  if (newPassword && newPassword.length < 8) fields.newPassword = "Your new password must be at least 8 characters.";
  if (Object.keys(fields).length) return { status: "error", fields };
  return { status: "success", message: "Your profile has been updated." };
}
