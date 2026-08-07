"use server";

import { randomBytes, createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendOtpSms, checkOtpSms, isTwilioConfigured } from "@/lib/twilio";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type OtpState =
  | { step: "enter-phone"; error?: string }
  | { step: "enter-code"; phone: string; info?: string }
  | { step: "pending-approval"; message: string }
  | { step: "rejected"; message: string }
  | undefined;

function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 10) return `+91${digits}`;
  return `+${digits}`;
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function sendOtp(_prevState: OtpState, formData: FormData): Promise<OtpState> {
  if (!isTwilioConfigured()) {
    return { step: "enter-phone", error: "Mobile login isn't set up yet. Use email/password instead." };
  }

  const rawPhone = String(formData.get("phone") ?? "").trim();
  if (!rawPhone) {
    return { step: "enter-phone", error: "Enter a phone number." };
  }
  const phone = normalizePhone(rawPhone);

  try {
    await sendOtpSms(phone);
  } catch {
    return { step: "enter-phone", error: "Couldn't send the code. Check the number and try again." };
  }

  return { step: "enter-code", phone };
}

export async function verifyOtp(_prevState: OtpState, formData: FormData): Promise<OtpState> {
  const phone = String(formData.get("phone") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();

  if (!phone || !code) {
    return { step: "enter-code", phone, info: "Enter the code we sent you." };
  }

  let approved = false;
  try {
    approved = await checkOtpSms(phone, code);
  } catch {
    return { step: "enter-code", phone, info: "That code didn't work — try again or resend." };
  }

  if (!approved) {
    return { step: "enter-code", phone, info: "Incorrect or expired code. Try again or resend." };
  }

  let user = await prisma.user.findUnique({ where: { phone } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        phone,
        name: name || "",
        role: "EMPLOYEE",
        approvalStatus: "PENDING",
      },
    });
  }

  if (user.approvalStatus === "REJECTED") {
    return {
      step: "rejected",
      message: "Your signup was not approved. Contact your admin if you think this is a mistake.",
    };
  }

  if (user.approvalStatus === "PENDING" || !user.isActive) {
    return {
      step: "pending-approval",
      message: "Your account is pending admin approval. You'll be able to log in once it's approved.",
    };
  }

  // Approved + active: mint a short-lived single-use token and hand off to the
  // phone-session Credentials provider, avoiding a second (impossible) Twilio check.
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  await prisma.otpLoginToken.deleteMany({ where: { userId: user.id } });
  await prisma.otpLoginToken.create({
    data: { userId: user.id, tokenHash, expiresAt: new Date(Date.now() + 2 * 60 * 1000) },
  });

  try {
    await signIn("phone-session", {
      userId: user.id,
      token,
      redirectTo: "/intralink/app/dashboard",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return { step: "enter-code", phone, info: "Sign-in failed. Please try again." };
    }
    throw err;
  }
}
