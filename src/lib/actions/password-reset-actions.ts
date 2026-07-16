"use server";

import { randomBytes, createHash } from "crypto";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export type ResetActionState = { error?: string; success?: string } | undefined;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function siteOrigin() {
  const h = await headers();
  const host = h.get("host") ?? "croxoilandgas.com";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

export async function requestPasswordReset(
  _prevState: ResetActionState,
  formData: FormData
): Promise<ResetActionState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const genericSuccess = {
    success: "If an account exists for that email, a reset link has been sent.",
  };

  if (!email) return { error: "Email is required." };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return genericSuccess;

  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
  await prisma.passwordResetToken.create({
    data: { userId: user.id, tokenHash, expiresAt },
  });

  const origin = await siteOrigin();
  const resetUrl = `${origin}/intralink/reset-password?token=${token}`;
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Intralink <onboarding@resend.dev>",
          to: user.email,
          subject: "Reset your Intralink password",
          text: `Hi ${user.name},\n\nUse the link below to reset your Intralink password. It expires in 1 hour.\n\n${resetUrl}\n\nIf you didn't request this, you can ignore this email.`,
        }),
      });
    } catch {
      // Fire-and-forget: don't reveal delivery failures to the caller.
    }
  } else {
    console.log(`[password reset link] ${user.email}: ${resetUrl}`);
  }

  return genericSuccess;
}

export async function resetPassword(
  _prevState: ResetActionState,
  formData: FormData
): Promise<ResetActionState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!token) return { error: "Missing reset token." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const tokenHash = hashToken(token);
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    return { error: "This reset link is invalid or has expired." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash },
    }),
    prisma.passwordResetToken.deleteMany({ where: { userId: resetToken.userId } }),
  ]);

  return { success: "Password updated. You can now log in." };
}
