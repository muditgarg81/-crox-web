import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { reviewLeaveRequest } from "@/lib/actions/leave-actions";
import { respondToGrievance } from "@/lib/actions/grievance-actions";
import {
  promoteToAdmin,
  setUserActive,
  updateLeaveBalances,
  updateEmployeeId,
} from "@/lib/actions/user-actions";

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminConsolePage() {
  const session = await auth();
  if (!session?.user) return null;
  if (session.user.role !== "ADMIN") redirect("/intralink/app/dashboard");

  const [pendingLeave, openGrievances, users] = await Promise.all([
    prisma.leaveRequest.findMany({
      where: { status: "PENDING" },
      include: { user: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.grievance.findMany({
      where: { status: { not: "RESOLVED" } },
      include: { user: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Admin Console</h1>
      <p className="text-muted mb-8">Manage pending requests and user accounts in one place.</p>

      <section className="mb-12">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Pending Leave Requests ({pendingLeave.length})
        </h2>
        {pendingLeave.length === 0 ? (
          <p className="text-muted text-sm mb-8">Nothing pending.</p>
        ) : (
          <div className="space-y-4 mb-8">
            {pendingLeave.map((r) => (
              <div key={r.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <p className="font-semibold text-foreground">{r.user.name}</p>
                  <span className="text-xs font-semibold rounded-full px-3 py-1 bg-amber/20 text-amber">
                    PENDING
                  </span>
                </div>
                <p className="text-sm text-muted mb-1">
                  {formatDate(r.startDate)} &ndash; {formatDate(r.endDate)}
                </p>
                <p className="text-sm text-muted mb-3">{r.reason}</p>
                <form action={reviewLeaveRequest} className="flex flex-wrap items-center gap-3">
                  <input type="hidden" name="id" value={r.id} />
                  <input
                    name="adminComment"
                    placeholder="Comment (optional)"
                    className="flex-1 min-w-[180px] rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    name="decision"
                    value="APPROVED"
                    className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-dark transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    type="submit"
                    name="decision"
                    value="REJECTED"
                    className="rounded-full border border-red-300 text-red-600 px-5 py-2 text-sm font-semibold hover:bg-red-50 transition-colors"
                  >
                    Reject
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-lg font-bold text-foreground mb-4">
          Open Grievances ({openGrievances.length})
        </h2>
        {openGrievances.length === 0 ? (
          <p className="text-muted text-sm">Nothing open.</p>
        ) : (
          <div className="space-y-4">
            {openGrievances.map((g) => (
              <div key={g.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="font-semibold text-foreground">{g.subject}</p>
                    <p className="text-xs text-muted">
                      {g.user.name} &middot; {formatDate(g.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold rounded-full px-3 py-1 ${
                      g.status === "OPEN" ? "bg-amber/20 text-amber" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {g.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-sm text-muted mb-3">{g.description}</p>
                <form action={respondToGrievance} className="flex flex-wrap items-center gap-3">
                  <input type="hidden" name="id" value={g.id} />
                  <input
                    name="adminResponse"
                    placeholder="Response (optional)"
                    className="flex-1 min-w-[180px] rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                  {g.status === "OPEN" && (
                    <button
                      type="submit"
                      name="status"
                      value="IN_REVIEW"
                      className="rounded-full border border-navy text-navy px-5 py-2 text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
                    >
                      Mark In Review
                    </button>
                  )}
                  <button
                    type="submit"
                    name="status"
                    value="RESOLVED"
                    className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-dark transition-colors"
                  >
                    Mark Resolved
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-4">User Management ({users.length})</h2>
        <div className="space-y-4">
          {users.map((u) => (
            <div key={u.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <p className="font-semibold text-foreground">
                    {u.name}
                    {u.role === "ADMIN" && (
                      <span className="ml-2 text-[10px] uppercase tracking-wide bg-amber/20 text-amber rounded-full px-2 py-0.5">
                        Admin
                      </span>
                    )}
                    {!u.isActive && (
                      <span className="ml-2 text-[10px] uppercase tracking-wide bg-red-100 text-red-600 rounded-full px-2 py-0.5">
                        Deactivated
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted">
                    {u.email} &middot; {u.department ?? "No department"} &middot; ID:{" "}
                    {u.employeeId ?? "not set"}
                  </p>
                </div>

                {u.id !== session.user.id && (
                  <div className="flex items-center gap-3">
                    {u.role === "EMPLOYEE" && (
                      <form action={promoteToAdmin}>
                        <input type="hidden" name="id" value={u.id} />
                        <button type="submit" className="text-xs font-semibold text-navy hover:text-amber">
                          Promote to Admin
                        </button>
                      </form>
                    )}
                    <form action={setUserActive}>
                      <input type="hidden" name="id" value={u.id} />
                      <input type="hidden" name="active" value={(!u.isActive).toString()} />
                      <button
                        type="submit"
                        className={`text-xs font-semibold ${
                          u.isActive ? "text-red-600 hover:text-red-700" : "text-green-700 hover:text-green-800"
                        }`}
                      >
                        {u.isActive ? "Deactivate" : "Reactivate"}
                      </button>
                    </form>
                  </div>
                )}
              </div>

              <form action={updateEmployeeId} className="flex flex-wrap items-end gap-4 mb-4">
                <input type="hidden" name="id" value={u.id} />
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    defaultValue={u.employeeId ?? ""}
                    placeholder="e.g. EMP001"
                    className="w-32 rounded-lg border border-gray-200 px-2 py-1.5 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full border border-navy text-navy px-4 py-1.5 text-xs font-semibold hover:bg-navy hover:text-white transition-colors"
                >
                  Save ID
                </button>
              </form>

              <form action={updateLeaveBalances} className="flex flex-wrap items-end gap-4">
                <input type="hidden" name="id" value={u.id} />
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Casual</label>
                  <input
                    type="number"
                    name="casualLeaveBalance"
                    defaultValue={u.casualLeaveBalance}
                    className="w-20 rounded-lg border border-gray-200 px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Sick</label>
                  <input
                    type="number"
                    name="sickLeaveBalance"
                    defaultValue={u.sickLeaveBalance}
                    className="w-20 rounded-lg border border-gray-200 px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Annual</label>
                  <input
                    type="number"
                    name="annualLeaveBalance"
                    defaultValue={u.annualLeaveBalance}
                    className="w-20 rounded-lg border border-gray-200 px-2 py-1.5 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full border border-navy text-navy px-4 py-1.5 text-xs font-semibold hover:bg-navy hover:text-white transition-colors"
                >
                  Update Balances
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
