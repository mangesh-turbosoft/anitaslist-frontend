import type { Metadata } from "next";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { Container } from "@/components/ui";
import { getHub } from "@/lib/api/app";

export const metadata: Metadata = { title: "Edit profile", robots: { index: false } };

/** Linked from the design; no frame exists for it (plan section 3). Reuses the hub's signed-in user fixture. */
export default async function ProfilePage() {
  const hub = await getHub();
  return (
    <Container className="py-[50px]">
      <h1 className="text-[36px] leading-[44px] xl:text-display">Edit profile</h1>
      <div className="mt-8">
        <ProfileForm user={hub.user} />
      </div>
    </Container>
  );
}
