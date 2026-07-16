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

function revalidateUserPages() {
  revalidatePath("/intralink/app/directory");
  revalidatePath("/intralink/app/admin");
}

export async function promoteToAdmin(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));

  await prisma.user.update({ where: { id }, data: { role: "ADMIN" } });
  revalidateUserPages();
}

export async function setUserActive(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("id"));
  const active = formData.get("active") === "true";

  if (id === admin.id) {
    throw new Error("You can't deactivate your own account.");
  }

  await prisma.user.update({ where: { id }, data: { isActive: active } });
  revalidateUserPages();
}

export async function updateLeaveBalances(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));

  const casualLeaveBalance = Number(formData.get("casualLeaveBalance"));
  const sickLeaveBalance = Number(formData.get("sickLeaveBalance"));
  const annualLeaveBalance = Number(formData.get("annualLeaveBalance"));

  if (
    !Number.isFinite(casualLeaveBalance) ||
    !Number.isFinite(sickLeaveBalance) ||
    !Number.isFinite(annualLeaveBalance)
  ) {
    throw new Error("Leave balances must be numbers.");
  }

  await prisma.user.update({
    where: { id },
    data: { casualLeaveBalance, sickLeaveBalance, annualLeaveBalance },
  });
  revalidateUserPages();
}
