import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/intralink/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnIntralinkApp = request.nextUrl.pathname.startsWith("/intralink/app");
      if (isOnIntralinkApp) return isLoggedIn;
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "EMPLOYEE";
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
