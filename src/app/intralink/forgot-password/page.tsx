"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordReset } from "@/lib/actions/password-reset-actions";

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, undefined);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-section px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Forgot Password</h1>
        <p className="text-sm text-muted mb-6">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>

        {state?.success ? (
          <p className="text-sm text-green-700 bg-green-50 rounded-lg p-4">{state.success}</p>
        ) : (
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

            {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-amber px-6 py-3 font-semibold text-white hover:bg-amber-light transition-colors disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="text-sm text-muted mt-6 text-center">
          <Link href="/intralink/login" className="text-navy font-medium hover:text-amber">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
