import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { submitGrievance, respondToGrievance } from "@/lib/actions/grievance-actions";

const statusColors: Record<string, string> = {
  OPEN: "bg-amber/20 text-amber",
  IN_REVIEW: "bg-blue-100 text-blue-700",
  RESOLVED: "bg-green-100 text-green-700",
};

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function GrievancesPage() {
  const session = await auth();
  if (!session?.user) return null;
  const isAdmin = session.user.role === "ADMIN";

  const grievances = await prisma.grievance.findMany({
    where: isAdmin ? {} : { userId: session.user.id },
    include: { user: true, respondedBy: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Grievance Redressal</h1>

      {!isAdmin && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="font-bold text-foreground mb-4">Submit a Grievance</h2>
          <form action={submitGrievance} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
              <input
                name="subject"
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
              <textarea
                name="description"
                required
                rows={4}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-light transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {grievances.length === 0 && <p className="text-muted">No grievances yet.</p>}
        {grievances.map((g) => (
          <div key={g.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div>
                <p className="font-semibold text-foreground">{g.subject}</p>
                {isAdmin && <p className="text-xs text-muted">{g.user.name} &middot; {formatDate(g.createdAt)}</p>}
              </div>
              <span className={`text-xs font-semibold rounded-full px-3 py-1 ${statusColors[g.status]}`}>
                {g.status.replace("_", " ")}
              </span>
            </div>
            <p className="text-sm text-muted mb-3">{g.description}</p>

            {g.adminResponse && (
              <p className="text-sm text-muted italic mb-3">
                Response: {g.adminResponse} — {g.respondedBy?.name}
              </p>
            )}

            {isAdmin && g.status !== "RESOLVED" && (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
