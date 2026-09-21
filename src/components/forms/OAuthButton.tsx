"use client";

import { Image } from "@/components/ui/Image";
import { useActionState } from "react";
import { socialSignIn, type AuthState } from "@/app/actions/auth";

const providers = {
  google: { name: "Google", icon: "/images/google.webp", w: 32, h: 32 },
  outlook: { name: "Outlook", icon: "/images/outlook.webp", w: 34, h: 32 },
} as const;

/**
 * Figma ("Google option" / "Outlook option"): 446x50, 1px sand border, 32px mark + 12px + label Noto 15/22 #382018, centred.
 * Lives inside the login / registration <form>, so it submits that form through its own formAction (no nested form);
 * the provider is bound into the action rather than sent as a field.
 */
export function OAuthButton({ provider, label }: { provider: keyof typeof providers; label: string }) {
  const p = providers[provider];
  const [state, action, pending] = useActionState(socialSignIn.bind(null, p.name), { status: "idle" } as AuthState);
  return (
    <div className="w-full">
      <button
        type="submit"
        formAction={action}
        formNoValidate
        disabled={pending}
        className="flex h-[50px] w-full items-center justify-center gap-3 border border-sand font-sans text-body text-ink-alt transition-colors hover:bg-cream/40 disabled:opacity-60"
      >
        <Image src={p.icon} alt="" width={p.w} height={p.h} />
        {label}
      </button>
      {state.message && (
        <p role="status" className="mt-1 text-meta text-terracotta">
          {state.message}
        </p>
      )}
    </div>
  );
}
