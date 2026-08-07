"use server";

import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function uploadAnnualReturn(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Only admins can upload annual returns.");
  }

  const financialYear = String(formData.get("financialYear") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const file = formData.get("file") as File | null;

  if (!financialYear || !title || !file || file.size === 0) {
    throw new Error("Financial year, title, and file are required.");
  }

  const blob = await put(`investor-documents/annual-returns/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  await prisma.publicDocument.create({
    data: {
      category: "ANNUAL_RETURN",
      financialYear,
      title,
      fileUrl: blob.url,
      uploadedById: session.user.id,
    },
  });

  revalidatePath("/investors/annual-returns");
  revalidatePath("/intralink/app/admin");
}

export async function deletePublicDocument(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Only admins can delete documents.");
  }

  const id = String(formData.get("id"));
  const doc = await prisma.publicDocument.findUniqueOrThrow({ where: { id } });

  await prisma.publicDocument.delete({ where: { id } });
  try {
    await del(doc.fileUrl);
  } catch {
    // Blob already gone or delete failed — DB record is the source of truth for the listing.
  }

  revalidatePath("/investors/annual-returns");
  revalidatePath("/intralink/app/admin");
}
