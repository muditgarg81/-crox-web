import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { markAttendance } from "@/lib/actions/attendance-actions";
import AttendanceControls from "@/components/AttendanceControls";
import BulkAttendanceImportForm from "@/components/BulkAttendanceImportForm";

const statusColors: Record<string, string> = {
  PRESENT: "bg-green-100 text-green-700",
  ABSENT: "bg-red-100 text-red-700",
  HALF_DAY: "bg-amber/20 text-amber",
};

const statusLabels: Record<string, string> = {
  PRESENT: "Present",
  ABSENT: "Absent",
  HALF_DAY: "Half Day",
};

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

function currentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function monthRange(month: string) {
  const [year, mon] = month.split("-").map(Number);
  const start = new Date(Date.UTC(year, mon - 1, 1));
  const end = new Date(Date.UTC(year, mon, 1));
  return { start, end };
}

export default async function AttendancePage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; employee?: string }>;
}) {
  const session = await auth();
  if (!session?.user) return null;
  const isAdmin = session.user.role === "ADMIN";

  const params = await searchParams;
  const month = params.month ?? currentMonth();
  const { start, end } = monthRange(month);

  if (isAdmin) {
    const employees = await prisma.user.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });

    const selectedEmployeeId = params.employee ?? employees[0]?.id;
    const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId);

    const records = selectedEmployeeId
      ? await prisma.attendanceRecord.findMany({
          where: { userId: selectedEmployeeId, date: { gte: start, lt: end } },
          orderBy: { date: "asc" },
        })
      : [];

    const present = records.filter((r) => r.status === "PRESENT").length;
    const absent = records.filter((r) => r.status === "ABSENT").length;
    const halfDay = records.filter((r) => r.status === "HALF_DAY").length;
    const totalOvertime = records.reduce((sum, r) => sum + r.overtimeHours, 0);

    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-6">Attendance</h1>

        <AttendanceControls month={month} employees={employees} selectedEmployeeId={selectedEmployeeId} />

        <BulkAttendanceImportForm />

        {selectedEmployee && (
          <>
            <div className="grid sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-5">
                <p className="text-2xl font-bold text-navy">{present}</p>
                <p className="text-sm text-muted">Present</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-5">
                <p className="text-2xl font-bold text-navy">{absent}</p>
                <p className="text-sm text-muted">Absent</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-5">
                <p className="text-2xl font-bold text-navy">{halfDay}</p>
                <p className="text-sm text-muted">Half Day</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-5">
                <p className="text-2xl font-bold text-navy">{totalOvertime}h</p>
                <p className="text-sm text-muted">Overtime</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="font-bold text-foreground mb-4">
                Mark Attendance for {selectedEmployee.name}
              </h2>
              <form action={markAttendance} className="flex flex-wrap items-end gap-4">
                <input type="hidden" name="userId" value={selectedEmployeeId} />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={start.toISOString().slice(0, 10)}
                    max={new Date(end.getTime() - 86400000).toISOString().slice(0, 10)}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
                  <select name="status" required className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
                    <option value="PRESENT">Present</option>
                    <option value="ABSENT">Absent</option>
                    <option value="HALF_DAY">Half Day</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Overtime (hrs)</label>
                  <input
                    type="number"
                    name="overtimeHours"
                    step="0.5"
                    min="0"
                    defaultValue="0"
                    className="w-28 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-light transition-colors"
                >
                  Save
                </button>
              </form>
            </div>

            <h2 className="font-bold text-foreground mb-4">Monthly Record</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-section text-left">
                  <tr>
                    <th className="px-5 py-3 font-semibold text-foreground">Date</th>
                    <th className="px-5 py-3 font-semibold text-foreground">Status</th>
                    <th className="px-5 py-3 font-semibold text-foreground">Overtime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {records.length === 0 && (
                    <tr>
                      <td className="px-5 py-4 text-muted" colSpan={3}>
                        No attendance marked for this month yet.
                      </td>
                    </tr>
                  )}
                  {records.map((r) => (
                    <tr key={r.id}>
                      <td className="px-5 py-3 text-foreground">{formatDate(r.date)}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-semibold rounded-full px-3 py-1 ${statusColors[r.status]}`}>
                          {statusLabels[r.status]}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-muted">{r.overtimeHours > 0 ? `${r.overtimeHours}h` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    );
  }

  const records = await prisma.attendanceRecord.findMany({
    where: { userId: session.user.id, date: { gte: start, lt: end } },
    orderBy: { date: "asc" },
  });

  const present = records.filter((r) => r.status === "PRESENT").length;
  const absent = records.filter((r) => r.status === "ABSENT").length;
  const halfDay = records.filter((r) => r.status === "HALF_DAY").length;
  const totalOvertime = records.reduce((sum, r) => sum + r.overtimeHours, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Attendance</h1>

      <AttendanceControls month={month} />

      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-2xl font-bold text-navy">{present}</p>
          <p className="text-sm text-muted">Present</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-2xl font-bold text-navy">{absent}</p>
          <p className="text-sm text-muted">Absent</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-2xl font-bold text-navy">{halfDay}</p>
          <p className="text-sm text-muted">Half Day</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-2xl font-bold text-navy">{totalOvertime}h</p>
          <p className="text-sm text-muted">Overtime</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-section text-left">
            <tr>
              <th className="px-5 py-3 font-semibold text-foreground">Date</th>
              <th className="px-5 py-3 font-semibold text-foreground">Status</th>
              <th className="px-5 py-3 font-semibold text-foreground">Overtime</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.length === 0 && (
              <tr>
                <td className="px-5 py-4 text-muted" colSpan={3}>
                  No attendance marked for this month yet.
                </td>
              </tr>
            )}
            {records.map((r) => (
              <tr key={r.id}>
                <td className="px-5 py-3 text-foreground">{formatDate(r.date)}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold rounded-full px-3 py-1 ${statusColors[r.status]}`}>
                    {statusLabels[r.status]}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted">{r.overtimeHours > 0 ? `${r.overtimeHours}h` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
