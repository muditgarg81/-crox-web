"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function markAttendance(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Only admins can mark attendance.");
  }

  const userId = String(formData.get("userId"));
  const date = String(formData.get("date"));
  const status = String(formData.get("status"));
  const overtimeHours = Number(formData.get("overtimeHours") ?? 0);

  if (!userId || !date) {
    throw new Error("Employee and date are required.");
  }
  if (!["PRESENT", "ABSENT", "HALF_DAY"].includes(status)) {
    throw new Error("Invalid status.");
  }
  if (!Number.isFinite(overtimeHours) || overtimeHours < 0) {
    throw new Error("Overtime hours must be a non-negative number.");
  }

  await prisma.attendanceRecord.upsert({
    where: { userId_date: { userId, date: new Date(date) } },
    create: {
      userId,
      date: new Date(date),
      status: status as "PRESENT" | "ABSENT" | "HALF_DAY",
      overtimeHours,
      markedById: session.user.id,
    },
    update: {
      status: status as "PRESENT" | "ABSENT" | "HALF_DAY",
      overtimeHours,
      markedById: session.user.id,
    },
  });

  revalidatePath("/intralink/app/attendance");
}
