"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const LEAVE_BALANCE_FIELD = {
  CASUAL: "casualLeaveBalance",
  SICK: "sickLeaveBalance",
  ANNUAL: "annualLeaveBalance",
} as const;

export async function submitLeaveRequest(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "EMPLOYEE") {
    throw new Error("Only employees can submit leave requests.");
  }

  const startDate = String(formData.get("startDate"));
  const endDate = String(formData.get("endDate"));
  const reason = String(formData.get("reason") ?? "").trim();

  if (!startDate || !endDate || !reason) {
    throw new Error("All fields are required.");
  }

  await prisma.leaveRequest.create({
    data: {
      userId: session.user.id,
      type: "CASUAL",
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason,
    },
  });

  revalidatePath("/intralink/app/leave");
  revalidatePath("/intralink/app/admin");
}

export async function reviewLeaveRequest(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Only admins can review leave requests.");
  }

  const id = String(formData.get("id"));
  const decision = String(formData.get("decision"));
  const adminComment = String(formData.get("adminComment") ?? "").trim() || null;

  if (!["APPROVED", "REJECTED"].includes(decision)) {
    throw new Error("Invalid decision.");
  }

  const leave = await prisma.leaveRequest.findUnique({ where: { id } });
  if (!leave || leave.status !== "PENDING") {
    throw new Error("This request has already been reviewed.");
  }

  await prisma.$transaction(async (tx) => {
    await tx.leaveRequest.update({
      where: { id },
      data: {
        status: decision as "APPROVED" | "REJECTED",
        adminComment,
        reviewedById: session.user.id,
      },
    });

    if (decision === "APPROVED" && leave.type !== "UNPAID") {
      const days =
        Math.round((leave.endDate.getTime() - leave.startDate.getTime()) / 86400000) + 1;
      const field = LEAVE_BALANCE_FIELD[leave.type as keyof typeof LEAVE_BALANCE_FIELD];
      await tx.user.update({
        where: { id: leave.userId },
        data: { [field]: { decrement: days } },
      });
    }
  });

  revalidatePath("/intralink/app/leave");
  revalidatePath("/intralink/app/admin");
}
