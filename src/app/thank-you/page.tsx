import type { Metadata } from "next";
import { IconLogo } from "@/components/icons";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui";

export const metadata: Metadata = { title: "Welcome", robots: { index: false } };

/** Shown right after registration completes, before continuing into the app. No Figma frame exists for it - no split photo, message centred. */
export default function ThankYouPage() {
  return (
    <AuthShell showImage={false}>
      <div className="w-full max-w-[447px] text-center">
        <IconLogo className="mx-auto h-[26px] w-[150px] text-ink-alt" />
        <h1 className="mt-[13px] text-center text-h2">Thank you for joining Anita’s List</h1>
        <p className="mt-4 text-center font-sans text-body text-ink">
          Your account is ready. Start a list, create a registry, or just have a look around.
        </p>
        {/* text-align centers the button's inline-flex box - see LoginForm for why mx-auto + a flex override
            on Button itself doesn't reliably win against its own inline-flex base class. */}
        <div className="mt-[30px] text-center">
          <Button href="/hub" className="w-[214px] px-0">
            Go to my hub
          </Button>
        </div>
      </div>
    </AuthShell>
  );
}
