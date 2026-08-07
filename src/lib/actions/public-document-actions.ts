"use server";

import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { documentCategories } from "@/lib/investor-documents";
import type { PublicDocumentCategory } from "@/generated/prisma/client";

export async function uploadPublicDocument(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Only admins can upload investor documents.");
  }

  const category = String(formData.get("category") ?? "") as PublicDocumentCategory;
  const periodLabel = String(formData.get("periodLabel") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const file = formData.get("file") as File | null;

  if (!(category in documentCategories)) {
    throw new Error("Invalid document category.");
  }
  if (!periodLabel || !title || !file || file.size === 0) {
    throw new Error("Period, title, and file are required.");
  }

  const { slug } = documentCategories[category];
  const blob = await put(`investor-documents/${slug}/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  await prisma.publicDocument.create({
    data: {
      category,
      periodLabel,
      title,
      fileUrl: blob.url,
      uploadedById: session.user.id,
    },
  });

  revalidatePath("/investors", "layout");
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

  revalidatePath("/investors", "layout");
  revalidatePath("/intralink/app/admin");
}
