import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) return null;
  const isAdmin = session.user.role === "ADMIN";

  if (isAdmin) {
    const [pendingLeave, openGrievances, noticeCount, employeeCount] = await Promise.all([
      prisma.leaveRequest.count({ where: { status: "PENDING" } }),
      prisma.grievance.count({ where: { status: { not: "RESOLVED" } } }),
      prisma.notice.count(),
      prisma.user.count({ where: { role: "EMPLOYEE" } }),
    ]);

    const cards = [
      { label: "Pending leave requests", value: pendingLeave, href: "/intralink/app/admin" },
      { label: "Open grievances", value: openGrievances, href: "/intralink/app/admin" },
      { label: "Notices posted", value: noticeCount, href: "/intralink/app/notices" },
      { label: "Employees", value: employeeCount, href: "/intralink/app/admin" },
    ];

    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Welcome, {session.user.name}</h1>
        <p className="text-muted mb-8">Admin overview</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <p className="text-3xl font-bold text-navy mb-2">{c.value}</p>
              <p className="text-sm text-muted">{c.label}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const [user, myPendingLeave, myOpenGrievances, recentNotices] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id } }),
    prisma.leaveRequest.count({ where: { userId: session.user.id, status: "PENDING" } }),
    prisma.grievance.count({ where: { userId: session.user.id, status: { not: "RESOLVED" } } }),
    prisma.notice.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Welcome, {session.user.name}</h1>
      <p className="text-muted mb-8">{user?.department ?? "Employee"}</p>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        <Link href="/intralink/app/leave" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <p className="text-3xl font-bold text-navy mb-2">{myPendingLeave}</p>
          <p className="text-sm text-muted">Pending leave requests</p>
        </Link>
        <Link href="/intralink/app/grievances" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <p className="text-3xl font-bold text-navy mb-2">{myOpenGrievances}</p>
          <p className="text-sm text-muted">Open grievances</p>
        </Link>
        <Link href="/intralink/app/documents" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <p className="text-3xl font-bold text-navy mb-2">Docs</p>
          <p className="text-sm text-muted">HR policies &amp; forms</p>
        </Link>
      </div>

      <h2 className="font-bold text-foreground mb-4">Latest Notices</h2>
      <div className="space-y-3">
        {recentNotices.length === 0 && <p className="text-muted">No notices yet.</p>}
        {recentNotices.map((n) => (
          <div key={n.id} className="bg-white rounded-xl shadow-sm p-5">
            <p className="font-semibold text-foreground">{n.title}</p>
            <p className="text-sm text-muted line-clamp-2">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
