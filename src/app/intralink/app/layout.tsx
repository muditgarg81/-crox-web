import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { logout } from "@/lib/actions/session-actions";

const navItems = [
  { href: "/intralink/app/dashboard", label: "Dashboard" },
  { href: "/intralink/app/leave", label: "Leave" },
  { href: "/intralink/app/attendance", label: "Attendance" },
  { href: "/intralink/app/notices", label: "Notices" },
  { href: "/intralink/app/grievances", label: "Grievances" },
  { href: "/intralink/app/directory", label: "Directory" },
  { href: "/intralink/app/documents", label: "Documents" },
  { href: "/intralink/app/profile", label: "My Profile" },
];

const adminNavItem = { href: "/intralink/app/admin", label: "Admin Console" };

export default async function IntralinkAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/intralink/login");

  const items = session.user.role === "ADMIN" ? [adminNavItem, ...navItems] : navItems;

  return (
    <div className="bg-section flex flex-col md:flex-row md:items-start">
      <aside className="md:w-64 shrink-0 bg-navy text-white md:sticky md:top-16">
        <div className="p-6 border-b border-white/10">
          <p className="font-bold text-lg">Intralink</p>
          <p className="text-sm text-white/60 mt-1">{session.user.name}</p>
          <span className="inline-block mt-2 text-[11px] uppercase tracking-wide bg-amber/20 text-amber rounded-full px-2 py-0.5">
            {session.user.role}
          </span>
        </div>
        <nav className="p-4 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-6 lg:p-10">{children}</main>
    </div>
  );
}
