import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { promoteToAdmin, setUserActive } from "@/lib/actions/user-actions";

export default async function DirectoryPage() {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

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
      isActive: true,
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Employee Directory</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-section text-left">
            <tr>
              <th className="px-5 py-3 font-semibold text-foreground">Name</th>
              <th className="px-5 py-3 font-semibold text-foreground">Department</th>
              <th className="px-5 py-3 font-semibold text-foreground">Designation</th>
              <th className="px-5 py-3 font-semibold text-foreground">Email</th>
              <th className="px-5 py-3 font-semibold text-foreground">Phone</th>
              {isAdmin && <th className="px-5 py-3 font-semibold text-foreground">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className={u.isActive ? "" : "opacity-50"}>
                <td className="px-5 py-3 text-foreground font-medium">
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
                </td>
                <td className="px-5 py-3 text-muted">{u.department ?? "—"}</td>
                <td className="px-5 py-3 text-muted">{u.designation ?? "—"}</td>
                <td className="px-5 py-3 text-muted">{u.email}</td>
                <td className="px-5 py-3 text-muted">{u.phone ?? "—"}</td>
                {isAdmin && (
                  <td className="px-5 py-3">
                    {u.id === session!.user.id ? (
                      <span className="text-xs text-muted">You</span>
                    ) : (
                      <div className="flex items-center gap-3">
                        {u.role === "EMPLOYEE" && (
                          <form action={promoteToAdmin}>
                            <input type="hidden" name="id" value={u.id} />
                            <button
                              type="submit"
                              className="text-xs font-semibold text-navy hover:text-amber"
                            >
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
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
