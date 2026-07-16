import { prisma } from "@/lib/prisma";

export default async function DirectoryPage() {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      department: true,
      designation: true,
      role: true,
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Employee Directory</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-section text-left">
            <tr>
              <th className="px-5 py-3 font-semibold text-foreground">Name</th>
              <th className="px-5 py-3 font-semibold text-foreground">Department</th>
              <th className="px-5 py-3 font-semibold text-foreground">Designation</th>
              <th className="px-5 py-3 font-semibold text-foreground">Email</th>
              <th className="px-5 py-3 font-semibold text-foreground">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-5 py-3 text-foreground font-medium">
                  {u.name}
                  {u.role === "ADMIN" && (
                    <span className="ml-2 text-[10px] uppercase tracking-wide bg-amber/20 text-amber rounded-full px-2 py-0.5">
                      Admin
                    </span>
                  )}
                </td>
                <td className="px-5 py-3 text-muted">{u.department ?? "—"}</td>
                <td className="px-5 py-3 text-muted">{u.designation ?? "—"}</td>
                <td className="px-5 py-3 text-muted">{u.email}</td>
                <td className="px-5 py-3 text-muted">{u.phone ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
