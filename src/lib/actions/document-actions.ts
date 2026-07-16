"use server";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function uploadDocument(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Only admins can upload documents.");
  }

  const title = String(formData.get("title") ?? "").trim();
  const file = formData.get("file") as File | null;

  if (!title || !file || file.size === 0) {
    throw new Error("Title and file are required.");
  }

  const blob = await put(`intralink-documents/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  await prisma.document.create({
    data: { title, fileUrl: blob.url, uploadedById: session.user.id },
  });

  revalidatePath("/intralink/app/documents");
}
