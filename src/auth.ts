import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createHash } from "crypto";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;
        if (!user.isActive || user.approvalStatus !== "APPROVED") return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    Credentials({
      id: "phone-session",
      credentials: {
        userId: {},
        token: {},
      },
      async authorize(credentials) {
        const userId = credentials?.userId as string | undefined;
        const token = credentials?.token as string | undefined;
        if (!userId || !token) return null;

        const tokenHash = hashToken(token);
        const loginToken = await prisma.otpLoginToken.findUnique({ where: { tokenHash } });
        if (!loginToken || loginToken.userId !== userId || loginToken.expiresAt < new Date()) {
          return null;
        }

        await prisma.otpLoginToken.delete({ where: { id: loginToken.id } });

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.isActive || user.approvalStatus !== "APPROVED") return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
});
