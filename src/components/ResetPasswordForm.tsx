"use client";

import { useActionState } from "react";
import Link from "next/link";
import { resetPassword } from "@/lib/actions/password-reset-actions";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(resetPassword, undefined);

  if (state?.success) {
    return (
      <div>
        <p className="text-sm text-green-700 bg-green-50 rounded-lg p-4 mb-6">{state.success}</p>
        <Link
          href="/intralink/login"
          className="block text-center rounded-full bg-amber px-6 py-3 font-semibold text-white hover:bg-amber-light transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
          New Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
        <p className="text-xs text-muted mt-1">At least 8 characters.</p>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-amber px-6 py-3 font-semibold text-white hover:bg-amber-light transition-colors disabled:opacity-60"
      >
        {pending ? "Updating…" : "Reset Password"}
      </button>
    </form>
  );
}
