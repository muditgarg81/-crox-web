"use client";

import { useActionState, useRef } from "react";
import { changePassword } from "@/lib/actions/password-reset-actions";

export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="space-y-4 max-w-lg"
    >
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground mb-1.5">
          Current Password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-1.5">
          New Password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          minLength={8}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
        <p className="text-xs text-muted mt-1">At least 8 characters.</p>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-700">{state.success}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full border border-navy text-navy px-6 py-2.5 text-sm font-semibold hover:bg-navy hover:text-white transition-colors disabled:opacity-60"
      >
        {pending ? "Changing…" : "Change Password"}
      </button>
    </form>
  );
}
