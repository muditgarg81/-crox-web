"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function AttendanceControls({
  month,
  employees,
  selectedEmployeeId,
}: {
  month: string;
  employees?: { id: string; name: string }[];
  selectedEmployeeId?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {employees && (
        <select
          value={selectedEmployeeId}
          onChange={(e) => updateParam("employee", e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
        >
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      )}
      <input
        type="month"
        value={month}
        onChange={(e) => updateParam("month", e.target.value)}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
      />
    </div>
  );
}
