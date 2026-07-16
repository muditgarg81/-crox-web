"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export type ProfileActionState = { error?: string; success?: string } | undefined;

export async function updateProfile(
  _prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const session = await auth();
  if (!session?.user) return { error: "Not signed in." };

  const phone = String(formData.get("phone") ?? "").trim() || null;
  const designation = String(formData.get("designation") ?? "").trim() || null;
  const department = String(formData.get("department") ?? "").trim() || null;

  await prisma.user.update({
    where: { id: session.user.id },
    data: { phone, designation, department },
  });

  revalidatePath("/intralink/app/profile");
  revalidatePath("/intralink/app/directory");
  return { success: "Profile updated." };
}
