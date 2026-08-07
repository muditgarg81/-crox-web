"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signup } from "@/lib/actions/auth-actions";
import PhoneOtpForm from "@/components/PhoneOtpForm";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signup, undefined);
  const [mode, setMode] = useState<"password" | "phone">("password");

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-section px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Employee Sign Up</h1>
        <p className="text-sm text-muted mb-6">
          Create your Intralink account. New accounts need admin approval before you can log in.
        </p>

        <div className="flex rounded-full bg-section p-1 mb-6">
          <button
            type="button"
            onClick={() => setMode("password")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "password" ? "bg-white shadow-sm text-navy" : "text-muted"
            }`}
          >
            Email &amp; Password
          </button>
          <button
            type="button"
            onClick={() => setMode("phone")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "phone" ? "bg-white shadow-sm text-navy" : "text-muted"
            }`}
          >
            Mobile OTP
          </button>
        </div>

        {mode === "password" ? (
          state?.pending ? (
            <div className="rounded-xl bg-section p-6 text-center">
              <p className="font-semibold text-foreground mb-1">Account created</p>
              <p className="text-sm text-muted">{state.pending}</p>
            </div>
          ) : (
            <form action={formAction} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                  Full Name <span className="text-muted font-normal">(optional)</span>
                </label>
                <input
                  id="name"
                  name="name"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
                />
              </div>
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
                <label htmlFor="department" className="block text-sm font-medium text-foreground mb-1.5">
                  Department
                </label>
                <input
                  id="department"
                  name="department"
                  placeholder="e.g. Production, Quality, Accounts"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                  Password
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
                {pending ? "Creating account…" : "Sign Up"}
              </button>
            </form>
          )
        ) : (
          <PhoneOtpForm />
        )}

        <p className="text-sm text-muted mt-6 text-center">
          Already have an account?{" "}
          <Link href="/intralink/login" className="text-navy font-medium hover:text-amber">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
