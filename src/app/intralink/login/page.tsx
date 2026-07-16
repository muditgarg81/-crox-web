"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/lib/actions/auth-actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-section px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Intralink Login</h1>
        <p className="text-sm text-muted mb-6">Sign in to your employee or admin account.</p>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <Link href="/intralink/forgot-password" className="text-xs text-navy hover:text-amber">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
            />
          </div>

          {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-amber px-6 py-3 font-semibold text-white hover:bg-amber-light transition-colors disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Log In"}
          </button>
        </form>

        <p className="text-sm text-muted mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/intralink/signup" className="text-navy font-medium hover:text-amber">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
