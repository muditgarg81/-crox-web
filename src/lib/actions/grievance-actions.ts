"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function submitGrievance(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "EMPLOYEE") {
    throw new Error("Only employees can submit grievances.");
  }

  const subject = String(formData.get("subject") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!subject || !description) {
    throw new Error("Subject and description are required.");
  }

  await prisma.grievance.create({
    data: { subject, description, userId: session.user.id },
  });

  revalidatePath("/intralink/app/grievances");
}

export async function respondToGrievance(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Only admins can respond to grievances.");
  }

  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const adminResponse = String(formData.get("adminResponse") ?? "").trim() || null;

  if (!["IN_REVIEW", "RESOLVED"].includes(status)) {
    throw new Error("Invalid status.");
  }

  await prisma.grievance.update({
    where: { id },
    data: { status: status as "IN_REVIEW" | "RESOLVED", adminResponse, respondedById: session.user.id },
  });

  revalidatePath("/intralink/app/grievances");
}
