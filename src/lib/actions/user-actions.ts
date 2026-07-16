"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Only admins can manage users.");
  }
  return session.user;
}

export async function promoteToAdmin(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));

  await prisma.user.update({ where: { id }, data: { role: "ADMIN" } });
  revalidatePath("/intralink/app/directory");
}

export async function setUserActive(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("id"));
  const active = formData.get("active") === "true";

  if (id === admin.id) {
    throw new Error("You can't deactivate your own account.");
  }

  await prisma.user.update({ where: { id }, data: { isActive: active } });
  revalidatePath("/intralink/app/directory");
}
