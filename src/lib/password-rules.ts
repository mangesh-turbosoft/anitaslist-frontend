/** Password rules exactly as listed on the registration screen (886:10). Shared by the form and the server action. */
export const passwordRules = [
  { id: "length", label: "A minimum of 10 characters", test: (v: string) => v.length >= 10 },
  { id: "number", label: "At least one number", test: (v: string) => /\d/.test(v) },
  { id: "lower", label: "At least one lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { id: "upper", label: "At least one uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
];
