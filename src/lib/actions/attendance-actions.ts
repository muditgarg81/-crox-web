"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["PRESENT", "ABSENT", "HALF_DAY"] as const;
type AttendanceStatus = (typeof VALID_STATUSES)[number];

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
  if (!VALID_STATUSES.includes(status as AttendanceStatus)) {
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
      status: status as AttendanceStatus,
      overtimeHours,
      markedById: session.user.id,
    },
    update: {
      status: status as AttendanceStatus,
      overtimeHours,
      markedById: session.user.id,
    },
  });

  revalidatePath("/intralink/app/attendance");
}

export type BulkImportState = { success?: string; errors?: string[] } | undefined;

function parseCsv(text: string): string[][] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.split(",").map((cell) => cell.trim()));
}

export async function bulkImportAttendance(
  _prevState: BulkImportState,
  formData: FormData
): Promise<BulkImportState> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { errors: ["Only admins can import attendance."] };
  }

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) {
    return { errors: ["Please choose a CSV file."] };
  }

  const text = await file.text();
  const rows = parseCsv(text);
  if (rows.length === 0) {
    return { errors: ["The file is empty."] };
  }

  // Skip a header row if its "date" column (3rd cell) doesn't parse as a date.
  const header = rows[0];
  const headerLooksLikeData = header[2] && !Number.isNaN(new Date(header[2]).getTime());
  const dataRows = headerLooksLikeData ? rows : rows.slice(1);

  const employeeIds = [...new Set(dataRows.map((r) => r[0]?.trim()).filter(Boolean))];
  const users = await prisma.user.findMany({
    where: { employeeId: { in: employeeIds } },
    select: { id: true, employeeId: true, isActive: true },
  });
  const userByEmployeeId = new Map(users.map((u) => [u.employeeId as string, u]));

  const errors: string[] = [];
  const validRecords: {
    userId: string;
    date: Date;
    status: AttendanceStatus;
    overtimeHours: number;
  }[] = [];

  dataRows.forEach((row, i) => {
    const rowNum = i + 1;
    const [employeeId, name, dateStr, statusStr, overtimeStr] = row;

    if (!employeeId || !dateStr || !statusStr) {
      errors.push(`Row ${rowNum}: missing employee ID, date, or status.`);
      return;
    }

    const user = userByEmployeeId.get(employeeId);
    if (!user) {
      errors.push(`Row ${rowNum}: no account found for employee ID ${employeeId}${name ? ` (${name})` : ""}.`);
      return;
    }
    if (!user.isActive) {
      errors.push(`Row ${rowNum}: ${employeeId}${name ? ` (${name})` : ""}'s account is deactivated.`);
      return;
    }

    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) {
      errors.push(`Row ${rowNum}: invalid date "${dateStr}" (use YYYY-MM-DD).`);
      return;
    }

    const status = statusStr.toUpperCase();
    if (!VALID_STATUSES.includes(status as AttendanceStatus)) {
      errors.push(`Row ${rowNum}: invalid status "${statusStr}" (use Present/Absent/Half_Day).`);
      return;
    }

    const overtimeHours = overtimeStr ? Number(overtimeStr) : 0;
    if (!Number.isFinite(overtimeHours) || overtimeHours < 0) {
      errors.push(`Row ${rowNum}: invalid overtime hours "${overtimeStr}".`);
      return;
    }

    validRecords.push({ userId: user.id, date, status: status as AttendanceStatus, overtimeHours });
  });

  if (validRecords.length > 0) {
    await prisma.$transaction(
      validRecords.map((r) =>
        prisma.attendanceRecord.upsert({
          where: { userId_date: { userId: r.userId, date: r.date } },
          create: { ...r, markedById: session.user.id },
          update: { status: r.status, overtimeHours: r.overtimeHours, markedById: session.user.id },
        })
      )
    );
    revalidatePath("/intralink/app/attendance");
  }

  return {
    success:
      validRecords.length > 0
        ? `Imported ${validRecords.length} attendance record${validRecords.length === 1 ? "" : "s"}.`
        : undefined,
    errors: errors.length > 0 ? errors : undefined,
  };
}
