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

export async function updateEmployeeId(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const employeeId = String(formData.get("employeeId") ?? "").trim() || null;

  if (employeeId) {
    const existing = await prisma.user.findUnique({ where: { employeeId } });
    if (existing && existing.id !== id) {
      throw new Error(`Employee ID "${employeeId}" is already in use.`);
    }
  }

  await prisma.user.update({ where: { id }, data: { employeeId } });
  revalidateUserPages();
}

export async function reviewSignup(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const decision = String(formData.get("decision"));
  const name = String(formData.get("name") ?? "").trim();
  const employeeId = String(formData.get("employeeId") ?? "").trim() || null;

  if (!["APPROVED", "REJECTED"].includes(decision)) {
    throw new Error("Invalid decision.");
  }

  if (decision === "APPROVED") {
    if (!name) {
      throw new Error("Enter the employee's name before approving.");
    }
    if (employeeId) {
      const existing = await prisma.user.findUnique({ where: { employeeId } });
      if (existing && existing.id !== id) {
        throw new Error(`Employee ID "${employeeId}" is already in use.`);
      }
    }
    await prisma.user.update({
      where: { id },
      data: { name, employeeId, approvalStatus: "APPROVED" },
    });
  } else {
    await prisma.user.update({
      where: { id },
      data: { approvalStatus: "REJECTED" },
    });
  }

  revalidateUserPages();
}
