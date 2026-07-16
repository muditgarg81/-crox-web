"use client";

import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/profile-actions";

export default function ProfileForm({
  phone,
  designation,
  department,
}: {
  phone: string;
  designation: string;
  department: string;
}) {
  const [state, formAction, pending] = useActionState(updateProfile, undefined);

  return (
    <form action={formAction} className="space-y-4 max-w-lg">
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-foreground mb-1.5">
          Department
        </label>
        <input
          id="department"
          name="department"
          defaultValue={department}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <div>
        <label htmlFor="designation" className="block text-sm font-medium text-foreground mb-1.5">
          Designation
        </label>
        <input
          id="designation"
          name="designation"
          defaultValue={designation}
          placeholder="e.g. Quality Supervisor"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={phone}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
        />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-700">{state.success}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-light transition-colors disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
