import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { submitLeaveRequest, reviewLeaveRequest } from "@/lib/actions/leave-actions";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber/20 text-amber",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function LeavePage() {
  const session = await auth();
  if (!session?.user) return null;
  const isAdmin = session.user.role === "ADMIN";

  if (isAdmin) {
    const requests = await prisma.leaveRequest.findMany({
      include: { user: true, reviewedBy: true },
      orderBy: { createdAt: "desc" },
    });

    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-6">Leave Requests</h1>
        <div className="space-y-4">
          {requests.length === 0 && <p className="text-muted">No leave requests yet.</p>}
          {requests.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-foreground">
                    {r.user.name} <span className="text-muted font-normal">— {r.type}</span>
                  </p>
                  <p className="text-sm text-muted">
                    {formatDate(r.startDate)} &ndash; {formatDate(r.endDate)}
                  </p>
                </div>
                <span className={`text-xs font-semibold rounded-full px-3 py-1 ${statusColors[r.status]}`}>
                  {r.status}
                </span>
              </div>
              <p className="text-sm text-muted mb-3">{r.reason}</p>

              {r.status === "PENDING" ? (
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
              ) : (
                r.adminComment && (
                  <p className="text-sm text-muted italic">
                    Admin comment: {r.adminComment} — {r.reviewedBy?.name}
                  </p>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const [requests, user] = await Promise.all([
    prisma.leaveRequest.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findUnique({ where: { id: session.user.id } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Leave</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-2xl font-bold text-navy">{user?.casualLeaveBalance}</p>
          <p className="text-sm text-muted">Casual leave remaining</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-2xl font-bold text-navy">{user?.sickLeaveBalance}</p>
          <p className="text-sm text-muted">Sick leave remaining</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-2xl font-bold text-navy">{user?.annualLeaveBalance}</p>
          <p className="text-sm text-muted">Annual leave remaining</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="font-bold text-foreground mb-4">Request Leave</h2>
        <form action={submitLeaveRequest} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Type</label>
            <select
              name="type"
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="CASUAL">Casual</option>
              <option value="SICK">Sick</option>
              <option value="ANNUAL">Annual</option>
              <option value="UNPAID">Unpaid</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Start</label>
              <input
                type="date"
                name="startDate"
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">End</label>
              <input
                type="date"
                name="endDate"
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1.5">Reason</label>
            <textarea
              name="reason"
              required
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="sm:col-span-2 justify-self-start rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-light transition-colors"
          >
            Submit Request
          </button>
        </form>
      </div>

      <h2 className="font-bold text-foreground mb-4">Your Requests</h2>
      <div className="space-y-4">
        {requests.length === 0 && <p className="text-muted">No leave requests yet.</p>}
        {requests.map((r) => (
          <div key={r.id} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <p className="font-semibold text-foreground">{r.type}</p>
              <span className={`text-xs font-semibold rounded-full px-3 py-1 ${statusColors[r.status]}`}>
                {r.status}
              </span>
            </div>
            <p className="text-sm text-muted mb-1">
              {formatDate(r.startDate)} &ndash; {formatDate(r.endDate)}
            </p>
            <p className="text-sm text-muted">{r.reason}</p>
            {r.adminComment && (
              <p className="text-sm text-muted italic mt-2">Admin comment: {r.adminComment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
