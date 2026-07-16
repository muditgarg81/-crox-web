"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function postNotice(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Only admins can post notices.");
  }

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!title || !body) {
    throw new Error("Title and body are required.");
  }

  await prisma.notice.create({
    data: { title, body, postedById: session.user.id },
  });

  revalidatePath("/intralink/app/notices");
}
