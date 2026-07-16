"use client";

import { useActionState, useRef } from "react";
import { bulkImportAttendance } from "@/lib/actions/attendance-actions";

export default function BulkAttendanceImportForm() {
  const [state, formAction, pending] = useActionState(bulkImportAttendance, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="font-bold text-foreground mb-2">Bulk Import Attendance</h2>
      <p className="text-sm text-muted mb-4">
        Upload a CSV with columns{" "}
        <code className="bg-section rounded px-1.5 py-0.5">employeeId, name, date, status, overtimeHours</code>.
        Employee ID must match what&apos;s set for that person in User Management below (name is just for
        readability and isn&apos;t used to match). Date format{" "}
        <code className="bg-section rounded px-1.5 py-0.5">YYYY-MM-DD</code>, status is Present / Absent /
        Half_Day, overtimeHours is optional (defaults to 0). Re-importing a date for the same employee
        updates that record.
      </p>

      <form
        ref={formRef}
        action={async (formData) => {
          await formAction(formData);
          formRef.current?.reset();
        }}
        className="flex flex-wrap items-end gap-4"
      >
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-foreground mb-1.5">
            CSV File
          </label>
          <input type="file" id="file" name="file" accept=".csv,text/csv" required className="text-sm" />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full border border-navy text-navy px-6 py-2.5 text-sm font-semibold hover:bg-navy hover:text-white transition-colors disabled:opacity-60"
        >
          {pending ? "Importing…" : "Import"}
        </button>
      </form>

      {state?.success && <p className="text-sm text-green-700 mt-4">{state.success}</p>}
      {state?.errors && state.errors.length > 0 && (
        <div className="mt-4 text-sm text-red-600">
          <p className="font-semibold mb-1">
            {state.errors.length} row{state.errors.length === 1 ? "" : "s"} skipped:
          </p>
          <ul className="list-disc list-inside space-y-0.5 max-h-40 overflow-y-auto">
            {state.errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
